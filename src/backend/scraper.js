const cheerio = require('cheerio');
const fs = require('fs');

// Load XML file 
const xml = fs.readFileSync('/Users/bharath/Documents/GrantsProject/Downloaded_data/GrantsDBExtract20231005v2.xml', 'utf8');

// Parse XML using cheerio
const $ = cheerio.load(xml, {xmlMode: true}); 

// Extract data
const opportunities = [];

$('OpportunitySynopsisDetail_1_0').each((i, elem) => {

  const id = $(elem).find('OpportunityID').text();
  const title = $(elem).find('OpportunityTitle').text();
  const number = $(elem).find('OpportunityNumber').text();
  const category = $(elem).find('OpportunityCategory').text();

  // Extract other fields...

  const opportunity = {
    id,
    title,
    number
    // Other fields...
  };

  opportunities.push(opportunity);

});

console.log(opportunities);