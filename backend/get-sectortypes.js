require('dotenv').config();
const SectorType = require('./models/SectorType');
const { sequelize } = require('./config/db');

async function getSectorTypes() {
  try {
    const types = await SectorType.findAll();
    console.log(JSON.stringify(types, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

getSectorTypes();
