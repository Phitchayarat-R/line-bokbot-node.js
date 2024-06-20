const { client } = require("../config/line");
const { updateRepairForm, findOneRepairFormByUser } = require("./repair/index");
const { sendRepairForm } = require("./send-repairform");
const axios = require('axios');
const userService = require("./user/index");
const moment = require('moment-timezone');

let updateCount = 0;

exports.handlePostbackdetail = async (event) => {
  let msgFromUser = event.message.text.trim();

  if (global.repairId) {
    const repairData = {
      detail: msgFromUser,
      repair_status: 'รอรับเรื่อง',
    };

    await updateRepairForm(global.repairId, repairData);

    updateCount++;

    if (updateCount === 1) {

      const repairFormMessage = await sendRepairForm(event);

      const textMessage = {
        type: "text",
        text: "แจ้งเรื่องเรียบร้อยแล้วค่ะ หากดำเนินการแก้ไขเสร็จเรียบร้อยแล้ว จะมีข้อความแจ้งเตือนไปค่ะ",
      };

      updateCount--;

      await client.replyMessage(event.replyToken, [repairFormMessage, textMessage]);

      const repairmen = await userService.getUsersByRole(['เจ้าหน้าที่', 'แอดมิน']);

      const repairForms = await findOneRepairFormByUser(event.source.userId);

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
          type: 'flex',
          altText: 'รายการแจ้งซ่อมใหม่',
          contents: {
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
                  paddingBottom: "20px"
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
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "uri",
                    label: "อัปเดตสถานะ",
                    uri: "https://www.appsheet.com/start/e2806e38-a8ce-4c78-8323-25780a08e61c#appName=BOKBOT%E0%B9%81%E0%B8%AD%E0%B8%94%E0%B8%A1%E0%B8%B4%E0%B8%99-905028619-24-06-20&group=%5B%7B%22Column%22%3A%22repair_status%22%2C%22Order%22%3A%22Ascending%22%7D%5D&sort=%5B%5D&table=repairs&view=%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%8B%E0%B9%88%E0%B8%AD%E0%B8%A1"
                  },
                  style: "primary",
                  height: "sm",
                  color: "#A17DF5"
                }
              ],
              paddingTop: "5px",
              paddingBottom: "25px",
              paddingStart: "18px",
              paddingEnd: "18px"
            }
          }
        };
      });

      // แจ้งเตือนเมื่อมีรายการแจ้งซ่อมใหม่
      const addMessage = {
        type: "text",
        text: "มีรายการแจ้งซ่อมใหม่ค่ะ กรุณากดปุ่ม **อัปเดตสถานะ** เพื่อดูรายละเอียดเพิ่มเติมค่ะ"
      };

      // pushMessage ไปยัง User ID ที่มี user_role เป็น 'repairman' 'admin' ทั้งหมด
      const pushMessages = repairmen.map(repairman => ({
        to: repairman.user_id,
        messages: [...bubbles, addMessage],
      }));

      for (const pushMessage of pushMessages) {
        try {
          await axios.post('https://api.line.me/v2/bot/message/push', pushMessage, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + process.env.CHANNEL_ACCESS_TOKEN,
            },
          });
        } catch (error) {
          console.error(error.response.data);
        }
      }
    }

    global.repairId = 0;
  }

  return null;
};
