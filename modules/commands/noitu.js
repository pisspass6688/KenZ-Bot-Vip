exports.config = {
    name: 'noitu',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Nối Từ',
    commandCategory: 'Trò Chơi ~ Game',
    usages: '[]',
    cooldowns: 3
};

let fs = require('fs');
let path = __dirname+'/cache/byNam_word.txt';
let data = [];
let stream_url= async url=>await require('axios').get(url, {
    responseType: 'stream'
}).then(res=>res.data);
let save = ()=>fs.writeFileSync(path, data.join(','), 'utf8');
let word_valid = word=>/^[a-zA-Zà-ỹÀ-Ỹ]+ [a-zA-Zà-ỹÀ-Ỹ]+$/.test(word);

exports.onLoad = async function() {
    if (!fs.existsSync(path)) {
        data = (await require('axios').get(`https://raw.githubusercontent.com/NamVNs/WordMatching/main/assets/word.txt`)).data.split(',').filter(word_valid);
    } else data = fs.readFileSync(path, 'utf8').split(',').filter(word_valid);
    save();
};

exports.handleReply = async function(o) {
    let _ = o.handleReply;
    if (o.event.senderID != _.event.senderID)return;

    let word = (o.event.body || '').split(' ');
    let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, callback == 0?undefined: o.event.messageID);

    if (!word_valid(word.join(' ')))return send(`! Từ nối không hợp lệ.`); o.api.unsendMessage(_.messageID);
    if (_.type == 'player_vs_bot') {
        if (word[0].toLowerCase() != _.word_bot.split(' ')[1].toLowerCase()) {

            // send khác cũng làm tương tự như bên dưới,
            let image_all = [
                "https://i.imgur.com/fDufp09.jpeg",
                ""
            ];
            let image_random = image_all[Math.random()*image_all.length<<0];
            send({
                body: `== Bạn đã thua ==\n\n- số câu đã nối: ${_.loop}\n Trừ đi ${_.bet}$`,
                attachment: await stream_url(image_random)
            }, 0);

            send(`Hơi nonnn:)))`);
            o.Currencies.decreaseMoney(o.event.senderID, _.bet);
            return;
        };
        let word_matching = data.filter($=>$.split(' ')[0].toLowerCase() == word[1].toLowerCase());
        let random_word_ = word_matching[Math.random()*word_matching.length<<0];

        if (!word_valid(random_word_)) {
            if (!data.includes(word.join(' '))) {
                data.push(word.join(' '));
                save();
            };
            o.Currencies.increaseMoney(o.event.senderID, _.bet*3);

            // send khác cũng làm tương tự như bên dưới,
            let image_all = [
                "https://i.imgur.com/fDufp09.jpeg",
                "https://i.imgur.com/xxcHqTU.jpeg"
            ];
            let image_random = image_all[Math.random()*image_all.length<<0];
            send({
                body: `== Bạn đã thắng ==\n\n- Số câu đã nối được: ${_.loop}\n- Thưởng: ${_.bet*3}$`,
                attachment: [await stream_url(image_random)]
            });
            send(`Bot thua roi nhưng kiến thức này sẽ được toi tiếp thu hê hê nên ván sau mi tuổi gì thắng`);
        }else send(`- Bot nối tiếp: ${random_word_}\n\n-> Reply Bot\n- Lần nối: ${_.loop+1}`, (err, res)=>(res.type = 'player_vs_bot', res.name = exports.config.name, res.event = o.event, res.word_bot = random_word_, res.loop = _.loop+1, res.bet = _.bet, client.handleReply.push(res)));
    };


};

exports.run = async function(o) {
    let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    let bet = +o.args[0] || 0;
    let word_bot = data[Math.random()*data.length<<0];
    
    if (o.args[0] == 'bot')return send(`Hiện tại bot có ${data.length} câu có thể nối`);
    if (bet < 1000 || bet > (await o.Currencies.getData(o.event.senderID)).money)return send(`Bạn quên đặt cược bao tiền kìa , số tiền tối thiểu là 1000`);

    // send khác cũng làm tương tự như bên dưới,
    let image_all = [
        "https://i.imgur.com/fDufp09.jpeg",
        "https://i.imgur.com/W9njZBO.jpeg"
    ];
    let image_random = image_all[Math.random()*image_all.length<<0];
    send({
        body: `==== 『 NỐI TỪ 』 ====\n━━━━━━━━━━━━━━━━━━\n💵 Phí: ${bet}$\n- Từ đầu tiên sẽ là :${word_bot}\n━━━━━━━━━━━━━━━━━━\n-> Reply bot.\n- Lần nối: 0`,
        attachment: await stream_url(image_random)
    },
        (err, res)=>(res.type = 'player_vs_bot', res.name = exports.config.name, res.event = o.event, res.word_bot = word_bot, res.loop = 0, res.bet = bet, client.handleReply.push(res)));
};