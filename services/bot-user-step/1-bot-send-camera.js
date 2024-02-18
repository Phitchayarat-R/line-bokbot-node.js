exports.botSendCamera = () => {
  let msg = {
    type: "text",
    text: "ส่งภาพปัญหาที่ต้องการแจ้งมาได้เลยค่ะ",
    quickReply: {
      items: [
        {
          type: "action",
          imageUrl: "https://img5.pic.in.th/file/secure-sv1/camera89283d3f8728f166.png",
          action: {
            type: "camera",
            label: "ถ่ายภาพ",
          },
        },
        {
          type: "action",
          imageUrl: "https://img5.pic.in.th/file/secure-sv1/gallery.png",
          action: {
            type: "cameraRoll",
            label: "ภาพจากอัลบั้ม",
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
