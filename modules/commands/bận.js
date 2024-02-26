module.exports.config = {
    name: 'bận',
    version: '10.02',
    hasPermssion: 0,
    credits: 'Nguyễn Phụ Mạnh',
    description: 'Tự thông báo bạn đang bận khi có người tags',
    commandCategory: 'Dành cho thành viên',
    usages: '[]',
    cooldowns: 3
};
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra')
dest = __dirname + '/cache/bận.json',
convertTime = a => new Date(a).toLocaleString();
module.exports.onLoad = function() {
    if (!existsSync(dest)) writeFileSync(dest, '{}');
};
module.exports.handleEvent = async function({
    api, event
}) {
    const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
    data = JSON.parse(readFileSync(dest)),
    tags = Object.keys(event.mentions),
    now = Date.now(),
    z = data[event.senderID];
    if (!!z) {
        if (z.timeEnd < now){
           await out(`𝐂𝐡𝐚̀𝐨 𝐦𝐮̛̀𝐧𝐠 𝐛𝐚̣𝐧 đ𝐚̃ 𝐪𝐮𝐚𝐲 𝐥𝐚̣𝐢 😘`, true);
            out(z.dataTags.length == 0 ? '𝐓𝐫𝐨𝐧𝐠 𝐥𝐮́𝐜 𝐛𝐚̣𝐧 đ𝐢 𝐯𝐚̆́𝐧𝐠 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐚𝐢 𝐭𝐚𝐠 𝐛𝐚̣𝐧 𝐜𝐚̉': `✉ 𝐏𝐡𝐚́𝐭 𝐡𝐢𝐞̣̂𝐧 𝐭𝐫𝐨𝐧𝐠 𝐥𝐮́𝐜 𝐛𝐚̣𝐧 đ𝐢 𝐯𝐚̆́𝐧𝐠 𝐜𝐨́ ${z.dataTags.length} 𝐧𝐠𝐮̛𝐨̛̀𝐢 đ𝐚̃ 𝐭𝐚𝐠 𝐛𝐚̣𝐧\n${z.dataTags.map((i, c) => `👤${c+1}: https://facebook.com/profile.php?id=${i.id}\n⏰ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${convertTime(i.time)}\n⛪ 𝐍𝐡𝐨́𝐦: ${global.data.threadInfo.get(i.idT).threadName}\n🔔 𝐋𝐨̛̀𝐢 𝐧𝐡𝐚̆́𝐧: ${i.msg}\n`).join('\n\n')}`);
            z.dataTags.length = 0;
        };
          z.timeEnd = now+(z.delay*(60*1000));
    };
    if (tags.length != 0) tags.forEach(i => {
        const x = data[i];
        if (!!x && x.timeEnd < now) {
            x.dataTags.push({
                id: event.senderID,
                idT: event.threadID,
                msg: event.body,
                time: Date.now()+25200000
            });
            out(`===𝐂𝐡𝐞̂́ Đ𝐨̣̂ 𝐀𝐟𝐤===\n─────────────────\n\n👤 Người dùng: https://facebook.com/profile.php?id=${i} đang bận ❗\n⛔ Lý Do: ${x.msg}\n💬 Tương tác lần cuối: ${convertTime((x.timeEnd-(x.delay*(60*1000)))+25200000)}`, true);
        };
    });
    writeFileSync(dest, JSON.stringify(data, 0, 4));
};
module.exports.run = function({
    api, event, args
}) {
    try {
        const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
        data = JSON.parse(readFileSync(dest));
        if (!!args[0]) {
            const str = args.join(' '),
            arg = str.split('&'),
            msg = arg[0],
            delay = arg[1];
            if (!msg || !delay || isNaN(delay)) return out(!!delay&&isNaN(delay) ? 'Phải là con số':`Vui lòng nhập đúng định dạng: lý do & thời gian đếm ngược tự bật(phút): `, true);
            data[event.senderID] = {
                delay,
                timeEnd: Date.now()+(delay*(60*1000)),
                msg,
                dataTags: []
            };
            out(`Đã thiết lập ${this.config.name} với lý do: ${msg}\n\n -> tự bật sau ${delay%60} phút kể từ khi bạn ko tương tác!`, true);
        } else {
            if (!data[event.senderID]) return out(`Bạn chưa thiết lập ${this.config.name}, để thiết lập nhập: ${event.body.split('').shift()}${this.config.name} + Lý do & thời gian(phút) tự bật sau khi bạn rời khỏi!`, true);
            out(`Đã xóa thiết lập ${this.config.name}!`, true);
            delete data[event.senderID];
        };
        writeFileSync(dest, JSON.stringify(data, 0, 4));
    }catch(err) {
        out(err, true);
    }
};