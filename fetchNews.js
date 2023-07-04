require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.NEWS_API_KEY;

async function fetchNews(country, category) {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country,
        category,
        apiKey,
        pageSize: 100,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching news for ${country}: ${error.message}`);
  }
}

module.exports = fetchNews;