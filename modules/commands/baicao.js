module.exports.config = {
	name: "baicao",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Nguyễn Phụ Mạnh",
	description: "Game bài cào dành cho nhóm có đặt cược (có ảnh lá bài)",
	commandCategory: "Trò chơi ~ Game",
	usages: "[create/start/join/info/leave],dùng lệnh /baicao để xem rõ hơn",
	cooldowns: 1
};


const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "diamonds", "clubs"];
const deck = [];

for (let i = 0 ; i < values.length; i++) {
  for (let x = 0; x < suits.length; x++) {
    let weight = parseInt(values[i]);
    if (["J", "Q", "K"].includes(values[i])) weight = 10;
    else if (values[i] == "A") weight = 11;
    const card = {
      Value: values[i],
      Suit: suits[x],
      Weight: weight,
      Icon: suits[x] == "spades" ? "♠️" : suits[x] == "hearts" ? "♥️" : suits[x] == "diamonds" ? "♦️" : "♣️"
		};
    deck.push(card);
  }
}

function createDeck() {
  // for 1000 turns
  // switch the values of two random cards
  const deckShuffel = [...deck];
  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor((Math.random() * deckShuffel.length));
    const location2 = Math.floor((Math.random() * deckShuffel.length));
    const tmp = deckShuffel[location1];
    deckShuffel[location1] = deckShuffel[location2];
    deckShuffel[location2] = tmp;
  }
  return deckShuffel;
}

function getLinkCard(Value, Suit) {
  return `https://raw.githubusercontent.com/ntkhang03/poker-cards/main/cards/${Value == "J" ? "jack" : Value == "Q" ? "queen" : Value == "K" ? "king" : Value == "A" ? "ace" : Value}_of_${Suit}.png`;
}

async function drawCard(cards) {
  // 500 x 726
  const Canvas = require("canvas");
	const canvas = Canvas.createCanvas(500*cards.length, 726);
  const ctx = canvas.getContext("2d");
  let x = 0;
  for (const card of cards) {
    const loadImgCard = await Canvas.loadImage(card);
    ctx.drawImage(loadImgCard, x, 0);
    x += 500;
  }
  return canvas.toBuffer();
}

