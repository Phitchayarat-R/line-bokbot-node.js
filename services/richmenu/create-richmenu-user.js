const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../../config/line");

exports.createRichMenuUser = async () => {
  const richMenuUser = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "My RichMenu User",
    chatBarText: "เมนูผู้ใช้บริการ",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500,
          height: 843,
        },
        action: {
          type: "message",
          text: "แจ้งเรื่องใหม่",
        },
      },
      {
        bounds: {
          x: 0,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "message",
          text: "เช็คสถานะ",
        },
      },
      {
        bounds: {
          x: 843,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "message",
          text: "แก้ไขโปรไฟล์",
        },
      },
      {
        bounds: {
          x: 1666,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "message",
          text: "เมนูเพิ่มเติม",
        },
      },
    ],
  };

  const newAliasId = Math.floor(1000 + Math.random() * 9000);

  // 1. create richmenu
  const richMenuUserId = await client.createRichMenu(richMenuUser);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/user-menu.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuUserId, bufferImage);
  
  // 3. set default menu for all users
  await client.setDefaultRichMenu(richMenuUserId);

  // 4. create alias to richmenu
  await client.createRichMenuAlias(richMenuUserId, newAliasId);

  //console.log(newAliasId);
  return newAliasId;
};

