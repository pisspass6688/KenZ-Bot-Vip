module.exports.config = {
 name: "chongcuopbox",
 version: "1.0.0",
 credits: "D-Jukie",
 hasPermssion: 2,
 description: "Ngăn chặn việc thay đổi admin",
 usages: "Dùng sẽ không thể set admin đc nữa",
 commandCategory: "Dành cho admin bot",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('»Bot cần quyền quản trị viên nhóm, vui lòng thêm và thử lại!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`» Đã ${(data["guard"] == true) ? "bật" : "tắt"} thành công guard!`, event.threadID, event.messageID);
}