const request = require('request');

const fs = global.nodemodule["fs-extra"]

module.exports.config = {

  name: "ad",

  version: "1.0.0",

  hasPermssion: 0,

  credits: "JRT",

  description: "Kiểm tra thông tin adminbot",

  commandCategory: "Tiện ích",

  usages: "Xem thông tin admin bot",

  cooldowns: 0,

  dependencies: {

"request": ""

}

};

 

module.exports.run = async({api,event,args,Users,global,Currencies}) => {

var callback = () => api.sendMessage(

  {body:`[⚜️] 𝑻𝒉𝒐̂𝒏𝒈 𝑻𝒊𝒏 𝑨𝒅𝒎𝒊𝒏 𝑩𝒐𝒕 [⚜️]\n

[👀] 𝗧𝗲̂𝗻: 𝓝𝓰𝓾𝔂ễ𝓷 𝓟𝓱ụ 𝓜ạ𝓷𝓱
[💮] 𝗕𝗶𝗲̣̂𝘁 𝗱𝗮𝗻𝗵: 𝙆𝙚𝙣𝙕
[❎] 𝗡𝗴𝗮̀𝘆 𝘁𝗵𝗮́𝗻𝗴 𝗻𝗮̆𝗺 𝘀𝗶𝗻𝗵: 01/01/200?
[👤] 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: 𝗡𝗮𝗺
[💫] 𝗖𝗵𝗶𝗲̂̀𝘂 𝗰𝗮𝗼 𝗰𝗮̂𝗻 𝗻𝗮̣̆𝗻𝗴: 1m75 x 53 kg
[❤️] 𝗧𝗲̂𝗻 𝗱𝘂𝘆𝗲̂𝗻 𝗽𝗵𝗮̣̂𝗻: Làm Gì Có!
[💥] 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵: 
[💘] 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂: Độ𝖈 𝕿𝖔à𝖓 𝕿𝖍â𝖓 ෴❤️෴
[🌎] 𝗤𝘂𝗲̂ 𝗾𝘂𝗮́𝗻: Thành Phố Hà Nội
[🌸] 𝗧𝗶́𝗻𝗵 𝗰𝗮́𝗰𝗵: Hòa đồng , Vui vẻ , Tốt bụng
[🌀] 𝗦𝗼̛̉ 𝘁𝗵𝗶́𝗰𝗵: Cái gì càng ngầu càng thích

====[☎️] 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 [📱]====

[👉] 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
[☎] 𝗦𝗗𝗧 & 𝗭𝗮𝗹𝗼: 0395904226
[🌐] 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://www.facebook.com/vyvynguyenut

====[🏩] 𝗗𝗢𝗡𝗔𝗧𝗘 [💒]====

[💵] 𝙈𝙤𝙢𝙤ㅤ𝘽𝙖𝙣𝙠: 0395904226
[💵] 𝙑𝙞𝙚𝙩𝙘𝙤𝙢𝙗𝙖𝙣𝙠: 1035717120
[💵] 𝗭𝗮𝗹𝗼𝗣𝗮𝘆: 0395904226

====[📝] 𝗣𝗥𝗢𝗕𝗟𝗘𝗠 [📝]====

[❗] 𝗠𝗼̣𝗶 𝘁𝗵𝗮̆́𝗰 𝗺𝗮̆́𝗰 𝗵𝗮𝘆 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼𝗮̣𝘁 𝗱𝗼̣̂𝗻𝗴 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗵𝗼̉𝗶 𝘁𝗿𝘂̛̣𝗰 𝘁𝗶𝗲̂́𝗽 𝗮𝗱𝗺𝗶𝗻 𝘁𝗵𝗲𝗼 𝗰𝗮́𝗰 𝗹𝗶𝗻𝗸 𝗼̛̉ 𝘁𝗿𝗲̂𝗻 . 𝗡𝗴𝗵𝗶𝗲̂𝗺 𝗰𝗮̂́𝗺 𝗰𝗮́𝗰 𝗵𝗮̀𝗻𝗵 𝘃𝗶 𝗸𝗶𝗰𝗸 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 𝘁𝗿𝘂̛𝗼̛́𝗰 𝗼𝗿 𝗰𝗵𝘂̛̉𝗶 𝗯𝗼𝘁 𝗵𝗮𝘆 𝘅𝘂́𝗰 𝗽𝗵𝗮̣𝗺 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘁 
[📌] 𝗛𝗮̃𝘆 𝗱𝗼̂̀𝗻𝗴 𝗵𝗮̀𝗻𝗵 𝗰𝘂̀𝗻𝗴 𝙆𝙚𝙣𝙕 𝗕𝗢𝗧 𝘃𝗮̀ 𝗺𝗶̀𝗻𝗵 𝗻𝗵𝗲́. 𝗖𝗮̉𝗺 𝗼̛𝗻 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 <𝟯

✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

[📝] 𝗕𝗼𝘁 𝗱𝘂̛𝗼̛̣𝗰 𝗱𝗶𝗲̂̀𝘂 𝗵𝗮̀𝗻𝗵 𝗯𝗼̛̉𝗶 𝙆𝙚𝙣𝙕`,

    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 

    fs.unlinkSync(__dirname + "/cache/1.png"));  

      return request(

        encodeURI(`https://i.ibb.co/CM4j3Cv/qr-VCB.jpg`)).pipe(

fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());

       };