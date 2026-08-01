require('dotenv').config();
const Member = require('./models/Member');
const { sequelize } = require('./config/db');

async function test() {
  try {
    const members = await Member.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });
    console.log(JSON.stringify(members, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

test();
