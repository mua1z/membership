const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mcms1', 'prosperity', 'dire@2026@#', {
  host: '213.55.96.152',
  port: 32636,
  dialect: 'mysql',
  connectTimeout: 5000,
});

async function testConnection() {
  try {
    console.log('Attempting to connect to 213.55.96.152:32636...');
    await sequelize.authenticate();
    console.log('✅ Connection successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    process.exit();
  }
}

testConnection();
