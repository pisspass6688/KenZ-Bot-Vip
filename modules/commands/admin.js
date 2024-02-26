var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
module.exports.config = {
  name: "admin",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "KenZ",
  description: "Admin Config",
  commandCategory: "ADMIN BOT",
  usages: "Admin",
    cooldowns: 2,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": `===「 ADMIN BOT 」===\n━━━━━━━━━━━━━━━\n%1\n\n==「 NGƯỜI THUÊ BOT 」==\n━━━━━━━━━━━━━━━\n%2`,
        "notHavePermssion": '𝗠𝗢𝗗𝗘 - Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '𝗠𝗢𝗗𝗘 - Đã thêm thành công %1 người dùng trở thành Admin Bot\n\n%2',
      "addedNewNDH": '𝗠𝗢𝗗𝗘 - Đã thêm thành công %1 người dùng trở thành Người thuê bot\n\n%2',
        "removedAdmin": '𝗠𝗢𝗗𝗘 - Đã gỡ thành công vai trò Admin %1 người dùng trở lại làm thành viên\n\n%2',
      "removedNDH": '𝗠𝗢𝗗𝗘 - Đã gỡ thành công vai trò Người thuê bot %1 người dùng trở lại làm thành viên\n\n%2'

    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
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
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {  
    const content = args.slice(1, args.length);
    if (args.length == 0) return api.sendMessage({body:`==== [ 𝗔𝗗𝗠𝗜𝗡 𝗦𝗘𝗧𝗧𝗜𝗡𝗚 ] ====\n━━━━━━━━━━━━━━━\n-admin list → Xem danh sách admin\n-admin add → Thêm admin mới\n-admin remove → Gỡ vai trò admin\n-admin addntb → Thêm người thuê bot mới\n-admin removentb → Gỡ vai trò người thuê bot\n-admin boxonly → Bật/Tắt tính năng chỉ qtv box được dùng bot\n-admin ntbonly → Bật/Tắt tính năng chỉ được người thuê dùng bot\n-admin only → Bật/Tắt tính năng chỉ được admin dùng bot\n-admin ibonly → Chỉ được admin mới được ib với bot\n━━━━━━━━━━━━━━━\n𝗛𝗗𝗦𝗗 => ${global.config.PREFIX}𝗮𝗱𝗺𝗶𝗻 𝗹𝗲̣̂𝗻𝗵 𝗰𝗮̂̀𝗻 𝗱𝘂̀𝗻𝗴`}, event.threadID, event.messageID); 
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": { 
          listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`𝗧𝗲̂𝗻: ${name}\n» 𝗟𝗶𝗻𝗸 𝗙𝗕: https://www.facebook.com/${idAdmin} 💌`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`𝗧𝗲̂𝗻: ${name1}\n» 𝗟𝗶𝗻𝗸 𝗙𝗕: https://www.facebook.com/${idNDH} 🤖`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n\n"), msg1.join("\n\n")), threadID, messageID);
        }


        case "add": { 
            if (event.senderID != 100087890537475) return api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 `, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `𝗔𝗱𝗺𝗶𝗻 - ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "addntb": { 
          if (event.senderID != 100087890537475) return api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 `, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "addndh"), threadID, messageID);
          if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];
                for (const id of mention) {
                    NDH.push(id);
                    config.NDH.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewNDH", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                NDH.push(content[0]);
                config.NDH.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewNDH", 1, `𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗵𝗼̂̃ 𝘁𝗿𝗼̛̣ - ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
                  }
                case "remove":
        case "rm":
        case "delete": {
            if (event.senderID != 100087890537475) return api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝙡𝙤𝙯 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 `, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `${content[0]} - ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
            }

        case "removentb":{
          if (event.senderID != 100087890537475) return api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 `, event.threadID, event.messageID)
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "removendh"), threadID, messageID);
                    if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.NDH.findIndex(item => item == id);
                    NDH.splice(index, 1);
                    config.NDH.splice(index, 1);
                    listAdd.push(`${id} -${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedNDH", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.NDH.findIndex(item => item.toString() == content[0]);
                NDH.splice(index, 1);
                config.NDH.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedNDH", 1, `${content[0]} - ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
  }
        case 'boxonly': {
       const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
          if (permssion < 1) return api.sendMessage("𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝙡𝙤𝙯 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 ", threadID, messageID);
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("Đã tắt chế độ chỉ quản lý nhóm được dùng bot ✅", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("Đã bật thành công chế độ chỉ quản lý nhóm dùng được bot ⚠️", threadID, messageID);
    }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
    }
   case 'ntbonly':
        case '-ndh': {
            //---> CODE ADMIN ONLY<---//
   if (permssion < 2) return api.sendMessage("𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 ", threadID, messageID);       
            if (config.ndhOnly == false) {
                config.ndhOnly = true;
                api.sendMessage(`𝗠𝗢𝗗𝗘 » 𝗕𝗮̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗡𝗗𝗛 𝗢𝗻𝗹𝘆, 𝗰𝗵𝗶̉ 𝘀𝘂𝗽𝗽𝗼𝗿𝘁 𝗯𝗼𝘁 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👾`, threadID, messageID);
            } else {
                config.ndhOnly = false;
                api.sendMessage(`𝗠𝗢𝗗𝗘 » 𝗧𝗮̆́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗡𝗗𝗛 𝗢𝗻𝗹𝘆 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👾`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
            }
            case 'ibonly': {
            if (permssion != 3) return api.sendMessage("𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀", threadID, messageID);
                   if (config.adminPaOnly == false) {
                    config.adminPaOnly = true;
                    api.sendMessage("𝗠𝗢𝗗𝗘 » 𝗕𝗮̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗜𝗯 𝗢𝗻𝗹𝘆, 𝗰𝗵𝗶̉ 𝗰𝗼́ 𝗮𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 𝘁𝗿𝗼𝗻𝗴 𝗶𝗻𝗯𝗼𝘅 𝗿𝗶𝗲̂𝗻𝗴 💬", threadID, messageID);
                } else {
                    config.adminPaOnly = false;
                    api.sendMessage("[ 𝐌𝐎𝐃𝐄 ] » 𝗧𝗮̆́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗜𝗯 𝗢𝗻𝗹𝘆 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 𝘁𝗿𝗼𝗻𝗴 𝗶𝗻𝗯𝗼𝘅 𝗿𝗶𝗲̂𝗻𝗴 💬", threadID, messageID);
                }
                    writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
            break;
        }
        case 'only':
        case '-o': {
            //---> CODE ADMIN ONLY<---//
          if (permssion != 3) return api.sendMessage("𝗠𝗢𝗗𝗘 - 𝐐𝐮𝐲𝐞̂̀𝐧 𝐥𝐨̂̀𝐧 𝐛𝐢𝐞̂𝐧 𝐠𝐢𝐨̛́𝐢 🎀 ", threadID, messageID);
            if (config.adminOnly == false) {
                config.adminOnly = true;
                api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝗕𝗮̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗔𝗱𝗺𝗶𝗻 𝗢𝗻𝗹𝘆, 𝗰𝗵𝗶̉ 𝗮𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👑`, threadID, messageID);
            } else {
                config.adminOnly = false;
                api.sendMessage(`𝗠𝗢𝗗𝗘 - 𝗧𝗮̆́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗺𝗼𝗱𝗲 𝗔𝗱𝗺𝗶𝗻 𝗢𝗻𝗹𝘆 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 👑`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
      }