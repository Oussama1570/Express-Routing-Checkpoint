
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to check if it's within working hours
const isOpen = (req, res, next) => {
  const today = new Date();
  const day = today.getDay(); // 0 - Sunday, 6 - Saturday
  const hour = today.getHours();

  if (day > 0 && day < 6 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(410).send('Sorry, we are closed outside working hours (Mon-Fri 9AM-5PM)');
  }
};

// Apply middleware to all routes
app.use(isOpen);

// Define routes and serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.get('/OurServicesnode server.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'OurServices.html'));
});

app.get('/ContactUS', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ContactUS.html'));
});

// Serve static CSS file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});