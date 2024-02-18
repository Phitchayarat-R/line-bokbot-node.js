const { client } = require("../../config/line");
const { createRichMenuUser } = require("./create-richmenu-user");

exports.deleteRichMenuUser = async () => {

  // ให้ค่า newAliasId จากการสร้าง Rich Menu
  const newAliasId = await createRichMenuUser();

  await client.deleteRichMenuAlias(newAliasId);
  await client.deleteDefaultRichMenu()

  //console.log(newAliasId);
};


