require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.NEWS_API_KEY;

async function fetchNews(country, text) {
  try {
    const apiUrl = 'https://newsdata.io/api/1/news?';

    const params = {
      apikey: apiKey,
      q: text,
      language: 'en', // Assuming English language is preferred
      country:country,
    };

    console.log(apiUrl, { params });
    console.log('after this');

    const response = await axios.get(apiUrl, { params });

    if (response.status === 200) {
      const { data } = response;

      // Check if the response data is an array or a single object
      const articles = Array.isArray(data) ? data : [data];

      // Map the relevant fields from the article
      const mappedNews = articles.map((article) => ({
        id: article.link,
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
      console.log(apiUrl, { params });
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error(`Error retrieving news: ${error.message}`);
    return []; // Return an empty array if there's an error
  }
}

module.exports = fetchNews;
