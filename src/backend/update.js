const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Rafvue132',
  database: 'GDatabase',
});

const Grant = sequelize.define('grants', {
    OpportunityID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    OpportunityTitle: {
      type: DataTypes.STRING,
    },
    OpportunityNumber: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FundingInstrumentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryOfFundingActivity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryExplanation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CFDANumbers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EligibleApplicants: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AdditionalInformationOnEligibility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CloseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    LastUpdatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    AwardCeiling: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    AwardFloor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    EstimatedTotalProgramFunding: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ExpectedNumberOfAwards: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CostSharingOrMatchingRequirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ArchiveDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    GrantorContactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GrantorContactEmailDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GrantorContactText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, // Set to false if you don't need timestamps (created and updated at)
  });
  

async function insertData() {
  try {
    await sequelize.sync(); // Create the 'grants' table if it doesn't exist

    // Read the CSV file and insert data into the 'grants' table
    fs.createReadStream('/Users/bharath/Documents/GrantsPortal/GrantsProject/src/backend/opportunities.csv')
      .pipe(csv())
      .on('data', async (row) => {
        try {
            await Grant.create({
                OpportunityID: row.OpportunityID,
                OpportunityTitle: row.OpportunityTitle,
                OpportunityNumber: row.OpportunityNumber,
                category: row.category,
                FundingInstrumentType: row.FundingInstrumentType,
                CategoryOfFundingActivity: row.CategoryOfFundingActivity,
                CategoryExplanation: row.CategoryExplanation,
                CFDANumbers: row.CFDANumbers,
                EligibleApplicants: row.EligibleApplicants,
                AdditionalInformationOnEligibility: row.AdditionalInformationOnEligibility,
                AgencyCode: row.AgencyCode,
                AgencyName: row.AgencyName,
                PostDate: new Date(row.PostDate),
                CloseDate: new Date(row.CloseDate),
                LastUpdatedDate: new Date(row.LastUpdatedDate),
                AwardCeiling: parseFloat(row.AwardCeiling),
                AwardFloor: parseFloat(row.AwardFloor),
                EstimatedTotalProgramFunding: parseFloat(row.EstimatedTotalProgramFunding),
                ExpectedNumberOfAwards: parseInt(row.ExpectedNumberOfAwards),
                Description: row.Description,
                Version: row.Version,
                CostSharingOrMatchingRequirement: row.CostSharingOrMatchingRequirement,
                ArchiveDate: new Date(row.ArchiveDate),
                GrantorContactEmail: row.GrantorContactEmail,
                GrantorContactEmailDescription: row.GrantorContactEmailDescription,
                GrantorContactText: row.GrantorContactText,
              });
              
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      })
      .on('end', () => {
        console.log('Data insertion completed.');
      });
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
}

insertData();
