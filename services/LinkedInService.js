require('dotenv').config();
const axios = require('axios');
const { LINKEDIN_API_KEY } = process.env;

const fetchLeadsFromLinkedIn = async (keywords) => {
  try {
    const response = await axios.get(`https://api.linkedin.com/search?q=${encodeURIComponent(keywords)}&access_token=${LINKEDIN_API_KEY}`);
    return response.data.elements;
  } catch (error) {
    console.error('Error fetching leads from LinkedIn:', error.message, error.stack);
    throw new Error('Failed to fetch leads from LinkedIn');
  }
};

module.exports = { fetchLeadsFromLinkedIn };