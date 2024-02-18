const fs = require("fs").promises;
const path = require("path");
const { Op } = require("sequelize");

const Repair = require("../../models/repair");

// สร้าง repair form ใหม่
exports.createRepairForm = async (repairData) => {
  return await Repair.create(repairData);
};

// แก้ไข repair form
exports.updateRepairForm = async (repairId, repairData) => {
  return await Repair.update(repairData, {
    where: {
      id: repairId,
    },
  });
};

// ลบ record ของ user คนนี้ที่อยู่ระหว่างแจ้งซ่อมแต่ยังไม่สำเร็จ (repair_status = 0)
exports.deleteRepairFormUnCompleted = async (userId) => {
  return await Repair.destroy({
    where: {
      created_by: userId,
      repair_status: null,
    },
  });
};

// ค้นหาภาพที่อยู่ระหว่างการแจ้งซ่อมของคนนี้ แล้วลบออกจาก server
exports.deleteImageWhenUnCompleted = async (userId) => {
  const repairForm = await Repair.findOne({
    attributes: ["picture"],
    where: {
      created_by: userId,
      repair_status: 0,
    },
  });

  if (repairForm) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve("./");
    //path ของไฟล์ภาพที่ต้องการลบ พร้อมชื่อที่ได้จาก table
    const filePath = `${projectPath}/public/upload/${repairForm.picture}`;

    await fs.unlink(filePath); // delete image
  }
};

// ค้นหาการแจ้งซ่อม 10
exports.findAllRepairFormByUser = async (userId) => {
  return await Repair.findAll({
    where: {
      created_by: userId,
      repair_status: {
        [Op.ne]: null 
      }
    },
    order: [ ['id', 'DESC'] ],
    limit: 10
  });
};

// แจ้งซ่อม 1
exports.findOneRepairFormByUser = async (userId) => {
  return await Repair.findAll({
    where: {
      created_by: userId,
      repair_status: {
        [Op.ne]: null 
      }
    },
    order: [ ['id', 'DESC'] ],
    limit: 1
  });
};

