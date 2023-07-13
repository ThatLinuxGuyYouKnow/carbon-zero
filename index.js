const cron = require('node-cron');
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

// Define your cron jobs

cron.schedule("*/2 * * * *", function() {
  logger.info('Running cron job 1, now output');
 
});

cron.schedule("06 00 * * *", function() {
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