exports.botSendLocation = () => {
  let msg = {
    type: "text",
    text: "กรุณาส่ง Location ค่ะ",
    quickReply: {
      items: [
        {
          type: "action",
          imageUrl: "https://img5.pic.in.th/file/secure-sv1/mapad5c84d5fa884c96.png",
          action: {
            type: "location",
            label: "ส่ง Location",
          },
        },
        {
          type: "action",
          imageUrl: "https://img5.pic.in.th/file/secure-sv1/delete-button.png",
          action: {
            type: "message",
            label: "ยกเลิก",
            text: "ยกเลิก/กลับสู่เมนูหลัก",
          },
        },
      ],
    },
  };

  return msg;
};
