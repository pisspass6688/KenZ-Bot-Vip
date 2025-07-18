module.exports.config = {
    name: "pending",
    version: "1.0.6",
    credits: "CatalizCS mod by Kadeer",
    hasPermssion: 2,
    description: "Quản lý tin nhắn chờ của bot",
    commandCategory: "Dành cho admin bot",
    usages: "[u] [t] [a]",
    cooldowns: 5
};


module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/trogiup/menu/`;
    if (!fs.existsSync(dirMaterial + "menu")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "trogiup.mp4")) request("https://imgur.com/nN3yCF8?fbclid=IwAR0TMz1ho0bs5BCujwXSKzq_uxiGDcOTUG2bce0HKlGZCFJ_Oc7MOJ5f3Jg.mp4").pipe(fs.createWriteStream(dirMaterial + "trogiup.mp4"));
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
        }
        return api.sendMessage(`𝙏𝙪̛̀ 𝘾𝙝𝙤̂́𝙞 ✅`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`>> ${global.config.PREFIX} << • ${(!global.config.BOTNAME) ? "ditmemay" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body:`➢ 𝙉𝙝𝙖̣̂𝙣 𝙇𝙚̣̂𝙣𝙝 𝙆𝙞𝙘𝙠 𝙃𝙤𝙖̣𝙩 𝙏𝙪̛̀ 𝘼𝙙𝙢𝙞𝙣\n➢ 𝘾𝙝𝙪́𝙘 𝘾𝙖́𝙘 𝘽𝙖̣𝙣 𝘿𝙪̀𝙣𝙜 𝘽𝙤𝙩 𝙑𝙪𝙞 𝙑𝙚̉`, attachment: fs.createReadStream(__dirname + "/trogiup/menu/trogiup.mp4")} ,handleReply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`𝙋𝙝𝙚̂ 𝘿𝙪𝙮𝙚̣̂𝙩 ✅`, threadID, messageID);
    }
}

module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("Bạn có thể dùng pending:\nPending user: Hàng chờ người dùng\nPending thread: Hàng chờ nhóm\nPending all:Tất cả hàng chờ ",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const permission = ["100051141638702","100066990987283"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("𝙇𝙤̂̃𝙞 🚫", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`𝘿𝙖𝙣𝙝 𝙎𝙖́𝙘𝙝 𝘾𝙖̂̀𝙣 𝘿𝙪𝙮𝙚̣̂𝙩 : ${list.length} 𝙉𝙜𝙪̛𝙤̛̀𝙞 𝘿𝙪̀𝙣𝙜\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("𝙏𝙧𝙤̂́𝙣𝙜 🛡️", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
        const permission = ["100051141638702","100066990987283"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("𝙇𝙤̂̃𝙞 🚫", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`𝘿𝙖𝙣𝙝 𝙎𝙖́𝙘𝙝 𝘾𝙖̂̀𝙣 𝘿𝙪𝙮𝙚̣̂𝙩 : ${list.length} 𝙉𝙝𝙤́𝙢\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("𝙏𝙧𝙤̂́𝙣𝙜 🛡️", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
        const permission = ["100051141638702","100066990987283"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lồn biên giới?", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage(" 𝙇𝙤̂̃𝙞 🚫", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`𝘿𝙖𝙣𝙝 𝙎𝙖́𝙘𝙝 𝘾𝙖̂̀𝙣 𝘿𝙪𝙮𝙚̣̂𝙩 : ${list.length} 𝙐𝙨𝙚𝙧 & 𝙏𝙝𝙧𝙚𝙖𝙙\n\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("𝙏𝙧𝙤̂́𝙣𝙜 🛡️", threadID, messageID);
        }
    }       
}

