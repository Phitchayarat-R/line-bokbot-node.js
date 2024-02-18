const { client } = require("../config/line");
const userService = require("./user/index");
//const { sendWelcomeMsg } = require('./send-welcome-msg');

exports.handleFollow = async (event) => {
    const userId = event.source.userId;
    // console.log("user_id follow/unblock", userId);

    //get user profile
    const profile = await client.getProfile(userId); 
    // console.log(profile);

    //insert profile to users table
    const isExist = await userService.isUserExist(userId);
    if (!isExist) { // ถ้าไม่มี user ให้เพิ่มใหม่
        await userService.createUser(
            profile.userId,
            profile.displayName,
            profile.pictureUrl
        );
    } else { // ถ้ามี user อยู่แล้วให้ update ด้วย
        await userService.updateUser(
            profile.userId, 
            'ติดตาม', 
            profile.displayName,
            profile.pictureUrl
        );
    }

    /*let msg;
    msg = sendWelcomeMsg();
    return client.replyMessage(event.replyToken, msg);*/
}