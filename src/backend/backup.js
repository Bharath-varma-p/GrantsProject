const mysql = require('mysql2/promise');

async function createPool() {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rafvue132',
    database: 'GDatabase'
  });

  return pool;
}


async function main() {

  const pool = await createPool();

// Create an INSERT statement
const sql = 'INSERT INTO grants (id,title, number, category, FundingInstrumentType, CategoryOfFundingActivity, CategoryExplanation, CFDANumbers, EligibleApplicants, AdditionalInformationOnEligibility, AgencyCode, AgencyName, PostDate, CloseDate, LastUpdatedDate, AwardCeiling, AwardFloor, EstimatedTotalProgramFunding, ExpectedNumberOfAwards, Description, Version, CostSharingOrMatchingRequirement, ArchiveDate, GrantorContactEmail, GrantorContactEmailDescription, GrantorContactText) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

// Bind the values from the opportunities array to the INSERT statement
const values = opportunities.map(opportunity => [
  opportunity.id,
  opportunity.title,
  opportunity.number,
  opportunity.category,
  opportunity.FundingInstrumentType,
  opportunity.CategoryOfFundingActivity,
  opportunity.CategoryExplanation,
  opportunity.CFDANumbers,
  opportunity.EligibleApplicants,
  opportunity.AdditionalInformationOnEligibility,
  opportunity.AgencyCode,
  opportunity.AgencyName,
  opportunity.PostDate,
  opportunity.CloseDate,
  opportunity.LastUpdatedDate,
  opportunity.AwardCeiling,
  opportunity.AwardFloor,
  opportunity.EstimatedTotalProgramFunding,
  opportunity.ExpectedNumberOfAwards,
  opportunity.Description,
  opportunity.Version,
  opportunity.CostSharingOrMatchingRequirement,
  opportunity.ArchiveDate,
  opportunity.GrantorContactEmail,
  opportunity.GrantorContactEmailDescription,
  opportunity.GrantorContactText
]);

// Execute the INSERT statement
const results = await pool.query(sql, values);

console.log('Grants inserted successfully');


}

main();