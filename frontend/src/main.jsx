import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const fontFamily = import.meta.env.VITE_FONT_FAMILY;

// Dynamically load Google Font
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400;500;700&display=swap`;
document.head.appendChild(link);

// Apply it as CSS variable
document.documentElement.style.setProperty("--app-font", fontFamily);
