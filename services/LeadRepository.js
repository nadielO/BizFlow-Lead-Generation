require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

client.connect().catch((error) => console.error('Redis connect error:', error));

const storeLead = async (key, value, expireSeconds = 3600) => {
  try {
    await client.setEx(key, expireSeconds, JSON.stringify(value));
    console.log(`Lead stored with key: ${key}`);
  } catch (error) {
    console.error('Error storing lead:', error);
  }
};

const getLeads = async (pattern = 'lead:*') => {
  try {
    const keys = await client.keys(pattern);
    if (keys.length === 0) return [];
    const leads = await Promise.all(keys.map(async (key) => {
      const leadData = await client.get(key);
      return { key, data: JSON.parse(leadData) };
    }));
    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

const deleteLead = async (key) => {
  try {
    await client.del(key);
    console.log(`Lead deleted with key: ${key}`);
  } catch (error) {
    console.error('Error deleting lead:', error);
  }
};

module.exports = {
  storeLead,
  getLeads,
  deleteLead,
};