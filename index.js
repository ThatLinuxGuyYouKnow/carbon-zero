const cron = require('node-cron')
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');
const winston = require('winston');
const logger = winston.createLogger({

  transports: [
    new winston.transports.File({
      filename: '/tmp/app.log' 
    })
  ]

});

// Start the server
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Define your cron jobs

cron.schedule("*/2 * * * *", function() {
  logger.info('Running cron job 1, now output');
});

cron.schedule("00 00 * * *", function() {
  logger.info('Running cron job 2');
  fetchAndStoreNews();
});

// Function to fetch and store news

async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'Climate');
    await storeNews(country, articles);
  }
}

logger.info('Cron jobs setup, ready to run!');







