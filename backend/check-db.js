require('dotenv').config();
const SectorType = require('./models/SectorType');
const SectorUnit = require('./models/SectorUnit');
const MemberCategory = require('./models/MemberCategory');
const SectorUnitCategory = require('./models/SectorUnitCategory');
const { sequelize } = require('./config/db');

async function check() {
  try {
    const types = await SectorType.findAll();
    console.log("Sector Types:");
    console.log(types.map(t => t.name).join(', '));

    const units = await SectorUnit.findAll();
    console.log("Sector Units:");
    console.log(units.map(u => u.name).join(', '));

    const cats = await MemberCategory.findAll();
    console.log("Categories:");
    console.log(cats.map(c => c.name).join(', '));

  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();
