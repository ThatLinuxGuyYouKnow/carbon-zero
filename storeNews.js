require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function dropTableIfExists(tableName) {
  try {
    // Execute the custom function directly from the database
    const { data, error } = await supabase.rpc('drop_table_if_exists', { table_name: tableName });

    if (error) {
      console.error(`Error dropping table ${tableName}: ${error.message}`);
    }
  } catch (error) {
    console.error(`Error dropping table ${tableName}: ${error.message}`);
  }
}

async function storeNews(country, articles) {
  try {
    if (!articles) {
      throw new Error(`Articles parameter is undefined or null`);
    }

    const tableName = `${country}_news`; // Generate table name based on country code

    // Check if the table exists
    const { data: existingTable, error: tableError } = await supabase.rpc('table_exists', { schema_name: 'public', table_name: tableName });

    if (tableError) {
      throw new Error(`Error checking table existence for ${country}: ${tableError.message}`);
    }

    if (!existingTable) {
      console.log('Table does not exist yet.');

      // Create the table
      const { error: createError } = await supabase.rpc('create_table', { table_name: tableName });

      if (createError) {
        throw new Error(`Error creating table for ${country}: ${createError.message}`);
      }

      // Define the columns and their data types
      const columns = [
        'title text',
       'text text',
        'summary text',
       'url text',
        'publishedat text',
        'country text',
        'image text',
        'source text',
        'author text',
        'sentiment text'
      ];

      // Add the columns to the newly created table
      const { error: alterError } = await supabase.rpc('alter_table', {
        table_name: tableName,
        columns,
      });

      if (alterError) {
        // Clean up the table if column addition fails
        await dropTableIfExists(tableName);
        throw new Error(`Error adding columns to table for ${country}: ${alterError.message}`);
      }
    }

    const newArticles = articles.map(article => ({
      country,
      title:article.title,
      text:article.text,
       summary:article.summary,
      url:article.url,
       publishedat:article.publishedAt,
       image:article.image,
       source:article.source,
       author:article.author,
       sentiment:article.sentiment,
    
   
    }));

    // Use "upsert" to insert new articles and update existing ones based on the ID
    const { data: insertedData, error: insertError } = await supabase
      .from(tableName)
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
