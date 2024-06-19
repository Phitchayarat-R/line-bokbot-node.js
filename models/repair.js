const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Repair = sequelize.define(
  "Repair",
  {
    // Model attributes are defined here
    id_code: DataTypes.STRING,
    created_by: DataTypes.STRING, 
    display_name: DataTypes.STRING,
    picture_url: DataTypes.TEXT,
    user_phone: DataTypes.STRING,
    type_detail: DataTypes.TEXT, 
    detail: DataTypes.TEXT, 
    repair_by: DataTypes.STRING, 
    repair_phone: DataTypes.STRING,
    finished_date: DataTypes.DATE, 
    repair_status:{
      type: DataTypes.ENUM,
      values: ['รอรับเรื่อง','กำลังดำเนินการ','เสร็จสิ้น' ],
      defaultValue: null
    },
    picture: DataTypes.TEXT,
    picture_repair: DataTypes.TEXT,
    url_repair: DataTypes.TEXT,
    location: DataTypes.TEXT,
  },
  {
    tableName: "repairs",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Repair;
