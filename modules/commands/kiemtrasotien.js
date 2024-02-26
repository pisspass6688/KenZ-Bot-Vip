module.exports.config = {
	name: "checkmon",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team × mod fix by Namuwu ?",
	description: "Kiểm tra tất cả số tiền trong túi và ngân hàng",
	commandCategory: "Dành cho thành viên",
	usages: "[trống|Tag]",
	cooldowns: 5
};
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    const user = require('./banking/banking.json');
    var uid = event.senderID;
    var ubank = user.find(i => i.senderID == uid);
  switch (type) {
        case "tts": {
          switch (body) {
                case "All": {
           if (!user.find(i => i.senderID == uid)) return api.sendMessage('Bạn chưa có thẻ ngân hàng, dùng /bank -r để đăng kí 🏦', threadID, messageID)
      else {
        const money = (await Currencies.getData(uid)).money;
          let name = await Users.getNameUser(uid)
             return api.sendMessage(`⇒ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ⇐\n\n➢Họ/Tên:\n 『 ${name} 』\n\n➢Tổng tiền mặt:\n 💵 ${money} $ 💵\n\n➢Tổng tiền trong bank:\n 🗄 ${ubank.money} $ 🗄\n\n➢Tổng tài sản:\n 💰 ${ubank.money + money} $ 💰`, threadID, messageID);
      }
        }
      }
    }
  }
}

          
module.exports.run = async function({ api, event, args, Currencies, Users, handleReply }) {
	const { threadID, messageID, senderID, mentions } = event;
  const user = require('./banking/banking.json');
  var uid = event.senderID;
  var ubank = user.find(i => i.senderID == uid);
  const money1 = (await Currencies.getData(uid)).money;
		let name1 = await Users.getNameUser(uid)
	if (!args[0]) {
  	return api.sendMessage(`⇒ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ⇐\n\n➢Bạn hiện có ${money1} $\n\n⇒ reply tn bot + All để xem toàn bộ tài sản ⇐`,threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: uid,
            type: "tts",
        })
    }, messageID);
}
 	else if (Object.keys(event.mentions).length == 1) {
  var mention = Object.keys(mentions)[0];
	var money = (await Currencies.getData(mention)).money;
		         return api.sendMessage({body:`⇒ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ⇐\n\『 ${mentions[mention].replace(/\@/g, "")} 』đang có ${money} $`,
			mentions: [{
			  tag: mentions[mention].replace(/\@/g, ""),
				id: mention
			}]
    }, threadID, messageID);
	}
	else return global.utils.throwError(this.config.name, threadID, messageID);
}