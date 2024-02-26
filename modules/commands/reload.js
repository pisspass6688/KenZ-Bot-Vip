module.exports.config = {
	name: "reload",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Chill with Tea",
	description: "Khởi động lại Bot",
	commandCategory: "Dành cho admin bot",
	usages: "reload + time",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
 //const permission = ["100010557968992","100036576590462"];
             //if (!permission.includes(event.senderID))
             //return api.sendMessage("𝗤𝘂𝘆̀ 𝗫𝘂𝗼̂́𝗻𝗴 𝗕𝘂́ 𝗖𝘂 𝗔𝗻𝗵 𝗥𝗼̂̀𝗶 𝗔𝗻𝗵 𝗖𝗵𝗼 𝗥𝗲𝗹𝗼𝗮𝗱", event.threadID, event.messageID);
	const { threadID, messageID } = event;
	var time = args.join(" ");
	var rstime = "68";
	if (!time) rstime = "69";
	else rstime = time;
	api.sendMessage(`𝐂𝐡𝐮𝐚̂̉𝐧 𝐁𝐢̣ 𝐑𝐞𝐬𝐞𝐭 𝐁𝐨𝐭 𝐒𝐚𝐮 ${rstime} 𝗚𝗶𝗮̂𝘆 𝗡𝘂̛̃𝗮   !\n⏰𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${gio}:${phut}:${giay} `, threadID);
	return setTimeout(() => { api.sendMessage("𝐗𝐢𝐧 𝐡𝐚̃𝐲 𝐜𝐡𝐨̛̀ 𝐛𝐨𝐭 𝐤𝐡𝐨̛̉𝐢 đ𝐨̣̂𝐧𝐠 𝐥𝐚̣𝐢 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐦𝐚̂́𝐭 𝐝𝐞̂́𝐧 𝟓𝐬",event.threadID,() => process.exit(1) )},	rstime * 1000);
               }