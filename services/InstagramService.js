require('dotenv').config();
const axios = require('axios');
const { INSTAGRAM_API_KEY } = process.env;

const fetchLeadsFromInstagram = async (keywords) => {
  try {
    const response = await axios.get(`https://graph.instagram.com/search?q=${encodeURIComponent(keywords)}&access_token=${INSTAGRAM_API_KEY}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching leads from Instagram:', error.message, error.stack);
    throw new Error('Failed to fetch leads from Instagram');
  }
};

module.exports = { fetchLeadsFromInstagram };