module.exports.config = {
    name: "qtv",
    version: "1.0",
    hasPermssion: 1,
    credits: "D-Jukie fix Kadeer",
    description: "Quản lý nhóm",
    commandCategory: "Dành cho qtv box",
    usages: "qtvonly",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args }) {
const { threadID, messageID, mentions } = event;
  if (args[0] == "box") {
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("[ OFF ] - Tắt thành công chế độ admin (tất cả mọi người đều có thể sử dụng bot)", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("[ ON ] - Bật thành công chế độ admin (chỉ admin box mới có thể sử dụng bot)", threadID, messageID);
        }
  }
  if (args[0] == "add") {
  if (Object.keys(event.mentions) == 0) return api.changeAdminStatus(event.threadID, args.join(" "), true);
  else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) api.changeAdminStatus(event.threadID ,`${Object.keys(event.mentions)[i]}`, true)
  return; 
    }
}
if (args[0] == "del") {
if (Object.keys(event.mentions) == 0) return api.changeAdminStatus(event.threadID, args.join(" "), true);
  else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) api.changeAdminStatus(event.threadID ,`${Object.keys(event.mentions)[i]}`, false)
  return; 
    }
}
 if (args[0] == "me") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("Bot cần ném quản trị viên để dùng ?", event.threadID, event.messageID)
      else if (!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("Bạn không đủ quyền hạn!", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
  }
  else 
		return api.sendMessage(`Bạn có dùng\n${global.config.PREFIX}${this.config.name} box => bật tắt qtv boxonly\n${global.config.PREFIX}${this.config.name} add @tag => thêm người dùng làm qtv nhóm\n${global.config.PREFIX}${this.config.name} del @tag => gỡ quyền quản trị viên của người dùng\n${global.config.PREFIX}${this.config.name} me chỉ định làm qtv nhóm\nĐiều kiện: Bạn và bot điều phải là qtv`, threadID, messageID);
}