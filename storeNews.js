require('dotenv').config();
import('node-fetch');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

async function storeNews(country, articles) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/news?apikey=${supabaseKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(articles.map(article => ({ ...article, country }))),
    });

    if (response.ok) {
      console.log(`Successfully stored news for ${country}`);
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error storing news for ${country}: ${error.message}`);
  }
}

module.exports = storeNews;