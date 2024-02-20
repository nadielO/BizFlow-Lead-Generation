require('dotenv').config();
const { API_KEYS } = process.env;

const authMiddleware = (req, res, next) => {
  const apiKeyHeader = req.headers['x-api-key'];
  const authorizedApiKeys = API_KEYS.split(',');

  if (!apiKeyHeader) {
    console.error('API key is missing');
    return res.status(401).send({ message: 'API key is required' });
  }

  if (authorizedApiKeys.includes(apiKeyHeader)) {
    console.log(`API Key validated: ${apiKeyHeader}`);
    next();
  } else {
    console.error(`Unauthorized access with API Key: ${apiKeyHeader}`);
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;