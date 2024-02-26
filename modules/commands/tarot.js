module.exports.config = {
    name: "tarot",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Raiku ?",
    description: "Xem bói bài tarot",
    commandCategory: "Dành cho thành viên",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require("axios")
    const c = (await axios.get(' https://run.mocky.io/v3/be38b1e5-71f9-4aa5-b163-a519ebfb2bb3')).data
  if(args[0] > c.length) return api.sendMessage('Không Thể Vượt Quá Số Bài Đang Có Trong Data', event.threađID)
    if(!args[0]){
    var k = Math.floor(Math.random() * c.length)
  } else {
      var k = args[0]
  }
    const x = c[k]
    const t = (await axios.get(`${x.image}`, {
        responseType: "stream"
      })).data;
    const msg = ({
        body: `❤️★==[ 𝐁𝐎́𝐈 𝐓𝐀𝐑𝐎𝐓 ]==★❤️\n\n➻❤️ 𝐍𝐚𝐦𝐞: ${x.name}\n➻❤️ 𝐒𝐮𝐢𝐭𝐞: ${x.suite}\n➻❤️ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${x.vi.description}\n➻❤️ 𝐈𝐧𝐭𝐞𝐫𝐩𝐫𝐞𝐭𝐚𝐭𝐢𝐨𝐧: ${x.vi.interpretation}\n➻❤️ 𝐑𝐞𝐯𝐞𝐫𝐬𝐞𝐝: ${x.vi.reversed}`,
        attachment: t
    })
    return api.sendMessage(msg, event.threadID, event.messageID)
}