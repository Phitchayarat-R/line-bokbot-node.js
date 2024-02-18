const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../../config/line");

exports.createRichMenuAdmin = async (userId) => {
  const richMenuAdmin = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: true,
    name: "My RichMenu Admin",
    chatBarText: "เมนูแอดมิน",
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
          uri: "https://www.appsheet.com/start/0c72c0f3-cf48-4365-a02a-df0e56d2b651#appName=BOKBOT%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%81%E0%B8%AD%E0%B8%94%E0%B8%A1%E0%B8%B4%E0%B8%99-905028619-24-01-06-3&group=%5B%7B%22Column%22%3A%22repair_status%22%2C%22Order%22%3A%22Ascending%22%7D%5D&sort=%5B%5D&table=repairs&view=%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%8B%E0%B9%88%E0%B8%AD%E0%B8%A1",
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
          uri: "https://www.appsheet.com/start/0c72c0f3-cf48-4365-a02a-df0e56d2b651#appName=BOKBOT%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%81%E0%B8%AD%E0%B8%94%E0%B8%A1%E0%B8%B4%E0%B8%99-905028619-24-01-06-3&sort=%5B%5D&table=repairs&view=%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3",
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
          type: "uri",
          uri: "https://www.appsheet.com/start/0c72c0f3-cf48-4365-a02a-df0e56d2b651#appName=BOKBOT%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%81%E0%B8%AD%E0%B8%94%E0%B8%A1%E0%B8%B4%E0%B8%99-905028619-24-01-06-3&group=%5B%7B%22Column%22%3A%22user_role%22%2C%22Order%22%3A%22Descending%22%7D%5D&sort=%5B%5D&table=users&view=%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81",
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
  const richMenuAdminId = await client.createRichMenu(richMenuAdmin);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/admin-menu.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuAdminId, bufferImage);

  // 3. create alias to richmenu
  await client.createRichMenuAlias(richMenuAdminId, newAliasId);

  // 4. set richmenu to userId (Repairman)
  await client.linkRichMenuToUser(userId, richMenuAdminId);

  //console.log(newAliasId);
  return newAliasId;
};

