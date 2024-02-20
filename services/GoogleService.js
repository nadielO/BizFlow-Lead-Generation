require('dotenv').config();
const axios = require('axios');
const { GOOGLE_API_KEY } = process.env;

const fetchLeadsFromGoogle = async (keywords) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(keywords)}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching leads from Google:', error.message, error.stack);
    throw new Error('Failed to fetch leads from Google');
  }
};

module.exports = { fetchLeadsFromGoogle };