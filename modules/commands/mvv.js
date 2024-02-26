module.exports.config = {
  name: "mv",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "xem video hiện có trên bot",
  commandCategory: "Xem ảnh ~ Picture",
  usages: "mv",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
}

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies,getText}) => {
   
   const axios = require('axios');
    const request = require('request');
    const fs = require('fs-extra');

     if (args.length == 0) return api.sendMessage({
    body: `[⚜️]=== 『 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐕𝐈𝐃𝐄𝐎 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n𝟏. ${global.config.PREFIX}${this.config.name} gái ❤️\n𝟐. ${global.config.PREFIX}${this.config.name} sex 😘\n𝟑. ${global.config.PREFIX}${this.config.name} anime 💓\n4. ${global.config.PREFIX}${this.config.name} chill 💤\n5. ${global.config.PREFIX}${this.config.name} doraemon 😍\n6. ${global.config.PREFIX}${this.config.name} genshin 🌧️\n7. ${global.config.PREFIX}${this.config.name} goku 🌡️\n8. ${global.config.PREFIX}${this.config.name} nhacmoingay ⚜️\n9. ${global.config.PREFIX}${this.config.name} soundcloud 🌬️\n\n[⚜️]➜ 𝐃𝐮̀𝐧𝐠 ${global.config.PREFIX}${this.config.name}  < 𝐯𝐢𝐝𝐞𝐨 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐱𝐞𝐦 >`, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/girl?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);

     if (args[0] == "gái") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/gaixinh?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐠𝐚́𝐢 𝐱𝐢𝐧𝐡 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
    if (args[0] == "sex") {
     // if (event.senderID != 100033478361032) return api.sendMessage(`[❗] Donate → Mbbank/Momo: 0396049649. JRT xin cám ơn bạn ❤️`, event.threadID, event.messageID)
      var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/sex?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐬𝐞𝐱 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "anime") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/anime?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐚𝐧𝐢𝐦𝐞 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "chill") {
   var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/chill?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐜𝐡𝐢𝐥𝐥 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
  if (args[0] == "doraemon") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/doraemon?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐃𝐨𝐫𝐚𝐞𝐦𝐨𝐧 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
  if (args[0] == "genshin") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/genshin?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐠𝐞𝐧𝐬𝐡𝐢𝐧 𝐧𝐞̀ ❤️\n[⚜️]➜ [⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
  if (args[0] == "goku") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/goku?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐠𝐨𝐤𝐮 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
  if (args[0] == "nhacmoingay") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/nhacmoingay?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐧𝐡𝐚̣𝐜 𝐦𝐨̂̃𝐢 𝐧𝐠𝐚̀𝐲 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
  if (args[0] == "soundcloud") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 500000) {
  axios.get('https://docs-api.catteam123.repl.co/video/soundcl?apikey=JRTvip_2200708248').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `[⚜️]=== 『 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋 』 ===[⚜️]\n━━━━━━━━━━━━━━━━\n\n[⚜️]➜ 𝐕𝐢𝐝𝐞𝐨 𝐧𝐡𝐚̣𝐜 𝐬𝐨𝐮𝐧𝐝𝐜𝐥𝐨𝐮𝐝 𝐧𝐞̀ ❤️\n[⚜️]➜ Đ𝐚̃ 𝐭𝐫𝐮̛̀ 𝟓𝟎𝟎𝟎𝟎𝟎$ 𝐭𝐫𝐨𝐧𝐠 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 500000})
      })
  } else return api.sendMessage("[⚜️]➜ 𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐫𝐚̉ 𝟓𝟎𝟎𝟎𝟎𝟎$",event.threadID,event.messageID);
}
}