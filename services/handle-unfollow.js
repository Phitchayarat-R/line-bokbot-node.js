const userService = require("./user/index");

exports.handleUnFollow = async (event) => {
    const userId = event.source.userId;
    // console.log("user_id unfollow/block", userId);

    const isExist = await userService.isUserExist(userId);
    if (isExist) {
        await userService.updateIsActiveUser(userId, 'เลิกติดตาม'); 
    }

}