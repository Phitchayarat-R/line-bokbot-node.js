const fs = require("fs");
const uuid = require("uuid");
const { client } = require("../config/line");
const { botSendLocation } = require("./bot-user-step/2-bot-send-location");
const { botSendCamera } = require("./bot-user-step/1-bot-send-camera");
const { createRepairForm } = require("./repair");
const { getUserPhoneNumber } = require("./user");
const axios = require("axios").default;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handleImage = async (event) => {
  let msg;
  //console.log(event.message);

  // ส่งมารูปเดียวจริง
  if (event.message.imageSet === undefined) {
    // get content from line server
    const response = await axios.get(
      `https://api-data.line.me/v2/bot/message/${event.message.id}/content`,
      {
        headers: {
          Authorization: "Bearer " + process.env.CHANNEL_ACCESS_TOKEN,
        },
        responseType: "stream",
      }
    );

    // สร้างชื่อไฟล์ใหม่
    function generateCode() {
      const year = new Date().getFullYear();
      const randomString = uuid.v4().substring(0, 4).toUpperCase();;  
      return `${year}-${randomString}`;
    }

    const newCode = generateCode();
    //console.log(newCode);

    // ดึงข้อมูลผู้ใช้จากตาราง User
    const user = await getUserPhoneNumber(event.source.userId);
    const profile = await client.getProfile(event.source.userId);


    // Upload image to Cloudinary
    const imageStream = response.data;
    const cloudinaryUpload = await cloudinary.uploader.upload_stream(
      {
        folder: 'repair_images',
        public_id: newCode,
        format: 'jpg', // or 'png', 'gif', etc.
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        const imageUrl = result.secure_url;

        // สร้างใบแจ้งซ่อมใหม่ บันทึกไปที่ตาราง repair
        const repairData = {
          id_code: newCode,
          created_by: event.source.userId,
          display_name: profile.displayName,
          picture_url: profile.pictureUrl,
          user_phone: user.user_phone,
          picture: imageUrl,
          // picture_repair: imageUrl,
        };

        const repairForm = await createRepairForm(repairData);
        global.repairId = repairForm.id;

        //send location quickreply button
        msg = botSendLocation();

        return client.replyMessage(event.replyToken, msg);
      }
    );
    imageStream.pipe(cloudinaryUpload);
  } else {
    // ส่งมา >= 2 รูปภาพขึ้นไป (หลายรูปภาพ)
    if (event.message.imageSet.index === 1) {
      let msg1 = { type: "text", text: "ส่งภาพได้เพียง 1 ภาพเท่านั้น กรุณาลองใหม่ค่ะ" };
      let msg2 = botSendCamera();
      let msg = [];
      msg.push(msg1);
      msg.push(msg2);
      return client.replyMessage(event.replyToken, msg);
    }
  }
};
