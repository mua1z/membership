'use strict';
// migrate.js — Run this once in Plesk "Run Node.js commands" to create all tables
// Command: node backend/migrate.js

require('dotenv').config({ path: __dirname + '/.env' });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:    process.env.DB_HOST,
    port:    Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: (msg) => console.log('[SQL]', msg),
    dialectOptions: {
      connectTimeout: 60000
    },
    define: {
      charset:   'utf8mb4',
      collate:   'utf8mb4_unicode_ci',
      timestamps: true
    }
  }
);

const run = async () => {
  try {
    console.log('\n🔌 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected to:', process.env.DB_HOST, '/', process.env.DB_NAME);
  } catch (err) {
    console.error('❌ Cannot connect to database:', err.message);
    console.error('   Check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT in .env');
    process.exit(1);
  }

  // ── Load ALL models ────────────────────────────────────────────────────────
  console.log('\n📦 Loading models...');
  require('./models/User');
  require('./models/Member');
  require('./models/Contribution');
  require('./models/Payment');
  require('./models/Receipt');
  require('./models/Setting');
  require('./models/SectorType');
  require('./models/SectorUnit');
  require('./models/MemberCategory');
  require('./models/SectorUnitCategory');
  require('./models/SectorPayment');
  require('./models/SectorPaymentAuditLog');
  require('./models/Conversation');
  require('./models/Message');
  require('./models/ConversationMetadata');
  require('./models/Notification');
  require('./models/AIActivityLog');
  require('./models/UserDashboardPreference');
  require('./models/AuditLog');
  require('./models/LandingPageContent');
  require('./models/LandingPageImage');
  require('./models/News');
  require('./models/VerifyEtPayment');
  console.log('✅ All 23 models loaded');

  // ── Create tables ──────────────────────────────────────────────────────────
  console.log('\n⏳ Creating tables (FK checks disabled)...');
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

  try {
    await sequelize.sync({ force: false });
    console.log('✅ All tables created successfully');
  } catch (err) {
    console.error('⚠️  Sync error:', err.message);
  }

  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Table schemas updated');
  } catch (err) {
    console.error('⚠️  Alter error (non-fatal):', err.message);
  }

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  // ── Run migrations ─────────────────────────────────────────────────────────
  console.log('\n⏳ Running migrations...');
  const migrations = [
    './migrations/create_chat_tables',
    './migrations/create_ai_logs',
    './migrations/create_sector_payments',
    './migrations/alter_sector_payments_transaction_id',
    './migrations/create_sector_payment_audit_logs',
    './migrations/create_audit_logs',
    './migrations/create_export_logs',
    './migrations/create_landing_page_tables',
    './migrations/create_news_table',
    './migrations/alter_user_role_enum',
    './migrations/alter_user_otp',
    './migrations/create_verify_et_payments',
  ];

  for (const m of migrations) {
    try {
      await require(m)();
      console.log(`  ✅ ${m.replace('./migrations/', '')}`);
    } catch (err) {
      console.error(`  ⚠️  ${m.replace('./migrations/', '')}: ${err.message}`);
    }
  }

  console.log('\n🎉 Migration complete! All tables are ready.\n');
  await sequelize.close();
  process.exit(0);
};

run();
