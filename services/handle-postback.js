const { client } = require("../config/line");
const { updateRepairForm } = require("./repair/index");

exports.handlePostback = async (event) => {
  let repairDetail = event.postback.data; 
  //console.log(repairDetail);

  //update repair detail to repair table
    const repairData = {
    type_detail: repairDetail,  
  };
  await updateRepairForm(global.repairId, repairData);

  let msg = {
    type: "text",
    text: `กรุณาระบุสถานที่และรายละเอียดเพิ่มเติมของเรื่อง **${repairDetail}** มา 1 ข้อความค่ะ`,
  };

   return client.replyMessage(event.replyToken, msg);
};
