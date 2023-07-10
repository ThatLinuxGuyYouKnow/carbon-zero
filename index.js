console.log('the code has started!!!!!!');
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');



// Run the function once a day
const cron = require('node-cron');

const countries =  ["us", "br", "ng", "ru", "mx", "eg", "de", "tr", "gb", "fr", "it", "za", "es", "ar", "ca", "sa", "pl", "sg", "dk", "fi", "no", "ie", "at", "nz", "gr", "il", "cz", "ro", "ke", "ma", "et", "dz", "gh", "tz", "ci"];

// Rest of the code...

  // Add the 50 most internet active country codes here, including Nigeria ('ng')

async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'Climate'); 
    console.log('it has fetched the news!')
// Change 'technology' to the desired category
    await storeNews(country, articles);
  }
}

// Run the function at a specific time every day. In this case at midnight.
cron.schedule("30 00 * * *", function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  fetchAndStoreNews();
});