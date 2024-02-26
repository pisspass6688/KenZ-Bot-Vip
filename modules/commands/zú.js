module.exports.config = {
  name: "zú",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nguyễn Phụ Mạnh",
  description: "Random Ảnh Mông Gái Cực Bổ Mắt ( Lưu Ý Đây Là Lệnh Ảnh 18+ Cân Nhắc Trước Khi Sử Dụng)",
  commandCategory: "Xem ảnh ~ Picture",
  usages: "zú",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.ibb.co/YNtm2PY/download.jpg",
"https://i.ibb.co/yyLKRJ8/images.jpg",
"https://i.ibb.co/y01VKnx/images.jpg",
"https://i.ibb.co/N7Kxp3R/images.jpg",
"https://i.ibb.co/W2D4PLL/images.jpg",
"https://i.ibb.co/dbq84Y1/images.jpg",
"https://i.ibb.co/C5Cxh5g/images.jpg",
"https://i.ibb.co/s6ZcSXS/images.jpg",
"https://i.ibb.co/LCH5BjB/images.jpg",
"https://i.ibb.co/7r39qBq/images.jpg",
"https://i.ibb.co/cyjCmFj/images.jpg",
"https://i.ibb.co/4d9LNV9/4a6d71f81289d0d7899862.jpg",
"https://i.ibb.co/4FVtPTB/1109-jumpsuit-goi-cam-1649738892-0cb929.jpg",
"https://i.ibb.co/7kJcJ8V/download.jpg",
"https://i.ibb.co/jWdhYsm/images.jpg",
"https://i.ibb.co/znbxKmh/images.jpg",
"https://i.ibb.co/vsVSjNT/images.jpg",
"https://i.ibb.co/SRcDMQg/images.jpg",
"https://i.ibb.co/zQxTkqh/images.jpg",
"https://i.ibb.co/g7tjTQW/images.jpg",
"https://i.ibb.co/89NYwVn/images.jpg",
"https://i.ibb.co/XYhvtMx/images.jpg",
"https://i.ibb.co/fn6rfkR/images.jpg",
"https://i.ibb.co/LRmbz5n/images.jpg",
"https://i.ibb.co/fFSBwGJ/download.jpg",
"https://i.ibb.co/0hLp9xm/images.jpg",
"https://i.ibb.co/fr6HNdL/images.jpg",
"https://i.ibb.co/PYbckpg/images.jpg",
"https://i.ibb.co/SVRc2bJ/images.jpg",
"https://i.ibb.co/8YyNBt6/images.jpg",
"https://i.ibb.co/bXWqC3V/images.jpg",
"https://i.ibb.co/pJkSn6p/140737239-202715931576405-5133668748830833586-n.jpg",
  ];
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  var data = await Currencies.getData(event.senderID);
  var exp =  data.exp;
  var money = data.money
      if(money < 500) api.sendMessage("Bạn cần 500 đô để xem ảnh ?",event.threadID,event.messageID)
          else {
   Currencies.setData(event.senderID, options = {money: money - 500})
   var callback = () => api.sendMessage({body:`Sáng mắt chưa nek😼\n» Số dư: -500 đô «`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   }
};