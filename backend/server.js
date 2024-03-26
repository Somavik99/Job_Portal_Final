import express from 'express';
import cors from 'cors';
import app from './app.js';  
import cloudinary from 'cloudinary';
 
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const PORT = process.env.PORT || 4000;
const server = express(); // Rename 'app' to 'server'

// Enable CORS
server.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true, // Enable CORS credentials if required
}));

// Use the app from app.js
server.use(app);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
