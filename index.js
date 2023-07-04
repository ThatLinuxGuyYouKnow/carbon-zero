console.log('the code has started!!!!!!');
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');
console.log('successful imports of externals!!!!!!');


// Run the function once a day

const cron = require('node-cron');

const countries =  ["us", "cn", "in", "br", "id", "pk", "ng", "bd", "ru", "jp", "mx", "ph", "vn", "eg", "de", "ir", "tr", "gb", "fr", "it", "za", "kr", "es", "ar", "ca", "au", "co", "my", "th", "sa", "pe", "nl", "cl", "se", "be", "ch", "pt", "pl", "sg", "hk", "dk", "fi", "no", "ie", "at", "nz", "gr", "il", "cz", "ro", "ke", "ma", "et", "dz", "gh", "tz", "ci"
  // Add the 50 most internet active country codes here, including Nigeria ('ng')
];

async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'climate'); 
    console.log('it has fetched the news!')// Change 'technology' to the desired category
    await storeNews(country, articles);
  }
}

// Run the function at a specific time every day. In this case at midnight.
cron.schedule("30 4 * * *", function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  fetchAndStoreNews();
});