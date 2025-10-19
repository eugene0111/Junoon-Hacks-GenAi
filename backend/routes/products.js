const express = require('express');
const { body, validationResult, query } = require('express-validator');
const ProductService = require('../services/ProductService');
const UserService = require('../services/UserService');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isIn(['Pottery', 'Textiles', 'Painting', 'Woodwork', 'Metalwork', 'Sculpture', 'Jewelry', 'Other']),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be a positive number'),
  query('sortBy').optional().isIn(['createdAt', 'price', 'averageRating', 'views']).withMessage('Invalid sort field')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      search,
      artisan,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { status: 'active' };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (artisan) filter.artisan = artisan;
    if (search) {
      // Note: Firestore doesn't have full-text search built-in
      // You might want to implement this using Algolia or similar
      console.log('Search functionality needs to be implemented with external service');
    }

    const options = {
      sortBy,
      sortOrder,
      limit: parseInt(limit),
      offset: (page - 1) * limit
    };

    const products = await ProductService.findActive(filter, options);
    
    // Populate artisan data for each product
    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const artisan = await UserService.findById(product.artisan);
        return {
          ...product,
          artisan: artisan ? {
            id: artisan.id,
            name: artisan.name,
            profile: artisan.profile
          } : null
        };
      })
    );

    const total = await ProductService.count(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products: populatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductService.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Populate artisan data
    const artisan = await UserService.findById(product.artisan);
    const populatedProduct = {
      ...product,
      artisan: artisan ? {
        id: artisan.id,
        name: artisan.name,
        email: artisan.email,
        profile: artisan.profile
      } : null
    };

    // Populate review user data
    if (product.reviews && product.reviews.length > 0) {
      populatedProduct.reviews = await Promise.all(
        product.reviews.map(async (review) => {
          const user = await UserService.findById(review.user);
          return {
            ...review,
            user: user ? {
              id: user.id,
              name: user.name,
              profile: user.profile
            } : null
          };
        })
      );
    }

    await ProductService.incrementViews(product.id);

    res.json(populatedProduct);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
});

router.post('/', [auth, authorize('artisan')], [
  body('name').trim().isLength({ min: 1, max: 200 }).withMessage('Product name is required and must be under 200 characters'),
  body('description').isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('category').isIn(['Pottery', 'Textiles', 'Painting', 'Woodwork', 'Metalwork', 'Sculpture', 'Jewelry', 'Other']).withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = {
      ...req.body,
      artisan: req.user.id
    };

    const product = await ProductService.create(productData);

    // Populate artisan data
    const artisan = await UserService.findById(product.artisan);
    const populatedProduct = {
      ...product,
      artisan: artisan ? {
        id: artisan.id,
        name: artisan.name,
        profile: artisan.profile
      } : null
    };

    res.status(201).json({
      message: 'Product created successfully',
      product: populatedProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

router.put('/:id', [auth, authorize('artisan')], async (req, res) => {
  try {
    const product = await ProductService.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.artisan !== req.user.id) {
      return res.status(403).json({ message: 'Access denied: You can only update your own products' });
    }

    const updatedProduct = await ProductService.update(req.params.id, req.body);

    // Populate artisan data
    const artisan = await UserService.findById(updatedProduct.artisan);
    const populatedProduct = {
      ...updatedProduct,
      artisan: artisan ? {
        id: artisan.id,
        name: artisan.name,
        profile: artisan.profile
      } : null
    };

    res.json({
      message: 'Product updated successfully',
      product: populatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

router.delete('/:id', [auth, authorize('artisan')], async (req, res) => {
  try {
    const product = await ProductService.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.artisan !== req.user.id) {
      return res.status(403).json({ message: 'Access denied: You can only delete your own products' });
    }

    await ProductService.delete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

router.post('/:id/reviews', [auth, authorize('buyer')], [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 1000 }).withMessage('Comment must be under 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await ProductService.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingReview = product.reviews?.find(
      review => review.user === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const reviewData = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
      images: req.body.images || []
    };

    const updatedProduct = await ProductService.addReview(req.params.id, reviewData);

    // Populate review user data
    const populatedProduct = {
      ...updatedProduct,
      reviews: await Promise.all(
        updatedProduct.reviews.map(async (review) => {
          const user = await UserService.findById(review.user);
          return {
            ...review,
            user: user ? {
              id: user.id,
              name: user.name,
              profile: user.profile
            } : null
          };
        })
      )
    };

    res.status(201).json({
      message: 'Review added successfully',
      product: populatedProduct
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error while adding review' });
  }
});

module.exports = router;