const { client } = require("../../config/line");

exports.deleteRichMenuRepairman = async () => {
  
  const newAliasId = await createRichMenuRepairman();
  // delete richmenu by alias
  await client.deleteRichMenuAlias(newAliasId);

  //console.log(newAliasId);
};
