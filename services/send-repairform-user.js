const { findAllRepairFormByUser } = require("./repair/index");
const moment = require('moment-timezone');

exports.sendRepairFormUser = async (event) => {
  const repairForms = await findAllRepairFormByUser(event.source.userId);

  let bubbles = [];

  bubbles = repairForms.map((item) => {
    let status = "";
    if (item.repair_status === 'รอรับเรื่อง') {
      status = "รอรับเรื่อง";
    } else if (item.repair_status === 'กำลังดำเนินการ') {
      status = "กำลังดำเนินการ";
    } else if (item.repair_status === 'เสร็จสิ้น') {
      status = "เสร็จสิ้น";
    }

    return {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: item.picture,
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "4:3",
                    gravity: "center"
                  }
                ],
                flex: 1
              }
            ]
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "image",
                    url: item.picture_url,
                    aspectMode: "cover",
                    size: "full"
                  }
                ],
                cornerRadius: "100px",
                width: "72px",
                height: "72px"
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "text",
                        text: item.type_detail,
                        size: "16px",
                        flex: 1,
                        weight: "bold"
                      },
                      {
                        type: "text",
                        text: item.id_code,
                        flex: 0,
                        size: "15px",
                        weight: "bold"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    type: "text",
                    text: item.detail,
                    wrap: true,
                    size: "15px",
                    offsetTop: "3px"
                  },
                  {
                    type: "text",
                    text: "แจ้งเมื่อ: " + moment(item.updated_at).tz('Asia/Bangkok').locale('th').add(543, 'years').format('D MMM YY HH:mm') + " น.",
                    align: "end",
                    decoration: "underline",
                    offsetTop: "15px",
                    size: "14px",
                    gravity: "bottom"
                  }
                ],
                paddingStart: "12px",
                paddingBottom: "12px"
              }
            ],
            paddingAll: "18px",
            paddingStart: "18px",
            paddingEnd: "20px",
            paddingBottom: "25px"
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: status,
                size: "22px",
                color: status === 'รอรับเรื่อง' ? '#F34237' : (status === 'กำลังดำเนินการ' ? '#ffc100' : '#1DB446'),
                weight: "bold",
                align: "center",
                offsetTop: "3px"
              }
            ],
            position: "absolute",
            cornerRadius: "30px",
            offsetTop: "10px",
            offsetStart: "15px",
            paddingAll: "20px",
            paddingTop: "4px",
            backgroundColor: "#ebebebcc",
            paddingBottom: "8px"
          }
        ],
        paddingAll: "0px"
      },
    };
  });

  let msg = {
    type: "flex",
    altText: "รายการแจ้งซ่อมของฉัน",
    contents: {
      type: "carousel",
      contents: bubbles,
    },
  };

  return msg;
};