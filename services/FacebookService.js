require('dotenv').config();
const axios = require('axios');
const { FACEBOOK_API_KEY } = process.env;

const fetchLeadsFromFacebook = async (keywords) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/search?q=${encodeURIComponent(keywords)}&access_token=${FACEBOOK_API_KEY}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching leads from Facebook:', error.message, error.stack);
    throw new Error('Failed to fetch leads from Facebook');
  }
};

module.exports = { fetchLeadsFromFacebook };