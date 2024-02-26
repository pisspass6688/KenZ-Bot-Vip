module.exports.config = {
 name: "ảnh",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "Bảo An🌸",
 description: "Dùng lệnh để xem ảnh",
 commandCategory: "Xem ảnh ~ Picture",
 cooldowns: 5,
 dependencies: {
  axios: ""
 }
}, module.exports.run = async function({
 event: e,
 api: a,
 args: n
}) {
 if (!n[0]) return a.sendMessage("💌𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐀̉𝐧𝐡💌\n\n𝟏. 𝐀̉𝐧𝐡 𝐆𝐚́𝐢 💞 \n𝟐. 𝐀̉𝐧𝐡 𝐓𝐫𝐚𝐢 💕\n𝟑. 𝐀̉𝐧𝐡 𝐋𝐢𝐞̂𝐧 𝐐𝐮𝐚̂𝐧 🍑\n𝟒.𝐀̉𝐧𝐡 𝐌𝐞𝐦𝐞 😽\n𝟓. 𝐀̉𝐧𝐡 𝐍𝐮𝐝𝐞 🔞(𝐘𝐞̂𝐮 𝐂𝐚̂̀𝐮 𝟏𝟖 𝐓𝐮𝐨̂̉𝐢)\n𝟔. 𝐀̉𝐧𝐡 𝐋𝐨𝐋𝐢 😻\n𝟕. 𝐀̉𝐧𝐡 𝐏𝐡𝐨𝐧𝐠 𝐂𝐚̉𝐧𝐡 🦄\n𝟖. 𝐀̉𝐧𝐡 𝐀𝐧𝐲𝐚\n\n━━━━━━━━━━━━━━━━━━\n🎬𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐕𝐢𝐝𝐞𝐨🎬\n𝟗. 𝐕𝐢𝐝𝐞𝐨 𝐀𝐧𝐢𝐦𝐞 🌸\n𝟏𝟎. 𝐕𝐢𝐝𝐞𝐨 𝐆𝐚́𝐢 🎀\n𝟏𝟏. 𝐕𝐢𝐝𝐞𝐨 𝐊𝐢̉ 𝐍𝐢𝐞̣̂𝐦\n𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐭𝐡𝐞𝐨 𝐒𝐓𝐓 𝐚̉𝐧𝐡 𝐜𝐚̂̀𝐧 𝐱𝐞𝐦 𝐧𝐡𝐞́ >", e.threadID, ((a, n) => {
  global.client.handleReply.push({
   name: this.config.name,
   messageID: n.messageID,
   author: e.senderID,
   type: "create"
  })
 }), e.messageID)
}, module.exports.handleReply = async ({
 api: e,
 event: a,
 client: n,
 handleReply: t,
 Currencies: s,
 Users: i,
 Threads: o
}) => {
 var { p, h } = linkanh();

 if ("create" === t.type) {
  const n = (await p.get(h)).data.data;
  let t = (await p.get(n, {
   responseType: "stream"
  })).data;
  return e.sendMessage({
   body: "[ 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 ] - 𝗔̉𝗻𝗵 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗲̀",
   attachment: t
  }, a.threadID, a.messageID)
 }

    function linkanh() {
        const p = require("axios");
        if ("1" == a.body)
            var h = "https://RandomLinkAPI-1.lucky2000.repl.co/gai";
        else if ("2" == a.body)
         var h = "https://RandomLinkAPI-1.lucky2000.repl.co/trai";
        else if ("3" == a.body)
         var h = "https://RandomLinkAPI-1.lucky2000.repl.co/lq";
        else if ("4" == a.body)
          var h = "https://RandomLinkAPI-1.lucky2000.repl.co/meme";
        else if ("5" == a.body)
          var h = "https://RandomLinkAPI-1.lucky2000.repl.co/nude";
        else if ("6" == a.body)
          var h = "https://randomlinkapi-1.lucky2000.repl.co/loli";
        else if ("7" == a.body)
          var h = "https://RandomLinkAPI-1.lucky2000.repl.co/chill";
        else if ("8" == a.body)
          var h = "https://RandomLinkAPI-1.lucky2000.repl.co/anya";
        else if ("9" == a.body)
         var h = "https://RandomLinkAPI-1.lucky2000.repl.co/videoanime";
        else if ("10" == a.body)
         var h = "https://RandomLinkAPI-1.lucky2000.repl.co/videogai";
        else if ("11" == a.body)
          var h = "https://RandomLinkAPI-1.lucky2000.repl.co/hi";
        else if ("12" == a.body)
          var h = "https://jimmy.ocvat2810.repl.co";
        else if ("13" == a.body)
          var h = "https://jrt-api.j-jrt-official.repl.co/twitter";
        else if ("14" == a.body)
         var h = "https://jrt-api.j-jrt-official.repl.co/instagram";
        else if ("15" == a.body)
         var h = "https://wibu.ocvat2810.repl.co";
        else if ("16" == a.body)
          var h = "https://jrt-api.nguyenhaidang.ml/loli";
         else if ("17" == a.body)
          var h = "https://apituandz1407.herokuapp.com/api/gaivuto.php";
        return { p, h };
    }
};
