module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios')
  const moment = require("moment-timezone");
  return async function ({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, keyAdminOnly, ndhOnly, ibrieng, DANGKY, DUYETBOX, spamOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)})\\s*`);
    if (!prefixRegex.test(body)) return;
    const adminBot = require('./../../config.json');
    const ndhBot = require('./../../config.json');

    if (!ADMINBOT.includes(senderID) && adminBot.adminOnly == true) {
      if (!ADMINBOT.includes(senderID) && adminBot.adminOnly == true) return api.sendMessage('=== 𝐂𝐡𝐞̂́ Đ𝐨̣̂ 𝐁𝐚̉𝐨 𝐕𝐞̣̂ ===\n📌 Hiện tại đang bật chức năng chỉ admin bot được sử dụng bot ❤️', threadID, messageID)
    }
    if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && !NDH.includes(senderID) && ndhBot.ndhOnly == true) {
      if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID)  && !NDH.includes(senderID) && ndhBot.ndhOnly == true) return api.sendMessage('=== 𝐂𝐡𝐞̂́ Đ𝐨̣̂ 𝐁𝐚̉𝐨 𝐕𝐞̣̂ ===\n📌 Hiện tại đang bật chức năng chỉ admin bot và người hỗ trợ được sử dụng bot ❤️', threadID, messageID)
    }
    // const dataibrieng = require('./../../modules/commands/cache/dataibrieng.json');
  if(!global.data.allThreadID.includes(threadID) && !ADMINBOT.includes(senderID) && !SUPERADMIN.includes(event.senderID) && adminbot.ibrieng == true) {  return api.sendMessage(global.getText("handleCommand", "ibrieng"), threadID, messageID) 
        }
const dataAdbox = require('./../../modules/commands/cache/data.json');
    var threadInf = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
    if (dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true) return api.sendMessage('=== 𝐂𝐡𝐞̂́ Đ𝐨̣̂ 𝐁𝐚̉𝐨 𝐕𝐞̣̂ ===\n📌 Hiện tại đang bật chức năng chỉ quản lý nhóm được dùng bot ❤️', event.threadID, event.messageID)


    //đăng kí
//!DANGKY.includes(event.senderID)
 
    //  const dataDangky = require('./../../modules/commands/cache/dangky.json');
    //if (!ADMINBOT.includes(senderID) && !DANGKY.includes(event.senderID) && !NDH.includes(event.senderID) && adminbot.dangky == true ) {
      //if (!DANGKY.includes(event.senderID) || !ADMINBOT.includes(senderID) || !NDH.includes(event.senderID)) {
        //return api.sendMessage(`[⚜️] MIRAI [⚜️] - Bạn chưa đăng ký sử dụng bot\nHãy nhập dangky để sài bot`, threadID, messageID)
      //}
    //}


  //duyệt box
       //if (!ADMINBOT.includes(senderID) && !DUYETBOX.includes(event.threadID) && !NDH.includes(event.senderID) && adminbot.duyetbox == true && `${ress.data.data}` == "false") {
      //if (!DUYETBOX.includes(event.threadID) || !ADMINBOT.includes(senderID) || !NDH.includes(event.senderID)) {
        //return api.sendMessage("[⚜️] MIRAI [⚜️] - Box của bạn chưa được phê duyệt\n[⚜️] Dùng duyetbox để được phê duyệt", threadID, messageID)
      //}
       //}
    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
      if (!ADMINBOT.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(global.getText("handleCommand", "userBanned", reason, dateAdded), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        }
      }
    }
    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands['keys']();
      for (const cmd of commandValues) allCommandName.push(cmd)
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
      else return api.sendMessage(global.getText("handleCommand", "commandNotExist", checker.bestMatch.target), threadID);
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }
    if (command.config.commandCategory.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {

        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
       var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (ADMINBOT.includes(senderID.toString())) permssion = 3;
    else if (NDH.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    var quyenhan = ""
    if (command.config.hasPermssion == 1 ){
      quyenhan = "Quản Trị Viên"
    } else if (command.config.hasPermssion == 2 ) {
      quyenhan = "Người Thuê Bot"
    } else if(command.config.hasPermssion == 3) {
      quyenhan = "Admin Bot"
    }
    if (command.config.hasPermssion > permssion) return api.sendMessage(`📌 Lệnh ${command.config.name}\n📌 Chỉ được sử dụng với quyền hạn: ${quyenhan}`, event.threadID, event.messageID);
       if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
        const timestamps = client.cooldowns.get(command.config.name);;
        const expirationTime = (command.config.cooldowns || 1) * 1000;
        if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) 
      return api.sendMessage(`⏱ Bạn đang trong thời gian chờ!\n Vui lòng thử lại sau ${((timestamps.get(senderID) + expirationTime - dateNow)/1000).toString().slice(0, 5)}s nữa nhé`, threadID, messageID);

    var getText2;
    if (command.languages && typeof command.languages == 'object' && command.languages.hasOwnProperty(global.config.language))
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {};
      Obj.api = api
      Obj.event = event
      Obj.args = args
      Obj.models = models
      Obj.Users = Users
      Obj.Threads = Threads
      Obj.Currencies = Currencies
      Obj.permssion = permssion
      Obj.getText = getText2
      command.run(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow), "DEV MODE");
      return;
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
  };
};