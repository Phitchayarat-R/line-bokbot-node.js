const { DataTypes } = require('sequelize');
const sequelize = require("../config/mysql");

const User = sequelize.define(
  'User', 
  {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  display_name: {
    type: DataTypes.STRING
  },
  picture_url: DataTypes.TEXT,
  is_active: {
    type: DataTypes.ENUM,
    values: ['ติดตาม', 'เลิกติดตาม'],
    defaultValue: 'ติดตาม'
  },
  user_phone: DataTypes.STRING,
  user_role: {
    type: DataTypes.ENUM,
    values: ['ผู้ใช้', 'เจ้าหน้าที่', 'แอดมิน'],
    defaultValue: 'ผู้ใช้'
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users', 
});

module.exports = User;