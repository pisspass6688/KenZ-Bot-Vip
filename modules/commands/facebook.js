module.exports.config = {
    name: "facebook",
    version: "1.1.12",
    hasPermssion: 0,
    credits: "",
    description: "Dán link fb anya sẽ tự đưa video lên",
    commandCategory: "Dành cho thành viên",
    usages: "/facebook [video,audio] + link",
    cooldowns: 5,
    dependencies: {"axios": ""}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "facebook.jpg")) request("https://imgur.com/AKrWm2g.jpg").pipe(fs.createWriteStream(dirMaterial + "facebook.jpg"));
}
module.exports.run = async function ({ event, api, args, Users }) {
const fs = require("fs");
const t = module.exports.config.name
	const p = global.config.PREFIX
if (!args[0]) return api.sendMessage({body:`== [ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ==\n━━━━━━━━━━━━\n→ 𝗰𝗮́𝗰𝗵 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴\n→ 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝘃𝗶𝗱𝗲𝗼 + 𝗹𝗶𝗻𝗸 𝘃𝗶𝗱𝗲𝗼 𝗰𝗮̂̀𝗻 𝘁𝗮̉𝗶\n→ 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗺𝘂𝘀𝗶𝗰 + 𝗹𝗶𝗻𝗸 
`,attachment: fs.createReadStream(__dirname + `/cache/facebook.jpg`) }, event.threadID,event.messageID);
 switch (args[0].toLowerCase()) {
    case "video":
       const link = args[1];
  try{
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
const res = await require("tools-fb").getVideoUrl(link);
	  //console.log(res)
var url = res.HD;
var time = res.time;

       var callback = () => api.sendMessage({body: `Thời lượng: ${time}`,attachment: fs.createReadStream(__dirname + "/cache/videofb.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/videofb.mp4"),event.messageID);
	 return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/videofb.mp4')).on('close',() => callback());  }
   catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi", event.threadID);
    }  
      break;
     
    case "music":
      try{
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
    const link = args[1];
const res = await require("tools-fb").getVideoUrl(link);
	     // console.log(res)
var url = res.audio;
var time = res.time;
       var callback = () => api.sendMessage({body:`Thờ lượng: ${time}`,attachment: fs.createReadStream(__dirname + "/cache/musicfb.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/musicfb.mp3"),event.messageID);
	 return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/musicfb.mp3')).on('close',() => callback());  }
   catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi", event.threadID);
 }
      break;
  default:
     break;
}
}