/*
@credit ⚡️D-Jukie
@vui lòng không chỉnh sửa credit
*/
const fs = require("fs");
module.exports.config = {
    name: "work",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "⚡Pmạnh", // Code working của diện,trun and Sang mod
    description: "Là Working nhưng nhiều công việc hơn",
    commandCategory: "Dành cho thành viên",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 0 
    },
    denpendencies: {
        "fs": "",
        "request": ""
}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "work.png")) request("https://imgur.com/sDpXuX2.jpg").pipe(fs.createWriteStream(dirMaterial + "work.png"));
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
var coinscn = Math.floor(Math.random() * 60000) + 100; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 60000) + 100; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 60000) + 100; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 60000) + 100; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 60000) + 100; //random coins khi đào đá
var tdh = Math.floor(Math.random() * 60000) + 100; //random coins khi làm cave ở Trần Duy Hưng
var pnl = Math.floor(Math.random() * 60000) + 100; //random coins khi làm cave ở Phạm Ngũ Lão
var nht = Math.floor(Math.random() * 60000) + 100; //random coins khi làm cave ở Nguyễn Huy Tự
//random ku dài
var tdhs = ['Quét Nhà', 'Rửa Bát', 'Nấu Cơm', 'Giặt Đồ', 'Lau Nhà Xí']; //random độ dài của ku 
var ku1 = tdhs[Math.floor(Math.random() * tdhs.length)];   

var pnls = ['Ngủ 1 đêm', 'Ngủ 30p', 'Ngủ ôm KenZ', 'Ngủ trông KenZ', 'Thức trông KenZ']; //random độ dài của ku
var ku2 = pnls[Math.floor(Math.random() * pnls.length)]; 

