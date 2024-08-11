require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.NEWS_API_KEY;

async function fetchNews(country, text) {
  try {
    const apiUrl = 'https://newsdata.io/api/1/news';

    const params = {
      country,
      apikey: apiKey,
      q: text,
      language: 'en', // Assuming English language is preferred
    };

    console.log(apiUrl, { params });

    const response = await axios.get(apiUrl, { params });

    if (response.status === 200) {
      const data = response.data;

      // Check if the response data is an object
      if (typeof data !== 'object') {
        throw new Error('Invalid response format: data is not an object');
      }

      const newsArray = []; // Create an array to hold the news objects
      newsArray.push(...data.results); // Push each article into the array

      console.log(JSON.stringify(newsArray, null, 2)); // Log the news data

      // Map the relevant fields from each article
      const mappedNews = newsArray.map((article) => ({
        title: article.title,
        text: article.description,
        summary: article.content || '',
        url: article.link,
        publishedAt: article.pubDate,
        image: article.image_url|| '',
        source:article.source_id,
        author: (article.creator && article.creator.length > 0) ? article.creator[0] : 'none',
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
