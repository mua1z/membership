require('dotenv').config();
const SectorType = require('./models/SectorType');
const SectorUnit = require('./models/SectorUnit');
const MemberCategory = require('./models/MemberCategory');
const SectorUnitCategory = require('./models/SectorUnitCategory');
const { sequelize } = require('./config/db');

async function run() {
  try {
    // 1. Find or create the Sector Type
    const [sectorType] = await SectorType.findOrCreate({
      where: { name: 'Government institution' }
    });
    console.log(`SectorType "${sectorType.name}" is ready with ID ${sectorType.id}`);

    // 2. The 3 Sector Units
    const unitNames = [
      'Ethio Italy Polytechnic College',
      'Dire Dawa Polytechnic College',
      'Sport and Youth Commission'
    ];

    // 3. The 3 Member Categories
    // Using the 3 most common categories for institutions based on existing data
    const catNames = [
      'Employee Members',
      'Employee Women Wing Members',
      'Employee Youth Wing Members'
    ];
    
    const categories = await MemberCategory.findAll({
      where: { name: catNames }
    });

    for (const uName of unitNames) {
      const [unit] = await SectorUnit.findOrCreate({
        where: { name: uName },
        defaults: { sectorTypeId: sectorType.id }
      });
      console.log(`SectorUnit "${unit.name}" is ready with ID ${unit.id}`);

      // If defaults didn't trigger, ensure sectorTypeId is set
      if (unit.sectorTypeId !== sectorType.id) {
        unit.sectorTypeId = sectorType.id;
        await unit.save();
      }

      // Link categories
      for (const cat of categories) {
        await SectorUnitCategory.findOrCreate({
          where: {
            sectorUnitId: unit.id,
            memberCategoryId: cat.id
          }
        });
      }
      console.log(`   -> Linked 3 categories to "${unit.name}"`);
    }

    console.log("Done adding new sectors and linking categories.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await sequelize.close();
  }
}

run();
