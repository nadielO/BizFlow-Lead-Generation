const { RateLimiterRedis } = require('rate-limiter-flexible');
const redis = require('redis');

require('dotenv').config();

const redisClient = redis.createClient({
  enable_offline_queue: false,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: options => Math.min(options.attempt * 100, 3000)
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: process.env.THROTTLING_RATE_LIMIT || 100,
  duration: 60,
  execEvenly: false
});

const rateLimiterMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  rateLimiter.consume(apiKey)
    .then(() => {
      next();
    })
    .catch((rejRes) => {
      const retrySecs = Math.round(rejRes.msBeforeNext / 1000) || 1;
      res.set('Retry-After', String(retrySecs));
      res.status(429).send('Too Many Requests');
    });
};

module.exports = rateLimiterMiddleware;
