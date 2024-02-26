module.exports.config = {
  name: "taixiu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nguyễn Phụ Mạnh",
  description: "taixiu nhiều người có ảnh",
  commandCategory: "Trò chơi ~ Game",
  usages: "[create/leave/start]\n[tài/xỉu]",
  cooldowns: 3
};

const axios = require('axios');

module.exports.languages = {
  "vi": {
    "missingInput": "[⚜️]→ Số Tiền Đặt Cược Không Phải Là Số Âm",
    "wrongInput": "[⚜️]→ Nhập liệu không hợp lệ?",
    "moneyBetNotEnough": "[⚜️]→ Số tiền bạn đặt lớn hơn hoặc bằng số dư của bạn!",
    "limitBet": "[⚜️]→ Số coin đặt không được dưới 50$!",
    "alreadyHave": "[⚜️]→ Đang có 1 ván tài xỉu diễn ra ở nhóm này!",
    "alreadyBet": "[⚜️]→ Bạn đã thay đổi mức cược là %1 đô vào %2.",
    "createSuccess": "===[ TAIXIU ]===\n[⚜️]→ Tạo thành công, dùng:\n[⚜️]→ Để tham gia đặt cược, dùng:\n%1%2 [tài/xỉu] tiền_cược\n[⚜️]→ Có thể đặt nhiều con cùng lúc!!!",
    "noGame": "====[ TAIXIU ]====\n[⚜️]→ Nhóm của bạn không có ván tài xỉu nào đang diễn ra cả!",
    "betSuccess": "[⚜️]→ Đặt thành công %1 đô vào %2",
    "notJoined": "[⚜️]→ Bạn chưa tham gia tài xỉu ở nhóm này!",
    "outSuccess": "[⚜️]→ Đã rời ván tài xỉu thành công, bạn sẽ được hoàn tiền!",
    "shaking": "[⚜️]→ Đang lắc...",
    "final": "====[💎 KẾT QUẢ 💎]====",
    "notAuthor": "[⚜️]→ Bạn khồng phải chủ phòng.",
    "unknown": "[⚜️]→ Câu lệnh không hợp lệ, để xem cách dùng, sử dụng: %1help %2",
    "noPlayer": "[⚜️]→ Hiện không có người đặt cược",
    "info": "-o-TAIXIU-<-----------\n[⚜️]→ Chủ phòng: %1\n-o--------<-----------\n[⚜️]→ Người tham gia: \n%2"
  }
}

const dice_images = [
  "https://i.ibb.co/1JGMF5Q/row-1-column-1.jpg",
  "https://i.ibb.co/tq3nykP/row-1-column-2.jpg",
  "https://i.ibb.co/bP4d8tR/row-2-column-1.jpg",
  "https://i.ibb.co/GdhsNG7/row-2-column-2.jpg",
  "https://i.ibb.co/884GLkx/row-3-column-1.jpg",
  "https://i.ibb.co/2N86jZ1/row-3-column-2.jpg"
];

