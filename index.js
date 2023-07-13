const express = require('express');
const cron = require('node-cron');
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');

const app = express();
const port = 3000;

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

// Define the route to display the last run time of cron jobs


// Function to fetch and store news

async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'Climate');
    console.log('it has fetched the news!');
    await storeNews(country, articles);
  }
}


app.get('/', (req, res) => {
  res.send(`
    <h1>Last Cron Job Run Times</h1>
    <p>Cron Job 1: ${lastCronJob1Run}</p>
    <p>Cron Job 2: ${lastCronJob2Run}</p>
  `);
});

// Start the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
