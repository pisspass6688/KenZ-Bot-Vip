module.exports.config = {
	name: "money",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Kiểm tra số tiền của bản thân hoặc người được tag",
	commandCategory: "Tiện ích",
	usages: "[trống|Tag]",
	cooldowns: 5
};
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    const user = require('./noprefix/bank.json');
    var uid = event.senderID;
    var ubank = user.find(i => i.senderID == uid);
  switch (type) {
        case "tts": {
          switch (body) {
                case "All": {
           if (!user.find(i => i.senderID == uid)) return api.sendMessage('𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗰𝗼́ 𝘁𝗵𝗲̉ 𝗻𝗴𝗮̂𝗻 𝗵𝗮̀𝗻𝗴, 𝗱𝘂̀𝗻𝗴 /𝗯𝗮𝗻𝗸 -𝗿 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘁𝗮̣𝗼 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 🏦', threadID, messageID)
      else {
        const money = (await Currencies.getData(uid)).money;
          let name = await Users.getNameUser(uid)
             return api.sendMessage(`💸⇒ [ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ] ⇐💸\n\n➢ 𝗧𝗲̂𝗻: 『 ${name} 』\n\n➢ 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗲̂̀𝗻 𝗺𝗮̣̆𝘁:\n${money} VND\n\n➢ 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗲̂̀𝗻 𝗼̛̉ 𝗻𝗴𝗮̂𝗻 𝗵𝗮̀𝗻𝗴:\n${ubank.money} VND 💳\n\n➢ 𝗧𝗼̂̉𝗻𝗴 𝘁𝗮̀𝗶 𝘀𝗮̉𝗻:\n${ubank.money + money} VND 💰`, threadID, messageID);
      }
        }
      }
    }
  }
}

          
module.exports.run = async function({ api, event, args, Currencies, Users, handleReply }) {
	const { threadID, messageID, senderID, mentions } = event;
  const user = require('./noprefix/bank.json');
  var uid = event.senderID;
  var ubank = user.find(i => i.senderID == uid);
  const money1 = (await Currencies.getData(uid)).money;
		let name1 = await Users.getNameUser(uid)
	if (!args[0]) {
  	return api.sendMessage(`💸⇒ [ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ] ⇐💸\n━━━━━━━━━━━━━━\n➢ 𝗧𝗲̂𝗻: 『 ${name1} \n➢ 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́ ${money1} VND 💵\n━━━━━━━━━━━━━━\n👉 Reply tin nhắn bot + All để xem tổng số tiền hiện có của mình 💰`,threadID, (error, info) => {
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
		         return api.sendMessage({body:`💸⇒ [ 𝗠𝗢𝗡𝗘𝗬 𝗕𝗔𝗡𝗞𝗜𝗡𝗚 ] ⇐💸\n\n➢ 𝗧𝗲̂𝗻:『 ${mentions[mention].replace(/\@/g, "")} 』\n\n➢ 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗲̂̀𝗻 𝗺𝗮̣̆𝘁:\n${money} VND\n━━━━━━━━━━━━━━\n➢Tính năng bảo mật không cho xem all`,
			mentions: [{
			  tag: mentions[mention].replace(/\@/g, ""),
				id: mention
			}]
    }, threadID, messageID);
	}
	else return global.utils.throwError(this.config.name, threadID, messageID);
}