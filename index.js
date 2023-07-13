const express = require('express');
const cron = require('node-cron');
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');

const app = express();
const port = process.env.PORT || 3000; 

// Use the PORT environment variable for the port instead of a hardcoded 3000
async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'Climate');
    console.log('it has fetched the news!');
    await storeNews(country, articles);
  }
}

let lastCronJob1Run = ''; 
let lastCronJob2Run = '';

// Define your cron jobs

cron.schedule("*/2 * * * *", function() {
  console.log(new Date().toISOString());
  lastCronJob1Run = new Date().toISOString();
});

cron.schedule("06 00 * * *", function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  lastCronJob2Run = new Date().toISOString();
  fetchAndStoreNews();
});

// ...

app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});