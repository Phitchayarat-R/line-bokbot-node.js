const express = require("express");
const router = express.Router();

const { createRichMenuUser } = require("../services/richmenu/create-richmenu-user");
const { createRichMenuRepairman } = require("../services/richmenu/create-richmenu-repairman");
const { unlinkRichMenuRepairman } = require("../services/richmenu/unlink-richmenu-repairman");
const { deleteRichMenuRepairman } = require("../services/richmenu/delete-richmenu-repairman");
const { deleteRichMenuUser } = require("../services/richmenu/delete-richmenu-user");
const { createRichMenuAdmin } = require("../services/richmenu/create-richmenu-admin");

// localhost:4000/create/richmenu/user
router.get("/create/richmenu/user", async function (req, res, next) {
  await createRichMenuUser();
  return res.status(200).json({ message: "สร้างเมนู ผู้ใช้ สำเร็จ" });
});

// localhost:4000/delete/richmenu/user
router.get("/delete/richmenu/user", async function (req, res, next) {
  await deleteRichMenuUser();
  return res.status(200).json({ message: "ลบเมนู ผู้ใช้ สำเร็จ" });
});

//Repairman Menu
// localhost:4000/create/richmenu/repairman/userId
router.get("/create/richmenu/repairman/:userId", async function (req, res, next) {
  await createRichMenuRepairman(req.params.userId);
  return res.status(200).json({ message: "สร้างเมนู เจ้าหน้าที่ สำเร็จ" });
});

// localhost:4000/delete/richmenu/repairman
router.get("/delete/richmenu/repairman", async function (req, res, next) {
  await deleteRichMenuRepairman();
  return res.status(200).json({ message: "ลบเมนู เจ้าหน้าที่ สำเร็จ" });
});

//ยกเลิกสิทธิ์ เปลี่ยนกลับไปเป็นผู้ใช้ปกติ
// localhost:4000/unlink/richmenu/repairman/userId
router.get("/unlink/richmenu/repairman/:userId", async function (req, res, next) {
  await unlinkRichMenuRepairman(req.params.userId);
  return res.status(200).json({ message: "ยกเลิกเมนู เปลี่ยนกลับไปเป็นผู้ใช้ปกติ" });
});

//Admin Menu
// localhost:4000/create/richmenu/admin/userId
router.get("/create/richmenu/admin/:userId", async function (req, res, next) {
  await createRichMenuAdmin(req.params.userId);
  return res.status(200).json({ message: "สร้างเมนู แอดมิน สำเร็จ" });
});

module.exports = router;