module.exports.run = async function({ api, event, args, getText, Users, Threads, Currencies }) {
  const request = require('request')
  const fs = require('fs')
  if (!fs.existsSync(__dirname + '/cache/abcde.png')) { request('https://i.imgur.com/iRCMI5V.png').pipe(fs.createWriteStream(__dirname + '/cache/abcde.png'));
  }
  if (!global.client.taixiu_ca) global.client.taixiu_ca = {};


  //DEFINE SOME STUFF HERE..
  const { senderID, messageID, threadID } = event;
  if (args.length == 0) {
    var abcd = {
      body: '==== 🎲 TÀI XỈU 🎲 ====\n[🎲]→ Create: Tạo Bàn Để Chơi Cùng Các Người Chơi Khác\n[🎲]→ Leave: Rời Khỏi Bàn Tài Xỉu\n[⚜️]→ Start: Bắt Đầu Bàn Tài Xỉu\n[🎲]→ End: Kết Thúc Bàn Này.', attachment: [
        fs.createReadStream(__dirname + "/cache/abcde.png")
      ]
    }
    return api.sendMessage(abcd, threadID, messageID)
  }
  const { increaseMoney, decreaseMoney, getData } = Currencies;
  const moneyUser = (await getData(senderID)).money;
  const sendC = (msg, callback) => api.sendMessage(msg, threadID, callback, messageID);
  const sendTC = async (msg, callback) => api.sendMessage(msg, threadID, callback);
  const sendT = (msg) => sendTC(msg, () => { });
  const send = (msg) => sendC(msg, () => { });
  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  //HERE COMES SWITCH CASE...
  switch (args[0]) {
    case "create": {
      if (threadID in global.client.taixiu_ca) send(getText("alreadyHave")); //SMALL CHECK
      else sendTC(getText("createSuccess", prefix, this.config.name), () => {
        global.client.taixiu_ca[threadID] = {
          players: 0,
          data: {},
          status: "pending",
          author: senderID
        };
      });
      return;
    };
    case "leave": {
      //SMALL CHECK...
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (!global.client.taixiu_ca[threadID].data[senderID]) return send(getText("notJoined"));
      else {
        //REMOVING PLAYER
        global.client.taixiu_ca[threadID].players--;
        global.client.taixiu_ca[threadID].data[senderID].forEach(async (e) => {
          await increaseMoney(senderID, e.bet);
        })
        delete global.client.taixiu_ca[threadID].data[senderID];
        send(getText("outSuccess"));
      }
      return;
    };
    case "start": {
      //SMALL CHECK...
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (global.client.taixiu_ca[threadID].author != senderID) return send(getText("notAuthor"));
      if (global.client.taixiu_ca[threadID].players == 0) return send(getText("noPlayer"));

      //GET SHAKING DICES GIF AND SEND
      let shakingGif = (await axios.get('https://i.ibb.co/hMPgMT7/shaking.gif', { responseType: "stream" }).catch(e => console.log(e))).data;
      await api.sendMessage({
        body: getText("shaking"),
        attachment: shakingGif
      }, threadID, (err, info) => setTimeout(async () => await api.unsendMessage(info.messageID).then(async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); //A LITTLE DELAY...

        //GET DICES
        let _1st = Math.ceil(Math.random() * 6);
        let _2nd = Math.ceil(Math.random() * 6);
        let _3rd = Math.ceil(Math.random() * 6);


        //MAKING MSG...
        let name = "";
        let msg = getText("final");

        //GET IMAGES
        let dice_one_img = (await axios.get(dice_images[_1st - 1], { responseType: "stream" }).catch(e => console.log(e))).data;
        let dice_two_img = (await axios.get(dice_images[_2nd - 1], { responseType: "stream" }).catch(e => console.log(e))).data;
        let dice_three_img = (await axios.get(dice_images[_3rd - 1], { responseType: "stream" }).catch(e => console.log(e))).data;
        let atms = [dice_one_img, dice_two_img, dice_three_img]; //ADD TO ARRAY

        //SPLIT 2 TYPE OF PLAYERS
        let tai = [], xiu = [], result;
        for (i in global.client.taixiu_ca[threadID].data) {
          name = await Users.getNameUser(i) || "Player"; //GET NAME
          results = (_1st == _2nd == _3rd) ? "Lose" : (_1st + _2nd + _3rd <= 10) ? (["xỉu", "xiu"].includes(global.client.taixiu_ca[threadID].data[i].name)) ? "Win" : "Lose" : (["tài", "tai"].includes(global.client.taixiu_ca[threadID].data[i].name)) ? "Win" : "Lose";
          if (results == "Win") {
            if (["xỉu", "xiu"].includes(global.client.taixiu_ca[threadID].data[i].name)) {
              xiu.push(`${name}: +${global.client.taixiu_ca[threadID].data[i].bet}$`);
            } else tai.push(`${name}: +${global.client.taixiu_ca[threadID].data[i].bet}$`);
            await increaseMoney(i, global.client.taixiu_ca[threadID].data[i].bet * 2);
          } else if (["xỉu", "xiu"].includes(global.client.taixiu_ca[threadID].data[i].name)) {
            xiu.push(`${name}: -${global.client.taixiu_ca[threadID].data[i].bet}$`);
          } else tai.push(`${name}: -${global.client.taixiu_ca[threadID].data[i].bet}$`);
        }
        msg += `\n\n---[ TÀI ]---\n${tai.join("\n")}\n\n---[ XỈU ]---\n${xiu.join("\n")}\n`;

        //FINAL SEND
        sendC({
          body: msg,
          attachment: atms
        }, () => delete global.client.taixiu_ca[threadID]);
        return;
      }), 2400));
    };
    case "info": {
      //SMALL CHECK
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (global.client.taixiu_ca[threadID].players == 0) return send(getText("noPlayer"));

      let name = "";
      let tempL = [];
      let nameAuthor = await Users.getNameUser(global.client.taixiu_ca[threadID].author) || "Player"; //GET NAME AUTHOR
      for (e in global.client.taixiu_ca[threadID].data) {
        name = await Users.getNameUser(e) || "Player"; //GET NAME PLAYER
        tempL.push(`${name}: ${global.client.taixiu_ca[threadID].data[e].name} - ${global.client.taixiu_ca[threadID].data[e].bet}$`);
      }
      send(getText("info", nameAuthor, tempL.join("\n")));
      return;
    }
    default: {
      //IF IF IF AND IF

      //LITTLE CHECK...
      if (!["tai", "tài", "xỉu", "xiu"].includes(args[0])) return send(getText("unknown", prefix, this.config.name));
      if (!global.client.taixiu_ca[threadID]) return send(getText("noGame"));
      if (args.length < 2) return send(getText("wrongInput"));
      moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 0) return send(getText("missingInput"));
      if (moneyBet > moneyUser) return send(getText("moneyBetNotEnough"));
      if (moneyBet < 50) return send(getText("limitBet"));

      if (threadID in global.client.taixiu_ca) {
        if (global.client.taixiu_ca[threadID].status == "pending") {
          let luachon = args[0];
          //CHECK INPUT
          if (["xiu", "xỉu"].includes(luachon)) luachon = "xỉu";
          if (["tài", "tai"].includes(luachon)) luachon = "tài";

          if (!global.client.taixiu_ca[threadID].data[senderID]) global.client.taixiu_ca[threadID].players++;
          if (global.client.taixiu_ca[threadID].data[senderID]) return sendC(getText("alreadyBet", moneyBet, luachon), async () => {
            await increaseMoney(senderID, global.client.taixiu_ca[threadID].data[senderID].bet);
            await decreaseMoney(senderID, moneyBet)
            global.client.taixiu_ca[threadID].data[senderID] = {
              name: luachon,
              bet: moneyBet
            }
          });
          sendC(getText("betSuccess", moneyBet, luachon), async () => {
            await decreaseMoney(senderID, moneyBet);
            global.client.taixiu_ca[threadID].data[senderID] = {
              name: luachon,
              bet: moneyBet
            }
          });
        }
      }
      return;
    }
  }
}
