module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events",
  dependencies: {
		"fs-extra": "",
		"path": ""
}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/antiout/randomgif/`;
    if (!fs.existsSync(dirMaterial + "cache", "antiout" , "randomgif")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "tb.mp3")) request("https://API-TPK2.Last-namename.repl.co/upload/nk48o9aop9k.mp3 ").pipe(fs.createWriteStream(dirMaterial + "tb.mp3"));
if (!fs.existsSync(dirMaterial + "tc.mp3")) request("https://API-TPK2.Last-namename.repl.co/upload/yzop0lqwk8.mp3 ").pipe(fs.createWriteStream(dirMaterial + "tc.mp3"));
}
module.exports.run = async({ event, api, Threads, Users }) => {
  const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
  const { join } =  global.nodemodule["path"];
   const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
     if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
const path = join(__dirname, "cache", "antiout","randomgif");
	const gifPath = join(path, `tb.mp3`);
  const hhh = join(__dirname, "cache", "antiout","randomgif");
	const gifhh = join(hhh, `tc.mp3`);
	const randomPath = readdirSync(join(__dirname, "cache", "antiout", "randomgif"));
	 if (randomPath.lenth != 0) {
		const pathRandom = join(__dirname, "cache", "antiout", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
}
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage({body: `[ 𝐂𝐇𝐔̛́𝐂 𝐍𝐀̆𝐍𝐆 𝐀𝐍𝐓𝐈𝐎𝐔𝐓 ]\n───────────────────────\n📌 Không thể thêm lại thành viên rời nhóm\n👤 Tên: ${name}\n⏰ Thời gian:   ➣  ${timeNow}\n📆 Hôm ${thu}`, attachment: createReadStream(gifPath) },event.threadID)
   } else api.sendMessage({body:`[ 𝐂𝐇𝐔̛́𝐂 𝐍𝐀̆𝐍𝐆 𝐀𝐍𝐓𝐈𝐎𝐔𝐓 ]\n───────────────────────\n📌 Đã thêm lại thành viên rời nhóm\n👤 Tên: ${name}\n⏰ Thời gian: ${timeNow}\n📆 Hôm ${thu}`,attachment: createReadStream(gifhh) }, event.threadID);
  })
 }
}