module.exports.handleEvent = async ({ Currencies, event, api, Users }) => {
  const Canvas = require("canvas");
  const fs = require ("fs-extra");
  
	const { senderID, threadID, body, messageID } = event;
  
	if (typeof body == "undefined") return;
	if (!global.moduleData.baicao) global.moduleData.baicao = new Map();
	if (!global.moduleData.baicao.has(threadID)) return;
	var values = global.moduleData.baicao.get(threadID);
	if (values.start != 1) return;
  
	const deckShuffel = values.deckShuffel; // Bộ bài

	if (body.indexOf("Chia bài") == 0) {
		if (values.chiabai == 1) return;
		for (const key in values.player) {
			const card1 = deckShuffel.shift();
			const card2 = deckShuffel.shift();
			const card3 = deckShuffel.shift();
			var tong = (card1.Weight + card2.Weight + card3.Weight);
			if (tong >= 20) tong -= 20;
			if (tong >= 10) tong -= 10;
			values.player[key].card1 = card1;
			values.player[key].card2 = card2;
			values.player[key].card3 = card3;
			values.player[key].tong = tong;
			
			const linkCards = [];
			
			for (let i = 1; i < 4; i++) {
			  const Card = values.player[key]["card" + i];
			  linkCards.push(getLinkCard(Card.Value, Card.Suit));
			}
			
			const pathSave = __dirname + `/cache/card${values.player[key].id}.png`;
			fs.writeFileSync(pathSave, await drawCard(linkCards));
			
			api.sendMessage({
			  body: `𝐁𝐚̀𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 🎲: ${card1.Value}${card1.Icon} | ${card2.Value}${card2.Icon} | ${card3.Value}${card3.Icon} \n\n𝐓𝐨̂̉𝐧𝐠 𝐛𝐚̀𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧: ${tong}`,
			  attachment: fs.createReadStream(pathSave)
			}, values.player[key].id, (error, info) => {
				if (error) return api.sendMessage(`𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐜𝐡𝐢𝐚 𝐛𝐚̀𝐢 𝐜𝐡𝐨 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${values.player[key].id}`, threadID);
				fs.unlinkSync(pathSave);
			});
				
		}
		values.chiabai = 1;
		global.moduleData.baicao.set(threadID, values);
		return api.sendMessage("💦 𝐂𝐡𝐢𝐚 𝐛𝐚̀𝐢 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ! 𝐓𝐚̂́𝐭 𝐜𝐚̉ 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐨́ 𝟐 𝐥𝐮̛𝐨̛̣𝐭 𝐭𝐡𝐚𝐲 𝐛𝐚̀𝐢 𝐧𝐞̂𝐮́ 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐚̂𝐲́ 𝐛𝐚̀𝐢 𝐡𝐚̃𝐲 𝐤𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 𝐥𝐚̣𝐢 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐜𝐡𝐨̛̀ 💌", threadID);
	}

	if (body.indexOf("Đổi bài") == 0) {
		if (values.chiabai != 1) return;
		var player = values.player.find(item => item.id == senderID);
		if (player.doibai == 0) return api.sendMessage("𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐭𝐨𝐚̀𝐧 𝐛𝐨̣̂ 𝐥𝐮̛𝐨̛̣𝐭 𝐭𝐡𝐚𝐲 𝐛𝐚̀𝐢", threadID, messageID);
		if (player.ready == true) return api.sendMessage("𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐫𝐞𝐚𝐝𝐲, 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐚𝐲 𝐛𝐚̀𝐢 !", threadID, messageID);
		const card = ["card1","card2","card3"];
		player[card[(Math.floor(Math.random() * card.length))]] = deckShuffel.shift();
		player.tong = (player.card1.Weight + player.card2.Weight + player.card3.Weight);
		if (player.tong >= 20) player.tong -= 20;
		if (player.tong >= 10) player.tong -= 10;
		player.doibai -= 1;
		global.moduleData.baicao.set(values);
		
		const linkCards = [];
			
		for (let i = 1; i < 4; i++) {
		  const Card = player["card" + i];
		  linkCards.push(getLinkCard(Card.Value, Card.Suit));
		}
		
	  const pathSave = __dirname + `/cache/card${player.id}.png`;
		fs.writeFileSync(pathSave, await drawCard(linkCards));
	  
		return api.sendMessage({
		  body: `⚡️𝐁𝐚̀𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐬𝐚𝐮 𝐤𝐡𝐢 𝐛𝐨𝐭 𝐭𝐡𝐚𝐲: ${player.card1.Value}${player.card1.Icon} | ${player.card2.Value}${player.card2.Icon} | ${player.card3.Value}${player.card3.Icon}\n\n⚡️𝐓𝐨̂̉𝐧𝐠 𝐛𝐚̀𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧: ${player.tong}`,
		  attachment: fs.createReadStream(pathSave)
    }, player.id, (error, info) => {
			if (error) return api.sendMessage(`𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐚𝐲 𝐛𝐚̀𝐢 𝐜𝐡𝐨 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${player.id}`, threadID);
			fs.unlinkSync(pathSave);
		});
	}

	if (body.indexOf("Ready") == 0) {
		if (values.chiabai != 1) return;
		var player = values.player.find(item => item.id == senderID);
		if (player.ready == true) return;
		const name = await Users.getNameUser(player.id);
		values.ready += 1;
		player.ready = true;
		if (values.player.length == values.ready) {
			const player = values.player;
			player.sort(function (a, b) { return b.tong - a.tong });

			var ranking = [], num = 1;

			for (const info of player) {
				const name = await Users.getNameUser(info.id);
				ranking.push(`${num++} • ${name} 𝐯𝐨̛́𝐢 ${info.card1.Value}${info.card1.Icon} | ${info.card2.Value}${info.card2.Icon} | ${info.card3.Value}${info.card3.Icon} => ${info.tong} 𝐧𝐮́𝐭 💸\n`);
			}
			
			try {
				await Currencies.increaseMoney(player[0].id, values.rateBet * player.length);
			} catch (e) {};
			global.moduleData.baicao.delete(threadID);
			
			return api.sendMessage(`⚡️𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉:\n\n ${ranking.join("\n")}\n\n𝐑𝐢𝐞̂𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐭𝐨𝐩 𝟏 𝐠𝐨𝐦 𝐯𝐞̂̀ ${values.rateBet * player.length} 𝐕𝐍𝐃 💵`, threadID);
		}
		else return api.sendMessage(`😻 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢: ${name} 𝐕𝐮̛̀𝐚 𝐬𝐚̆̃𝐧 𝐬𝐚̀𝐧𝐠 𝐥𝐚̣̂𝐭 𝐛𝐚̀𝐢, 𝐜𝐨̀𝐧 𝐥𝐚̣𝐢: ${values.player.length - values.ready} 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐜𝐡𝐮̛𝐚 𝐥𝐚̣̂𝐭 𝐛𝐚̀𝐢`, event.threadID);
	}
	
	if (body.indexOf("nonready") == 0) {
		const data = values.player.filter(item => item.ready == false);
		var msg = [];

		for (const info of data) {
			const name = global.data.userName.get(info.id) || await Users.getNameUser(info.id);
			msg.push(name);
		}
		if (msg.length != 0) return api.sendMessage("😿 𝐍𝐡𝐮̛̃𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐜𝐡𝐮̛𝐚 𝐬𝐚̆̃𝐧 𝐬𝐚̀𝐧𝐠 𝐛𝐚𝐨 𝐠𝐨̂̀𝐦: " + msg.join(", "), threadID);
		else return;
	}
}

