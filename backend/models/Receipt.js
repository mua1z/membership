// models/Receipt.js - Receipt Model (Sequelize / MySQL)
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Receipt = sequelize.define('Receipt', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  receiptId: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    defaultValue: () => `RCP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
  },

  // FKs
  paymentDbId: { type: DataTypes.INTEGER, allowNull: false },
  memberDbId:  { type: DataTypes.INTEGER, allowNull: false },

  // Redundant strings for fast display
  memberId:   { type: DataTypes.STRING(50),  allowNull: false },
  memberName: { type: DataTypes.STRING(255), allowNull: false },

  // Receipt Details
  amount:   { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  currency: { type: DataTypes.ENUM('ETB', 'USD'), defaultValue: 'ETB' },

  // Period
  periodMonth: { type: DataTypes.INTEGER, allowNull: false },
  periodYear:  { type: DataTypes.INTEGER, allowNull: false },

  paymentMethod: { type: DataTypes.STRING(100), allowNull: false },
  issuedBy:      { type: DataTypes.STRING(255), allowNull: false },
  issuedAt:      { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  branch: { type: DataTypes.STRING(100), allowNull: false },

  status: {
    type: DataTypes.ENUM('Issued', 'Voided'),
    defaultValue: 'Issued'
  },
  pdfPath: { type: DataTypes.STRING(500), allowNull: true }

}, {
  tableName: 'receipts',
  timestamps: true,
  indexes: [
    { fields: ['memberId'] },
    { fields: ['issuedAt'] }
  ]
});

// toJSON: reconstruct nested period + populate-like objects
Receipt.prototype.toJSON = function () {
  const v = Object.assign({}, this.get());
  v._id = v.id;
  v.period = { month: v.periodMonth, year: v.periodYear };
  if (v.memberInfo) v.member  = v.memberInfo;
  if (v.paymentInfo) v.payment = v.paymentInfo;
  return v;
};

module.exports = Receipt;
