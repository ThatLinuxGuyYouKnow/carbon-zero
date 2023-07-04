console.log('the code has started!!!!!!');
const fetchNews = require('./fetchNews');
const storeNews = require('./storeNews');

const countries = ["us", "cn", "in", "br", "id", "pk", "ng", "bd", "ru", "jp", "mx", "ph", "vn", "eg", "de", "ir", "tr", "gb", "fr", "it", "za", "kr", "es", "ar", "ca", "au", "co", "my", "th", "sa", "pe", "nl", "cl", "se", "be", "ch", "pt", "pl", "sg", "hk", "dk", "fi", "no", "ie", "at", "nz", "gr", "il", "cz", "ro", "ke", "ma", "et", "dz", "gh", "tz", "ci"];

async function fetchAndStoreNews() {
  for (const country of countries) {
    const articles = await fetchNews(country, 'climate'); // Change 'technology' to the desired category
    await storeNews(country, articles);
    console.log('successful at first');
  }
}

// Run the function once a day
setInterval(fetchAndStoreNews, 24 * 60 * 60 * 1000);