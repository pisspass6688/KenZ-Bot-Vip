module.exports.config = {
  name: "ghepdoi",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "D-Jukie (Xuyên get)",
  description: "Ghép đôi",
  commandCategory: "Tình yêu ~ Love", 
  usages: "ghép", 
  cooldowns: 10
};
module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function({ api, event,Threads, Users }) {
        const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
     const { loadImage, createCanvas, registerFont } = require("canvas");
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + "/noprefix/rankup.jpg";
  let pathAvt1 = __dirname + "/cache/Avtmot.png";
  let pathAvt2 = __dirname + "/cache/Avthai.png";
  var id1 = event.senderID;
        var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
        var tle = Math.floor(Math.random() * 101);
        var namee = (await Users.getData(event.senderID)).name
        const botID = api.getCurrentUserID();
        const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
        var id = listUserID[Math.floor(Math.random() * listUserID.length)];
        var name = (await Users.getData(id)).name 
var background = ["https://i.imgur.com/S5GOleQ.jpg"];
    var rd = background[Math.floor(Math.random() * background.length)];
  let data2 = [
      "Anh có thể chịu được sự lạnh giá.\nNhưng không thể chịu được sự lạnh nhạt của em",
"Đông lạnh chăn ấm nệm êm.\nKhông bằng một phút êm đềm bên em",
"Trời nay lạnh đến thế.\nLại còn lất phất mưa.\nTớ thích cậu nhiều thế.\nCậu đã động lòng chưa.",
"Mùa đông thì lạnh.\nÁo quần mong manh.\nĐiều em muốn nhất.\nLà gần bên anh.",
"Ngoài kia gió rét sương sa.\nVề đây có nắng, có nhà, có em",
"Son màu đỏ, cỏ màu xanh, trời trở lạnh.\nMình yêu dần đi anh",
"Đông về cây buồn rụng hết lá.\nEm buồn vì lạnh giá chẳng có ai",
"Anh ơi gió lạnh gần kề, anh mau thu xếp mà về bên em",
"Chạy đâu cho khỏi mưa rào.\nChạy đâu cho khỏi sà vào tay em",
"Nhìn nắng thì anh chói, nhìn em thì anh đói.",
"Anh ơi nắng ấm xa dần.\nĐông sang gió lạnh em cần anh thôi.",
"Ngoài đường trời mưa tầm tã, cho em ngã vào lòng anh được không?",
"Sẽ thật tuyệt vời nếu rơi vào một chiều Đông,\nem cưa chị đổ chị gọi em là Phi Công",
"Gió đưa cành trúc la đà\nChào anh em mới đứng đây từ chiều\nĐứng hoài chẳng thấy anh đâu\nHoá ra anh ở trong tim em rồi.",
"Hôm nay nhà nấu cháo lòng\nCháo em ăn hết, để lòng nhớ anh.",
"Thích em anh để trong lòng\nNói ra nước dãi thòng lòng kém sang.",
"Râu tôm nấu với ruột bầu\nEm đây thì muốn có bầu với anh.",
"Người ta vì thiên hạ mà điên đảo\nTa vì chàng mà phiền não quanh năm.",
"Dí dầu cầu ván đóng đinh\nCầu tre lắc lẽo, gập ghềnh thương em.",
"Anh ơi trà sữa em mời\nNhưng anh phải hứa cả đời thương em.",
"Bầu ơi thương lấy bí cùng\nTuy rằng khác giới, nhưng chung 1 giường.",
"Gặp đây anh nắm cổ tay\nAnh hỏi câu này có lấy anh không?",
"Chẳng cần nghiêng nước nghiêng thành\nNghiêng sao cho đủ lòng anh là vừa.",
"Con cừu non nhảy ra miệng chén\nTình chúng mình yêu lén mẹ cha\nKhông ngờ mẹ biết mẹ la\nAnh đem sính lễ đến nhà cưới em",
"Nếu chúa phán yêu nhau là hủy hoại\nThì con tin nhân loại chẳng còn ai\nNếu chúa phán yêu nhau là có tội\nThì con xin chịu tội để được yêu",
"Em ơi trái đất dẫu tròn,\nEm trốn không kỹ là còn gặp anh.",
"Hoa chỉ nở khi có người tưới nước.\nEm chỉ cười khi đứng trước người em yêu.",
"Đừng gọi em là thiếu nữ.\nTrong khi thứ em thiếu là đàn ông.",
"Nhà em gần miếu, gần chùa.\nAnh không yêu, em cũng bỏ bùa cho yêu.",
"Em yêu anh không hề nói phét.\nTình chúng mình căng đét phải không anh?",
"Hôm nay em bận yêu đời.\nHẹn anh hôm khác chúng mình yêu nhau.",
"Trời không xanh\nMây cũng không trắng\nEm không say nắng\nNhưng lại say anh.",
"Bao nhiêu cân thính cho vừa\nBao nhiêu cân bả mới lừa được em.",
"Thiếu 500 nghìn là em tròn một củ\nThiếu anh nữa là em đủ một đôi.",
"Đố ai quyét sạch được lá rừng\nĐố ai khuyên được em ngừng yêu anh!",
"Cho anh một cốc trà đào\nTiện cho em hỏi lối vào tim anh!",
"Trung thu anh vẫn một mình\nNếu em vẫn vậy thì mình đi chung.",
"Cành cây còn có lá\nChú cá còn đang bơi\nSao em cứ mải chơi\nChẳng chịu nhìn em thế.",
"Anh có một siêu năng lượng\nĐó là siêu thích em.",
"Quyết không tiêu từ giờ đến tết Để dành tiền mua hết trái tim anh.",
"Người ta dính phốt ngoại tình. Còn tôi dính phốt một mình lâu năm.",
"Nắng nơi em nắng hoài không tắt. Yêu anh rồi yêu mãi không thôi.",
"Cây đa giếng nước sân đình. Bao giờ em mới hết một mình đây anh.",
"Em thiếu anh như hoa thiếu nắng\nCó anh rồi nắng chết hết cả hoa.\nMuốn yêu cô gái dịu hiền\nAlo nhấc máy gọi liền cho em.",
"Em đây rất thích đồng hồ.\nThích luôn cả việc làm bồ của anh.",
"Tim em đã bật đèn xanh.\nMà sao anh cứ đạp phanh thế này.",
"Anh bận tất cả mọi điều.\nNhưng vẫn luôn rảnh để nhớ đến em.",
"Ao thì có bờ, sông thì có bến.\nCòn em một mình thì ai đến với em đây.",
"Trái Đất quay quanh Mặt Trời.\nCòn em thì quay mãi trong tâm trí anh.",
"Đi đi kẻo lỡ đèn xanh.\nYêu đi kẻo lỡ tình anh bây giờ.",
"Đôi khi bạn yêu một thành phố.\nKhông phải vì nó có gì, mà vì nó có em.",
"Lồng thì để anh nhốt chim.\nCon em anh nhốt ở trong tim nè.",
"Anh có tin vào duyên số không.\nNếu không thì anh đưa số điện thoại đây.",
"Nhiều khi muốn nhớ một người.\nSuy đi tính lại thấy lười nên thôi.",
"Gọi chị là thời trang yodi\nBởi vì chị lookgood feelgood",
"Em ví dụ mình như số 4-6\nĐể được ở cùng quanh 5",
"Gọi chị là Cô Giáo\nBởi vì cứ gặp chị là em muốn Trả Bài",
"Gọi chị là cái ghế\nVì em yêu chị khỏi phải Bàn",
"Gọi em là thẩm phán\nVì thấy em là anh muốn chung thân",
"Một nụ cười bằng 10 thang thuốc bổ\nVì vậy anh muốn cả ngày smile (sờ mai)",
"Anh cực ghét ngày mùng 1-6\nBởi vì ngày đó là ngày Thiếu Nhi",
"Em là một hoạ sĩ tồi\nVì em vẽ cầu vồng thì thiếu nắng, vẽ hạnh phúc thì thiếu anh",
"Muốn một lần đưa Roma sang Luân Đôn\nĐể em thấy được thành ý trong anh",
"Pascal thì viết phương trình\nCòn anh thì viết chuyện tình hai ta",
"Cu, CuCl2 và Fe3o4 thì có thể kết tủa\nCòn anh và em thì có thể kết hôn",
"Nhìn em anh lại nhớ đến Ngô Tất Tố\nBởi vì anh chỉ muốn tắt đèn",
"Trái tim anh đang dao động điều hoà\nTừ khi em đến bỗng lệch pha",
"Nhìn em anh thấy yêu động vật\nVì chỉ có em làm anh thích thú",
"Anh chỉ muốn chúng mình là heo\nĐể được cùng em ăn và ngủ",
"Anh biết em thích badboy\nAnh đây trai tốt nào đâu có phần\nVì tính anh không vui nhưng mà túi anh không vơi",
"Gọi em là Nội 1972\nVì khiến anh ngày đêm không ngủ",
"Gặp em anh chỉ muốn nhìn sang trái\nĐể thấy yêu em là phải",
"Gọi em là đèn đỏ\nVì thấy em là anh biết điểm dừng",
"Nắng kia đâu làm anh cháy\nNhưng em cười chắc chắn làm anh say",
"Gọi em là ngã rẽ\nVì gặp em là anh phải cua",
"Trông cậu hài quá\nToi cuoi cau duoc khong?",
"Gọi em là Cách Mạng Tháng 8\n Vì em là Thời cơ ngàn năm có một",
"Em có thể nhờ anh tất cả\nKể cả nhờ ơ nhơ sắc nhớ"
    ];
    let text = data2[Math.floor(Math.random() * data2.length)]
  
        let getAvtmot = (
    await axios.get( `https://graph.facebook.com/${id1}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`,{ responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));
avt1 = await this.circle(pathAvt1);
        let getAvthai = (await axios.get( `https://graph.facebook.com/${id}/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y`, { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt2, Buffer.from(getAvthai, "utf-8"));
 avt2 = await this.circle(pathAvt2);             
   if (!fs.existsSync(__dirname +
        `/tad/UTMFacebookK&TItali.ttf`)) {
        let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1lh3U5emvpL4wJvxW_M8LFORc4rargy1s&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/UTMFacebookK&TItali.ttf`, Buffer.from(getfont, "utf-8"));
   }
  let getbackground = (
    await axios.get(`${rd}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));
  
    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(avt1);
  let baseAvt2 = await loadImage(avt2);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvt1, 230, 40, 150, 150);
ctx.drawImage(baseAvt2, 355, 80, 150, 150);
registerFont(__dirname + `/tad/UTMFacebookK&TItali.ttf`, {
      family: "UTM"
    });
    ctx.textAlign = "start";    
    ctx.font = "25px UTM";
    ctx.fillStyle = "#CC0066";
    ctx.fillText(`${namee}`, 90, 30);
  ctx.font = "25px UTM";
    ctx.fillStyle = "#CC0066";
    ctx.fillText(`${name}`, 460, 30);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
fs.removeSync(pathAvt2);
        return api.sendMessage({body:`𝗚𝗛𝗘́𝗣 Đ𝗢̂𝗜 𝗧𝗛𝗔̀𝗡𝗛 𝗖𝗢̂𝗡𝗚\n━━━━━━━━━━━━━━━━━━\nTỉ lệ hợp đôi giữa ${namee} và ${name} là: ${tle}%\n━━━━━━━━━━━━━━━━━━\n${text}`,attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg));
}