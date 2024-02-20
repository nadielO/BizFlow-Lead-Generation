require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const authMiddleware = require('./middleware/AuthMiddleware');
const throttlingMiddleware = require('./middleware/ThrottlingMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));

// Health check route
app.get('/ping', (req, res) => {
  console.log('Health check route accessed');
  res.status(200).send('OK');
});

// Start the server with error handling
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (error) => {
  console.error('Failed to start server:', error);
});