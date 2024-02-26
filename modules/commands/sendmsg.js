let axios = require('axios');
let fs = require('fs-extra');
let cc = require('moment-timezone');
module.exports.config = {
  name: "guinhom",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "Sam",
  description: "Gửi tin nhắn đến nhóm bất kì thông qua uid",
  commandCategory: "Dành cho admin bot",
  usages: "[id] + [text]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": "",
    "moment-timezone": ""
  }
}

module.exports.run = async ({ api, event, Users, args, Threads }) => {
  let { threadID, messageID, senderID, type, messageReply } = event;
  if (args.join().indexOf('https://') !== -1) {
      id = await Users.getUID(args[0])
    }
    else {
      id = args[0]
    }
  let name = await Users.getNameUser(senderID);
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  if (id.indexOf('1000') !== -1) {
    NameText = await Users.getNameUser(id)
  }
  else {
    NameText = await Threads.getName(id)
  }
  let lydo = args.splice(1).join(" ");
  if (type == "message_reply") {
    let data = [];
    let num = 0;
    for (i of messageReply.attachments) {
      if (i.type == "audio") {
        path = __dirname + `/cache/${num+=1}.${"mp3" || "m4a"}`
      }
      if (i.type == "photo") {
        path = __dirname + `/cache/${num+=1}.${"jpg" || "png" || "jpeg"}`
      }
      if (i.type == "video") {
        path = __dirname + `/cache/${num+=1}.mp4`
      }
      if (i.type == "animated_image") {
        path = __dirname + `/cache/${num+=1}.gif`
      }
      let abc = i.url;
      let getdata = (await axios.get(`${abc}`, {
        responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
      data.push(fs.createReadStream(path))
    }
    api.sendMessage({body: ` = [ 𝗧𝗛𝗢̂𝗡𝗚 𝗕𝗔́𝗢 𝗥𝗜𝗘̂𝗡𝗚 ] =\n━━━━━━━━━━━━━━━━━━\n𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻: ${name}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}\n━━━━━━━━━━━━━━━━━━\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n➝ ${lydo}\n━━━━━━━━━━━━━━━━━━\n𝗥𝗲𝗽𝗹𝘆 ( 𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 ) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝗴𝘂̛̉𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘃𝗲̂̀ 𝗔𝗱𝗺𝗶𝗻`, attachment: data}, id, (e, info) => {
      global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
      })
    })
    api.sendMessage(`Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 đ𝗲̂́𝗻 ${NameText}`, threadID)
  } else {
    api.sendMessage(` = [ 𝗧𝗛𝗢̂𝗡𝗚 𝗕𝗔́𝗢 𝗥𝗜𝗘̂𝗡𝗚 ] =\n━━━━━━━━━━━━━━━━━━\n𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻: ${name}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}\n━━━━━━━━━━━━━━━━━━\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n➝ ${lydo}\n━━━━━━━━━━━━━━━━━━\n𝗥𝗲𝗽𝗹𝘆 ( 𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 ) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝗴𝘂̛̉𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘃𝗲̂̀ 𝗔𝗱𝗺𝗶𝗻`, id, (e, info) => {
      global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
      })
    })
    return api.sendMessage(`Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 đ𝗲̂́𝗻 ${NameText}`, threadID)
  }
}

module.exports.handleReply = async ({ api, event, handleReply, Users, Threads }) => {
  let { body, threadID, senderID, messageID } = event;
  let index = body.split(" ")
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  let BotID = await api.getCurrentUserID();
  if (event.isGroup == true) threadName = await Threads.getName(threadID);
  else threadName = await Users.getNameUser(senderID);
  switch(handleReply.type) {
    case "callad": {
      let name = await Users.getNameUser(senderID)
      if (BotID == senderID) return
      else {
        if (event.attachments.length != 0) {
          let data = [];
          let num = 0;
          for (i of event.attachments) {
            if (i.type == "audio") {
              path = __dirname + `/cache/${num+=1}.${"mp3" || "m4a"}`
            }
            if (i.type == "photo") {
              path = __dirname + `/cache/${num+=1}.${"jpg" || "png" || "jpeg"}`
            }
            if (i.type == "video") {
              path = __dirname + `/cache/${num+=1}.mp4`
            }
            if (i.type == "animated_image") {
              path = __dirname + `/cache/${num+=1}.gif`
            }
            let abc = i.url
            let getdata = (await axios.get(`${abc}`, {
              responseType: 'arraybuffer'
            })).data;
            fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
            data.push(fs.createReadStream(path))
          }
          api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n➝ ${index.join(" ")}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`, attachment: data}, handleReply.author, (e, info) => {
      global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
      })
    })
  } else if (index.length != 0) {
        api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n➝ ${index.join(" ")}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
        }, handleReply.ID)
      }
      }
    }
  }
}

module.exports.handleReaction = async ({ api, event, handleReaction, Users, Threads }) => {
  let { threadID, senderID, messageID, reaction, userID } = event;
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  if (event.isGroup == true) threadName = await Threads.getName(threadID);
  else threadName = await Users.getNameUser(senderID);
  switch(handleReaction.type) {
    case "callad": {
      let name = await Users.getNameUser(userID);
      if (typeof reaction != "undefined") {
        api.sendMessage({body: `𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗻𝗵𝗼́𝗺: ${threadName}\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}\n𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴:\n➝ ${reaction}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${gio}`}, handleReaction.author, (e, info) => {
          global.client.handleReply.push({
            type: "callad",
            name: this.config.name,
            author: threadID,
            ID: messageID,
            messageID: info.messageID
          })
          global.client.handleReaction.push({
            type: "callad",
            name: this.config.name,
            author: threadID,
            ID: messageID,
            messageID: info.messageID
          })
        }, handleReaction.ID)
      }
      else {
        return
      }
    }
  }
                             }