module.exports.run = async ({ api, event, args, Currencies }) => {
	var { senderID, threadID, messageID } = event;
 if (args.length == 0) return api.sendMessage(`👻───• 𝐇𝐃𝐒𝐃 •───👻\n\n❯ 𝗖𝗿𝗲𝗮𝘁𝗲/𝗻𝗲𝘄/-𝗰: 𝗧𝗮̣𝗼 𝗯𝗮̀𝗻 𝗰𝗵𝗼̛𝗶 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n❯ 𝗝𝗼𝗶𝗻/-𝗷: 𝗧𝗵𝗮𝗺 𝗴𝗶𝗮 𝘃𝗮̀𝗼 𝗯𝗮̀𝗻 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n❯ 𝐋𝐞𝐚𝐯𝐞/-𝐥: 𝐑𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 𝐛𝐚̀𝐧 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n❯ 𝗦𝘁𝗮𝗿𝘁/-𝘀: 𝗕𝗮̆́𝘁 đ𝗮̂̀𝘂 𝗯𝗮̀𝗻 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n❯ 𝗘𝗻𝗱/-𝗲: 𝗞𝗲̂́𝘁 𝘁𝗵𝘂́𝗰 𝗯𝗮̀𝗻 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n❯ 𝗜𝗻𝗳𝗼/-𝗶: 𝗫𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗯𝗮̀𝗻 𝗯𝗮̀𝗶 𝗰𝗮̀𝗼\n\n👻───• 𝐇𝐃𝐒𝐃 •───👻`, event.threadID, event.messageID);
	threadID = String(threadID);
	senderID = String(senderID);
	
	if (!global.moduleData.baicao) global.moduleData.baicao = new Map();
	var values = global.moduleData.baicao.get(threadID) || {};
  var data = await Currencies.getData(event.senderID);
  var money = data.money     
    
	switch (args[0]) {
		case "create":
		case "-c": {
			if (global.moduleData.baicao.has(threadID)) return api.sendMessage("⚡️ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐧𝐡𝐨́𝐦 𝐧𝐚̀𝐲 𝐜𝐨́ 𝐬𝐨̀𝐧𝐠 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐯𝐚̂̃𝐧 𝐦𝐨̛̉ ", threadID, messageID);
			if (!args[1] || isNaN(args[1]) || parseInt(args[1]) <= 1) return api.sendMessage("⚡️ 𝐌𝐮̛́𝐜 𝐜𝐮̛𝐨̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐦𝐨̣̂𝐭 𝐜𝐨𝐧 𝐬𝐨̂́ 𝐡𝐨𝐚̣̆𝐜 𝐦𝐮̛́𝐜 𝐜𝐮̛𝐨̛̣𝐜 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐛𝐞́ 𝐡𝐨̛𝐧 𝟏$", threadID, messageID);
      if (money < args[1]) return api.sendMessage(`⚡️𝐁𝐚̣𝐧 𝐭𝐡𝐢𝐞̂́𝐮 𝐭𝐢𝐞̂̀𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐤𝐡𝐨̛̉𝐢 𝐭𝐚̣𝐨 𝐛𝐚̀𝐧 𝐯𝐨̛́𝐢 𝐠𝐢𝐚́: ${args[1]}$`,event.threadID,event.messageID);
      await Currencies.decreaseMoney(event.senderID, Number(args[1]));
			global.moduleData.baicao.set(event.threadID, { "author": senderID, "start": 0, "chiabai": 0, "ready": 0, player: [ { "id": senderID, "card1": 0, "card2": 0, "card3": 0, "doibai": 2, "ready": false } ], rateBet: Number(args[1])});
			return api.sendMessage(`🎲 𝐁𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐯𝐨̛́𝐢 𝐠𝐢𝐚́ ${args[1]} 𝐕𝐍𝐃 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐭𝐚̣𝐨 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 !, 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐛𝐚̣𝐧 𝐡𝐚̃𝐲 𝐧𝐡𝐚̣̂𝐩 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐣𝐨𝐢𝐧\n⚡️ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐭𝐚̣𝐨 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐚̂̀𝐧 𝐣𝐨𝐢𝐧`, event.threadID, event.messageID);
		}
		
		case "join":
		case "-j": {
			if (!values) return api.sendMessage("⚡️ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐧𝐚̀𝐨, 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐜𝐫𝐞𝐚𝐭𝐞", threadID, messageID);
			if (values.start == 1) return api.sendMessage("𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐯𝐮̛̀𝐚 𝐯𝐚̀𝐨 𝐜𝐡𝐨̛𝐢 𝐫𝐨̂̀𝐢 🙈", threadID, messageID);
			if (money < values.rateBet) return api.sendMessage(`𝐁𝐚̣𝐧 𝐯𝐚̂̃𝐧 𝐜𝐨̀𝐧 𝐭𝐡𝐢𝐞̂́𝐮 𝐭𝐢𝐞̂̀𝐧 𝐤𝐡𝐢 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐯𝐨̛́𝐢 𝐠𝐢𝐚́ 💵: ${values.rateBet}$`,event.threadID,event.messageID)
			if (values.player.find(item => item.id == senderID)) return api.sendMessage("⚡️ 𝐁𝐚̣𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐭𝐮̛̀ 𝐭𝐫𝐮̛𝐨̛́𝐜 𝐫𝐨̂̀𝐢 !", threadID, messageID);
			values.player.push({ "id": senderID, "card1": 0, "card2": 0, "card3": 0, "tong": 0, "doibai": 2, "ready": false });
			await Currencies.decreaseMoney(event.senderID, values.rateBet);
			global.moduleData.baicao.set(threadID, values);
			return api.sendMessage("⚡️ 𝐁𝐚̣𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐛𝐚̀𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 😽", threadID, messageID);
		}

		case "leave":
		case "-l": {
			if (typeof values.player == "undefined") return api.sendMessage("⚡️𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐧𝐚̀𝐨, 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐜𝐫𝐞𝐚𝐭𝐞", threadID, messageID);
			if (!values.player.some(item => item.id == senderID)) return api.sendMessage("⚡️ 𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐯𝐚̀𝐨 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐨́𝐦 𝐧𝐚̀𝐲 !", threadID, messageID);
			if (values.start == 1) return api.sendMessage("⚡️ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐜𝐡𝐢𝐚 𝐛𝐚̀𝐢 𝐦𝐚̂́𝐭 𝐫𝐨̂̀𝐢 😿", threadID, messageID);
			if (values.author == senderID) {
				global.moduleData.baicao.delete(threadID);
				api.sendMessage("𝐍𝐡𝐚̀ 𝐜𝐚́𝐢 𝐯𝐮̛̀𝐚 𝐫𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 𝐛𝐚̀𝐧, 𝐜𝐮̀𝐧𝐠 𝐧𝐠𝐡𝐢̃𝐚 𝐯𝐨̛́𝐢 𝐯𝐢𝐞̣̂𝐜 𝐛𝐚̀𝐧 𝐬𝐞̃ 𝐛𝐢̣ 𝐠𝐢𝐚̉𝐢 𝐭𝐚́𝐧 🃏", threadID, messageID);
			}
			else {
				values.player.splice(values.player.findIndex(item => item.id === senderID), 1);
				api.sendMessage("𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐫𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐧𝐚̀𝐲 !", threadID, messageID);
				global.moduleData.baicao.set(threadID, values);
			}
			return;
		}

		case "start":
		case "-s": {
			if (!values) return api.sendMessage("⚡️𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐧𝐚̀𝐨, 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐜𝐫𝐞𝐚𝐭𝐞", threadID, messageID);
			if (values.author !== senderID) return api.sendMessage("𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐧𝐡𝐚̀ 𝐜𝐚́𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐛𝐚̆́𝐭 𝐬𝐭𝐚𝐫𝐭", threadID, messageID);
			if (values.player.length <= 1) return api.sendMessage("⚡️𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐛𝐚̀𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐧𝐚̀𝐨 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚, 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐦𝐨̛̀𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐚̂́𝐲 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 𝐤𝐡𝐚́𝐜 𝐧𝐡𝐚̣̂𝐩 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐣𝐨𝐢𝐧", threadID, messageID);
			if (values.start == 1) return api.sendMessage("⚡️ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐛𝐚̀𝐧 𝐭𝐫𝐨𝐧𝐠 𝐭𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐜𝐡𝐢𝐚 𝐛𝐚̀𝐢 𝐛𝐨̛̉𝐢 𝐧𝐡𝐚̀ 𝐜𝐚́𝐢", threadID, messageID);
			values.deckShuffel = createDeck(); // Bộ bài
			values.start = 1;
			return api.sendMessage("⚡️ 𝐁𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐯𝐚̀𝐨 𝐬𝐨̀𝐧𝐠", threadID, messageID);
		}

		case "info":
		case "-i": {
			if (typeof values.player == "undefined") return api.sendMessage("⚡️ 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐛𝐚̀𝐧 𝐛𝐚̀𝐢 𝐜𝐚̀𝐨 𝐧𝐚̀𝐨, 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 /𝐛𝐚𝐢𝐜𝐚𝐨 𝐜𝐫𝐞𝐚𝐭𝐞", threadID, messageID);
			return api.sendMessage(
				"🎰== 𝐁𝐚̀𝐧 𝐁𝐚̀𝐢 𝐂𝐚̀𝐨 ==🎰" +
				"\n- 𝐍𝐡𝐚̀ 𝐂𝐚́𝐢: " + values.author +
				"\n- 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢:: " + values.player.length + " 𝐧𝐠𝐮̛𝐨̛̀𝐢" +
        "\n- 𝐌𝐮̛́𝐜 𝐜𝐮̛𝐨̛̣𝐜: " + values.rateBet + " 𝐕𝐍𝐃"
			, threadID, messageID);
		}

		default: {
			return global.utils.throwError(this.config.name, threadID, messageID);
		}
	}
}