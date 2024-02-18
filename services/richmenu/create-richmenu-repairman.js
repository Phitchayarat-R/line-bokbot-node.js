const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../../config/line");

exports.createRichMenuRepairman = async (userId) => {
  const richMenuRepairman = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "My RichMenu Repairman",
    chatBarText: "เมนูเจ้าหน้าที่",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 2500,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://www.appsheet.com/start/373feb9e-b054-4c65-a5a0-6e76bf57f830#appName=MMS-905028619-24-01-06-2&group=%5B%7B%22Column%22%3A%22repair_status%22%2C%22Order%22%3A%22Ascending%22%7D%5D&sort=%5B%5D&table=repairs&view=%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%8B%E0%B9%88%E0%B8%AD%E0%B8%A1",
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
          type: "uri",
          uri: "https://www.appsheet.com/start/373feb9e-b054-4c65-a5a0-6e76bf57f830#appName=MMS-905028619-24-01-06-2&sort=%5B%5D&table=repairs&view=%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3",
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
          text: "เมนูเพิ่มเติมทั้งหมด",
        },
      },
    ],
  };

  const newAliasId = Math.floor(1000 + Math.random() * 9000);

  // 1. create richmenu
  const richMenuRepairmanId = await client.createRichMenu(richMenuRepairman);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/repairman-menu.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuRepairmanId, bufferImage);

  // 3. create alias to richmenu
  await client.createRichMenuAlias(richMenuRepairmanId, newAliasId);

  // 4. set richmenu to userId (Repairman)
  await client.linkRichMenuToUser(userId, richMenuRepairmanId);

  //console.log(newAliasId);
  return newAliasId;
};

