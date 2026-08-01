require('dotenv').config();
const Setting = require('./models/Setting');
const { sequelize } = require('./config/db');

async function getSettings() {
  try {
    const settings = await Setting.findOne();
    if (settings) {
      console.log(JSON.stringify(settings.contributionRules, null, 2));
    } else {
      console.log('No settings found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

getSettings();
