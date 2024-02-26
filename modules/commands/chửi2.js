module.exports.config = {
    name: "chửi",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Bùi Lê Bảo Luân",
    description: "Chửi 1 ai đó thậm tệ :)),Hạn chế dùng vì xúc phạm danh dự người khác",
    commandCategory: "Dành cho qtv box",
    usages: "chửi @mention",
    cooldowns: 300,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn chửi", event.threadID);
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("Con mẹ mày dỏng tai lên mà nghe tao chửi");
setTimeout(() => {a({body: "Con chó " + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "Mày đó con chó" + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "Con mẹ chó tên là " + " " + name, mentions: arraytag})}, 7000);
setTimeout(() => {a({body: "Mày chết chắc rồi " + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "Mày dám dụng đến tao à con chó" + " " + name, mentions: arraytag})}, 12000);
setTimeout(() => {a({body: "Mày biết tao là ai không " + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: "Sủa tiếp di con chó " + " " + name, mentions: arraytag})}, 17000);
setTimeout(() => {a({body: "Con mẹ mày " + " " + name, mentions: arraytag})}, 20000);
setTimeout(() => {a({body: "Ngu thì câm đừng để tao nóng" + " " + name, mentions: arraytag})}, 23000);
setTimeout(() => {a({body: "Bướng tiếp đi" + " " + name, mentions: arraytag})}, 25000);
setTimeout(() => {a({body: "Còn nhiều lắm nhóc con à" + " " + name, mentions: arraytag})}, 28500);
setTimeout(() => {a({body: "Tổ cha tiên sư nhà mày luôn đó" + " " + name, mentions: arraytag})}, 31000);
setTimeout(() => {a({body: "Thích thì nhích với mày luôn này" + " " + name, mentions: arraytag})}, 36000);
setTimeout(() => {a({body: "Cống rãnh đòi sóng xánh với đại dương" + " " + name, mentions: arraytag})}, 39000);
setTimeout(() => {a({body: "Cứt trôi sông còn tưởng cục vàng trên biển cả" + " " + name, mentions: arraytag})}, 40000);
setTimeout(() => {a({body: "Dậy nghe đi con chó à" + " " + name, mentions: arraytag})}, 65000);
setTimeout(() => {a({body: "Mày biết đụng đến tao là mày xác định rồi" + " " + name, mentions: arraytag})}, 70000);
setTimeout(() => {a({body: "Rồi giờ mày thích làm saoo" + " " + name, mentions: arraytag})}, 75000);
setTimeout(() => {a({body: "Thích như nào nói 1 lời" + " " + name, mentions: arraytag})}, 80000);
setTimeout(() => {a({body: "Dậy sủa đi eeeee" + " " + name, mentions: arraytag})}, 85000);
setTimeout(() => {a({body: "Thôi mệt rồi tao tha cho mày đó" + " " + name, mentions: arraytag})}, 95000);
setTimeout(() => {a({body: "Sau đừng có động vào tao oki" + " " + name, mentions: arraytag})}, 100000);
setTimeout(() => {a({body: "Không Thì đừng có trách" + " " + name, mentions: arraytag})}, 105000);
setTimeout(() => {a("Nghe chửi có sướng không !")} , 110000);


  
  }