require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function storeNews(country, articles) {
  try {
    if (!articles) {
      throw new Error(`Articles parameter is undefined or null`);
    }

    const { data: existingData, error: fetchError } = await supabase
      .from('news')
      .select('*')
      .eq('country', country);

    if (fetchError) {
      throw new Error(`Error fetching existing data for ${country}: ${fetchError.message}`);
    }

    const existingArticles = existingData || [];

    const newArticles = articles.map(article => ({
      id: article.id,
      country,
      title: article.title,
      url: article.link,
      description: article.description,
      content: article.content,
      source_id: article.source_id,
      language: article.language,
      image_url: article.image_url,
      published_at: article.pubDate,
      category: article.category,
    }));

    // Use "upsert" to insert new articles and update existing ones based on the ID
    const { data: insertedData, error: insertError } = await supabase
      .from('news_2')
      .upsert(newArticles);

    if (insertError) {
      throw new Error(`Error inserting data for ${country}: ${insertError.message}`);
    }

    console.log(`Successfully stored news for ${country}`);

  } catch (error) {
    console.error(`Error storing news for ${country}: ${error.message}`);
  }
}

module.exports = storeNews;
