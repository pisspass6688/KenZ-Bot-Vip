 /**
* @author CallmeSun
* @warn Vui lòng không sửa credits cảm ơn !
*/
module.exports.config = {
  name: "mông",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CallmeSun",
  description: "Random Ảnh Mông Gái Cực Bổ Mắt ( Lưu Ý Đây Là Lệnh Ảnh 18+ Cân Nhắc Trước Khi Sử Dụng)",
  commandCategory: "Xem ảnh ~ Picture",
  usages: "mông",
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
"https://i.imgur.com/pKeyu4X.jpg",
"https://i.imgur.com/ZO166Og.jpg",
"https://i.imgur.com/wcLr01s.jpg",
"https://i.imgur.com/woJxed7.jpg",
"https://i.imgur.com/SJc7ZUa.jpg",
"https://i.imgur.com/aAspPIp.jpg",
"https://i.imgur.com/b5rrNWe.jpg",
"https://i.ibb.co/k0JvDjg/mong.jpg",
"https://i.ibb.co/71BFBJx/images.jpg",
"https://i.ibb.co/z6TCn7d/hot-girl-mini-20-1.jpg",
"https://i.ibb.co/jDDP104/images.jpg",
"https://i.ibb.co/gj86HJS/images.jpg",
"https://i.ibb.co/dgh9X7g/images.jpg",
"https://i.imgur.com/nfWKOFk.jpg",
"https://i.ibb.co/kKZCJ5w/images.jpg",
"https://i.imgur.com/SpKu2ga.jpg",
"https://i.ibb.co/3C377k1/images.jpg",
"https://i.ibb.co/tMnp0dG/images.jpg",
"https://i.imgur.com/HZiR0hM.jpg",
"https://i.imgur.com/hzCGqhz.jpg",
"https://i.imgur.com/Mp76CBf.jpg",
"https://i.ibb.co/YPwLV7Y/images.jpg",
"https://i.imgur.com/nvus52I.jpg",
"https://i.ibb.co/LCxJ8Hg/images.jpg",
"https://i.imgur.com/FMxnZjQ.jpg",
"https://i.ibb.co/B3k0kQy/images.jpg",
"https://i.imgur.com/nCl64c2.jpg",
"https://i.imgur.com/G9v53bw.jpg",
"https://i.ibb.co/bJ5P1nG/images.jpg",
"https://i.ibb.co/MDLnt7f/gai-xinh-khoe-mong-3.jpg",
"https://i.imgur.com/uf2HP7B.jpg",
"https://i.imgur.com/Q5jgc1w.jpg",
"https://i.ibb.co/ZB47M5s/gai-xinh-khoe-mong-1.jpg",
"https://i.imgur.com/yzhxm1c.jpg",
"https://i.imgur.com/7QOdWUn.jpg",
"https://i.imgur.com/xkHatPt.jpg",
"https://i.ibb.co/BCRVsLX/gai-xinh-khoe-mong-5.jpg",
"https://i.imgur.com/hfVa6ur.jpg",
"https://i.imgur.com/d1El0ga.jpg",
"https://i.ibb.co/jLNtZSz/gai-xinh-khoe-mong-9.jpg",
"https://i.imgur.com/6o7lkzK.jpg",
"https://i.imgur.com/VHgHKux.jpg",
"https://i.ibb.co/R3VPL2h/gai-xinh-khoe-mong-13.jpg",
"https://i.imgur.com/g8Dx5ro.jpg",
"https://i.imgur.com/dsrWtA4.jpg",
"https://i.imgur.com/FVkLWGP.jpg",
  ];
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  var data = await Currencies.getData(event.senderID);
  var exp =  data.exp;
  var money = data.money
      if(money < 500) api.sendMessage("Bạn cần 500 đô để xem ảnh ?",event.threadID,event.messageID)
          else {
   Currencies.setData(event.senderID, options = {money: money - 500})
   var callback = () => api.sendMessage({body:`Bổ mắt nhé😼\n» Số dư: -500 đô «`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   }
};