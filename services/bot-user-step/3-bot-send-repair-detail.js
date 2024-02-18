exports.botSendRepairDetail = () => {
  let items = [];
  
  let repairDetail = ['อุปกรณ์ชำรุด', 'สถานที่ชำรุด', 'เหตุขัดข้อง', 'ไฟฟ้า', 'ประปา', 'จุดเสี่ยง', 'น้ำท่วม', 'ความสะอาด', 'อื่นๆ'];

  items = repairDetail.map((item) => {
    return {
        type: "action",
        imageUrl: "https://img5.pic.in.th/file/secure-sv1/request.png",
        action: {
            type: "postback",
            text: `${item}`,
            label: item,
            data: item,
        }
    }
  });

  let msg = {
    type: "text",
    text: "กรุณาเลือกประเภทเรื่องที่ต้องการแจ้งค่ะ",
    quickReply: {
      items: items
    },
  };

  return msg;
};
