const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/product/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../public/images/products', filename);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(imagePath);
});

router.get('/blog/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../public/images/blogs', filename);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(imagePath);
});

router.get('/testimonial/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../public/images/testimonial', filename);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(imagePath);
});

module.exports = router;
