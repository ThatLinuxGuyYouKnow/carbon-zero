require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.NEWS_API_KEY;

async function fetchNews(country, text) {
  try {
    const apiUrl = 'https://api.worldnewsapi.com/search-news';

    const params = {
      'text':text,
      'source-countries': country,
      // Add other parameters as needed
      'api-key': apiKey,
    };

    const response = await axios.get(apiUrl, { params })

    if (response.status === 200) {
      const { news } = response.data;
      
      // Map the relevant fields from each article
      const mappedNews = news.map((article) => ({
        id: article.id,
        title: article.title,
        text: article.description || article.content || '',
        summary: article.description || '',
        url: article.link,
        image: article.image_url || '',
        author: article.creator || '',
        language: article.language || '',
        source_country: article.country || '',
        sentiment: article.sentiment || '',
      }));

      console.log(mappedNews);
      return mappedNews;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error(`Error retrieving news: ${error.message}`);
    return []; // Return an empty array if there's an error
  }
}

module.exports = fetchNews;