var nhts = ['Công viên', 'Sở Thú', 'Đỉnh Everest', 'Xích Đạo', 'Trái Đất']; //random độ dài của ku
var ku3 = nhts[Math.floor(Math.random() * nhts.length)];  
var rdcn = ['tuyển dụng nhân viên', 'quản trị khách sạn', 'tại nhà máy điện', 'đầu bếp trong nhà hàng', 'công nhân']; //random công việc khi làm ở khu công nghiệp
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   
var rddv = ['sửa ống nước', 'sửa điều hòa cho hàng xóm', 'bán hàng đa cấp', 'phát tờ rơi', 'shipper', 'sửa máy vi tính', 'hướng dẫn viên du lịch', 'cho con bú']; //random công việc khi làm ở khu dịch vụ
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 
var rdmd = ['kiếm được 13 thùng dầu', 'kiếm được 8 thùng', 'kiếm được 9 thùng dầu', 'kiếm được 8 thùng dầu', 'ăn cướp dầu ', 'lấy nước đổ vô dầu rồi bán']; //random công việc khi làm ở mỏ dầu
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)];
var rdq = ['quặng sắt', 'quặng vàng', 'quặng than', 'quặng chì', 'quặng đồng ', 'quặng dầu']; //random công việc khi khai thác quặng
var work4 = rdq[Math.floor(Math.random() * rdq.length)];
var rddd = ['Anya']; //random công việc khi đào đá
var work5 = rddd[Math.floor(Math.random() * rddd.length)];
var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `❤️Bạn được ${work5} sai ${ku1} ở 𝐍𝐡𝐚̀ 𝐜𝐮̉𝐚 𝐀𝐧𝐲𝐚 ,Tiền Công :  ${pnl}vnd`; Currencies.increaseMoney(event.senderID, pnl); break;            
                case "2": msg = `❤️Bạn được ${work5} sai ${ku2} ở 𝐍𝐡𝐚̀ 𝐜𝐮̉𝐚 𝐀𝐧𝐲𝐚 ,Tiền Công :   ${pnl}vnd`; Currencies.increaseMoney(event.senderID, pnl); break;
                case "3": msg = `❤️Bạn được ${work5} sai đi chơi ở ${ku3} Tiền Công : ${nht}vnd`; Currencies.increaseMoney(event.senderID, nht); break;
                case "4": msg = `❤️Bạn đang làm việc ${work1} ở 𝐊𝐡𝐮 𝐂𝐨̂𝐧𝐠 𝐍𝐠𝐡𝐢𝐞̣̂𝐩 và kiếm được ${coinscn}vnd` ;await Currencies.increaseMoney(event.senderID, parseInt(coinscn)); break;             
               case "5": msg = `❤️Bạn đang làm việc ${work2} ở 𝐊𝐡𝐮 𝐃𝐢̣𝐜𝐡 𝐕𝐮̣ và kiếm được ${coinsdv}vnd`; await Currencies.increaseMoney(event.senderID, parseInt(coinsdv)); break;
               case "6": msg = `❤️Bạn ${work3} tại 𝐊𝐡𝐮 𝐌𝐨̉ 𝐃𝐚̂̀𝐮 và bán được ${coinsmd}vnd`; await Currencies.increaseMoney(event.senderID, parseInt(coinsmd)); break;
               case "7": msg = `❤️Bạn đang khai thác ${work4} và kiếm được ${coinsq}vnd`; await Currencies.increaseMoney(event.senderID, parseInt(coinsq)); break;

            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("⚡️Vui lòng nhập 1 con số", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("⚡️Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  
    event:e, 
    api, 
    handleReply, 
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    var   t = Date.parse("February 1, 2022") - Date.parse(new Date()),
    d = Math.floor( t/(1000*60*60*24) ),
    h = Math.floor( (t/(1000*60*60)) % 24 ),
    m = Math.floor( (t/1000/60) % 60 );

    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            hours = Math.floor((time / (60000 * 60000 ))/24),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(`💎𝐁𝐚̣𝐧 đ𝐚̃ 𝐥𝐚̀𝐦 𝐯𝐢𝐞̣̂𝐜 𝐧𝐠𝐚̀𝐲 𝐡𝐨̂𝐦 𝐧𝐚𝐲 𝐫𝐨̂̀𝐢 , 𝐧𝐠𝐡𝐢̉ 𝐱𝐢́𝐮 đ𝐢 𝐧𝐡𝐞́ !🎋.`, e.threadID, e.messageID); // Đoạn này ae có thể để quay lại sau ${housr}giờ ${minutes}phút ${seconds}giây
    }
    else {    
        var msg = {
            body: "🎋 𝐊𝐢𝐞̂́𝐦 𝐓𝐢𝐞̂̀𝐧 𝐇𝐚̀𝐧𝐠 𝐍𝐠𝐚̀𝐲🎋" +
                `\n🌸𝐋𝐚̀𝐦 𝐕𝐢𝐞̣̂𝐜 𝐊𝐢𝐞̂́𝐦 𝐭𝐢𝐞̂̀𝐧 𝐚̀ 𝐛𝐚̣𝐧 ~~🦋` +
                "\n1. 🎀𝐋𝐚̀𝐦 𝐯𝐢𝐞̣̂𝐜 𝐧𝐡𝐚̀ 𝐜𝐡𝐨 𝐀𝐧𝐲𝐚 💴 " +
                "\n2. 🎀𝐍𝐠𝐮̉ 𝐜𝐮̀𝐧𝐠 𝐀𝐧𝐲𝐚 💴 " +
                "\n3. 🎀Đ𝐢 𝐜𝐡𝐨̛𝐢 𝐯𝐨̛́𝐢 𝐀𝐧𝐲𝐚 💴 " +
                "\n4. 🎀𝐋𝐚̀𝐦 𝐨̛̉ 𝐊𝐡𝐮 𝐜𝐨̂𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̣̂𝐩 💴." +
                "\n5. 🎀𝐋𝐚̀𝐦 𝐨̛̉ 𝐊𝐡𝐮 𝐝𝐢̣𝐜𝐡 𝐯𝐮̣💴." +
                "\n6. 🎀𝐋𝐚̀𝐦 𝐨̛̉ 𝐊𝐡𝐮 𝐦𝐨̉ 𝐝𝐚̂̀𝐮💴." +
                "\n7. 🎀𝐋𝐚̀𝐦 𝐨̛̉ 𝐊𝐡𝐚𝐢 𝐭𝐡𝐚́𝐜 𝐪𝐮𝐚̣̆𝐧𝐠💴." +
                `\n\n🧨𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲 𝐒𝐓𝐓.`,
                attachment: fs.createReadStream(__dirname + `/noprefix/lamviec.gif`)}
                return api.sendMessage(msg,e.threadID,  (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: e.senderID,
            messageID: info.messageID
          })  
        })
    }
}