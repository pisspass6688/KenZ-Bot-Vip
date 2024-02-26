const axios = require('axios');
const fse = require('fs-extra');
const DownLoad = async (url, file, ext) => {
var array = [];
  for (var i = 0; i < url.length; i++) {
const dest = __dirname + `/cache/${file}_${i}.${ext}`; 
await require('image-downloader').image({ url: url[i], dest }); 
 array.push(fse.createReadStream(dest));
//fse.unlinkSync(dest);
  };
return array;
}

module.exports.config = {
  name: "time",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Suhao",
  description: "Ngày và giờ của các Tp trên thế giới",
  commandCategory: "Tiện ích",
  cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const { threadID: tid, messageID: mid, senderID: sid, type, args, body, isGroup, messageReply: mR, mentions } = event;
const UID = sid
  const images = ['https://i.imgur.com/fzS4RVz.jpg',
'https://i.imgur.com/6clZRG7.jpg',
'https://i.imgur.com/N5ljluz.jpg', 'https://i.imgur.com/Y39FrCh.jpg', 'https://i.imgur.com/TCMO8Ew.jpg', 'https://i.imgur.com/CnPLZ30.jpg', 'https://i.imgur.com/2SWAPLX.jpg', 'https://i.imgur.com/76VKBm1.jpg'];
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var gio2 = moment.tz("Europe/Lodon").format("HH:mm:ss || D/MM/YYYY");
  var gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
  var gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
  var gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
  var gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");var gio1 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");//do tui lười nên ko thêm các nước vô nữa còn nếu các ông muốn thêm thì tùy kk :>>
  api.sendMessage({
  body: `𝐋𝐢̣𝐜𝐡 𝐯𝐚̀ 𝐍𝐠𝐚̀𝐲 𝐠𝐢𝐨̛̀ 𝐜𝐮̉𝐚 𝐜𝐚́𝐜 𝐓𝐩 𝐥𝐨̛́𝐧 𝐭𝐫𝐞̂𝐧 𝐭𝐡𝐞̂́ 𝐠𝐢𝐨̛́𝐢:\n-🇻🇳 Hà Nội: ${gio}\n-🇬🇧 London:${gio2}\n-🇺🇸 New York:${gio5}\n-🇰🇷Seoul :${gio3}\n-🇯🇵Tokyo:${gio4}\n-🇧🇷Brasília:${gio1}\n-🇲🇾Kuala Lumpur:${gio6}\n-🇫🇷 Paris:${gio7}`, attachment: await DownLoad(images, sid, 'png')}, tid, mid);
}

