const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "đánh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "bảo an",
  description: "đánh người bạn tag",
  commandCategory: "Tình yêu ~ Love",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [    
"https://i.imgur.com/LejpzLA.gif","https://i.imgur.com/SrB5pw4.gif"
   ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
   var callback = () => api.sendMessage({body:`Hư,${tag}` + ` Chừa nha mày 👎`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/honkiss.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/honkiss.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/honkiss.gif")).on("close",() => callback());
   }