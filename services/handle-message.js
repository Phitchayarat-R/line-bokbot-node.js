const config = require('../config/line');
const { client } = require("../config/line");
const userService = require("./user/index");
const { botSendCamera } = require('./bot-user-step/1-bot-send-camera');
const { deleteRepairFormUnCompleted } = require('./repair');
const { sendRepairFormUser } = require('./send-repairform-user');
const {handlePostbackdetail} = require("./handle-postback-detail");
const { findAllRepairFormByUser } = require("./repair/index");
const { botSendLocation } = require('./bot-user-step/2-bot-send-location');

exports.handleMessage = async (event) => {
    let msg;
    let msgFromUser = event.message.text.trim();
    const repairDetailOptions = ['อุปกรณ์ชำรุด', 'สถานที่ชำรุด', 'เหตุขัดข้อง', 'ไฟฟ้า', 'ประปา', 'จุดเสี่ยง', 'น้ำท่วม', 'ความสะอาด', 'อื่นๆ'];
    const userId = event.source.userId;
    const profile = await client.getProfile(userId); 

    if (msgFromUser === "แจ้งเรื่องใหม่") {

            const user = await userService.getUserPhoneNumber(userId);
            //await deleteRepairFormUnCompleted(event.source.userId);
            if (user && user.user_phone) {
                msg = botSendCamera();
            } else {
                msg = { type: "text", text: "กรุณาพิมพ์หมายเลขโทรศัพท์ของคุณ เพื่อบันทึกลงใน**โปรไฟล์**ก่อนเริ่มต้นใช้งานค่ะ" };
            }
    } 
    else if (msgFromUser === "ยกเลิก/กลับสู่เมนูหลัก") {
        await deleteRepairFormUnCompleted(event.source.userId);
        msg = { type: "text", text: "เลือกเมนูด้านล่าง เพื่อเริ่มต้นใช้งานได้เลยค่ะ" };
    } 
    else if (msgFromUser === "เช็คสถานะ") {
        //await deleteRepairFormUnCompleted(event.source.userId);
        const repairForms = await findAllRepairFormByUser(event.source.userId);
        if (!repairForms || repairForms.length === 0) {
            msg = { type: "text", text: "ยังไม่มีรายการแจ้งซ่อมให้ติดตามค่ะ" };
        }else{
            msg = await sendRepairFormUser(event);
        }
    }
    else if (msgFromUser === "แก้ไขโปรไฟล์") {
        //await deleteRepairFormUnCompleted(event.source.userId);
        msg = { type: "text", text: "กรุณาพิมพ์หมายเลขโทรศัพท์ของคุณ เพื่ออัปเดตข้อมูลใหม่ค่ะ" };
    } 
    else if (msgFromUser === "เช็คฝุ่น PM2.5") {
        msg = botSendLocation();
    }  
    else if (msgFromUser === "เมนูเพิ่มเติม") {
        const createImageSlide = (imageUrl, actionType, actionValue) => {
            return {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: imageUrl,
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "1:1",
                    gravity: "top",
                    action: {
                        type: actionType,
                        label: "action",
                        [actionType === "uri" ? "uri" : "text"]: actionValue
                    }
                }
              ],
              "paddingAll": "0px"
            },
              size: "mega"
            };
          };
          
          msg = imageCarousel = {
            type: 'flex',
            altText: 'เมนูเพิ่มเติม',
            contents: {
              type: 'carousel',
              contents: [
                createImageSlide('https://img2.pic.in.th/pic/114dfa9110dbbd395.png', 'message', 'เช็คฝุ่น PM2.5'),
                createImageSlide('https://img5.pic.in.th/file/secure-sv1/2520efcb029efbc95.png', 'uri', 'tel:0929655102'),
              ],
            },
          };
    }  
    else if (msgFromUser === "เมนูเพิ่มเติมทั้งหมด") {
        const createImageSlide = (imageUrl, actionType, actionValue) => {
            return {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "image",
                    url: imageUrl,
                    size: "full",
                    aspectMode: "cover",
                    aspectRatio: "1:1",
                    gravity: "top",
                    action: {
                        type: actionType,
                        label: "action",
                        [actionType === "uri" ? "uri" : "text"]: actionValue
                    }
                }
              ],
              "paddingAll": "0px"
            },
              size: "mega"
            };
          };
          
          msg = imageCarousel = {
            type: 'flex',
            altText: 'เมนูเพิ่มเติมทั้งหมด',
            contents: {
              type: 'carousel',
              contents: [
                createImageSlide('https://img5.pic.in.th/file/secure-sv1/483a66804ef28095b.png', 'message', 'แจ้งเรื่องใหม่'),
                createImageSlide('https://img5.pic.in.th/file/secure-sv1/308f90311c5a7fb4d.png', 'message', 'เช็คสถานะ'),
                createImageSlide('https://img2.pic.in.th/pic/114dfa9110dbbd395.png', 'message', 'เช็คฝุ่น PM2.5'),
                createImageSlide('https://img5.pic.in.th/file/secure-sv1/2520efcb029efbc95.png', 'uri', 'tel:0929655102'),
              ],
            },
          };
    }  
    else if  (repairDetailOptions.includes(msgFromUser)) {
        return null;
    } 
    else if (msgFromUser.startsWith("0")) {

        if (/^0\d{9}$/.test(msgFromUser)) {
            
            const newUserPhone = event.message.text.trim();   
        
            await userService.updateUser(
                profile.userId,
                1,
                profile.displayName,
                profile.pictureUrl,
                newUserPhone
            );
            msg = { type: "text", text: "บันทึกหมายเลขโทรศัพท์เรียบร้อยแล้วค่ะ หากต้องการแก้ไขกรุณาเลือกเมนู**แก้ไขโปรไฟล์**ค่ะ" };
        } else {
            msg = { type: "text", text: "กรุณาพิมพ์หมายเลขโทรศัพท์ของคุณให้ถูกต้องค่ะ" };
        }
    }
    else {
        handlePostbackdetail(event);
        return null;
    }

    return config.client.replyMessage(event.replyToken, msg);
}