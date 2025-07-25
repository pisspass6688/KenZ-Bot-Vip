module.exports.config = {
    name: 'listbox',
    version: '1.0.0',
    credits: 'ManhG',
    hasPermssion: 2,
    description: '[Ban/Unban/Remove] List thread bot đã tham gia',
    commandCategory: 'Dành cho admin bot',
    usages: '[số trang/all]',
    cooldowns: 5
};

module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {
    const { threadID, messageID } = event;
    if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
    var arg = event.body.split(" ");
    //var idgr = handleReply.groupid[arg[1] - 1];
    //var groupName = handleReply.groupName[arg[1] - 1];
    switch (handleReply.type) {
        case "reply":
            {
                if (arg[0] == "ban" || arg[0] == "Ban") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "» Thực thi Ban «\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];

                        const data = (await Threads.getData(idgr)).data || {};
                        data.banned = true;
                        data.dateAdded = time;
                        var typef = await Threads.setData(idgr, { data });
                        global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
                        msg += typef + ' ' + groupName + '\n» TID: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`» Thông báo từ Admin «\n Nhóm Bạn Đã Bị Ban, cấm dùng bot.`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`» Thực thi Ban «(true/false) «\n\n${msg}`, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }

                if (arg[0] == "unban" || arg[0] == "Unban" || arg[0] == "ub" || arg[0] == "Ub") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "» Thực thi Unban «\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];

                        const data = (await Threads.getData(idgr)).data || {};
                        data.banned = false;
                        data.dateAdded = null;
                        var typef = await Threads.setData(idgr, { data });
                        global.data.threadBanned.delete(idgr, 1);
                        msg += typef + ' ' + groupName + '\n» TID: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`» Thông báo từ Admin «\n\n Nhóm Bạn Đã Được Gỡ Ban`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`» Thực thi Unban «(true/false)\n\n${msg}`, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }

                if (arg[0] == "out" || arg[0] == "Out") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "» Thực thi Out «\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];
                        var typef = api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
                        msg += typef + ' ' + groupName + '\n» TID: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`𝐓𝐚̣𝐦 𝐛𝐢𝐞̣̂𝐭 𝐦𝐢̀𝐧𝐡 𝐩𝐡𝐚̉𝐢 𝐝𝐢 𝐫𝐨̂̀𝐢, 𝐧𝐡𝐮̛𝐧𝐠 𝐛𝐚̣𝐧 𝐬𝐞̃ 𝐥𝐮𝐨̂𝐧 𝐨̛̉ 𝐭𝐫𝐨𝐧𝐠 𝐤𝐲́ 𝐮̛́𝐜 𝐜𝐮̉𝐚 𝐭𝐨̂𝐢 𝐯𝐚̀ 𝐭𝐨̂𝐢 𝐬𝐞̃ 𝐥𝐮𝐨̂𝐧 𝐭𝐫𝐚̂𝐧 𝐭𝐫𝐨̣𝐧𝐠 𝐧𝐡𝐮̛̃𝐧𝐠 𝐤𝐲̉ 𝐧𝐢𝐞̣̂𝐦 𝐦𝐚̀ 𝐭𝐨̂𝐢 𝐝𝐚̃ 𝐭𝐚̣𝐨 𝐫𝐚 𝐯𝐨̛́𝐢 𝐛𝐚̣𝐧. 𝐁𝐚̂́𝐭 𝐜𝐮̛́ 𝐤𝐡𝐢 𝐧𝐚̀𝐨 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐭𝐨̂𝐢 𝐜𝐡𝐢̉ 𝐜𝐚̂̀𝐧 𝐧𝐡𝐚̆́𝐦 𝐦𝐚̆́𝐭 𝐥𝐚̣𝐢 𝐭𝐨̂𝐢 𝐬𝐞̃ 𝐜𝐨́ 𝐦𝐚̣̆𝐭 𝐧𝐠𝐚𝐲!`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`★★Thực thi Out(true/false)★★\n\n${msg} `, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }
            }
    }
};
module.exports.run = async function({ api, event, args }) {
  const permission = ["100087890537475","100047152010637"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Bạn nghĩ gì mà được dùng thế", event.threadID, event.messageID);
    switch (args[0]) {
        case "all":
            {
                var inbox = await api.getThreadList(100, null, ['INBOX']);
                let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                var listthread = [];
                var listbox = [];
                /////////
                for (var groupInfo of list) {
                    //let data = (await api.getThreadInfo(groupInfo.threadID));
                    //const listUserID = event.participantIDs.filter(ID => ID);
                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name || "Chưa đặt tên",
                        participants: groupInfo.participants.length
                    });
                }
                /////////
                var listbox = listthread.sort((a, b) => {
                    if (a.participants > b.participants) return -1;
                    if (a.participants < b.participants) return 1;
                });
                /////////  
                var groupid = [];
                var groupName = [];
                var page = 1;
                page = parseInt(args[0]) || 1;
                page < -1 ? page = 1 : "";
                var limit = 100000;
                var msg = "» DS NHÓM ĐÃ THAM GIA «\n\n";
                var numPage = Math.ceil(listbox.length / limit);

                for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                    if (i >= listbox.length) break;
                    let group = listbox[i];
                    msg += `${i + 1}. ${group.name}\n🔰 TID: ${group.id}\n👤 Số thành viên: ${group.participants}\n\n`;
                    groupid.push(group.id);
                    groupName.push(group.name);
                }
                msg += `\n--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}listbox all + số trang\n\n`

                api.sendMessage(msg + '🎭 Reply Out, Ban, Unban + số thứ tự, có thể rep nhiều số, cách nhau bằng dấu cách để Out, Ban, Unban thread đó!', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        groupName,
                        type: 'reply'
                    })
                )
            }
            break;

        default:
            try {
                var inbox = await api.getThreadList(100, null, ['INBOX']);
                let list = [...inbox].filter(group =>  group.isSubscribed && group.isGroup);
                var listthread = [];
                var listbox = [];
                /////////
                for (var groupInfo of list) {
                    //let data = (await api.getThreadInfo(groupInfo.threadID));
                    //const listUserID = event.participantIDs.filter(ID => ID);
                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name || "Chưa đặt tên",
                        participants: groupInfo.participants.length
                    });

                } //for
                var listbox = listthread.sort((a, b) => {
                    if (a.participants > b.participants) return -1;
                    if (a.participants < b.participants) return 1;
                });
                var groupid = [];
                var groupName = [];
                var page = 1;
                page = parseInt(args[0]) || 1;
                page < -1 ? page = 1 : "";
                var limit = 100;
                var msg = "» DS NHÓM ĐÃ THAM GIA «\n\n";
                var numPage = Math.ceil(listbox.length / limit);

                for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                    if (i >= listbox.length) break;
                    let group = listbox[i];
                    msg += `${i + 1}. ${group.name}\n🔰TID: ${group.id}\n👤 Số thành viên: ${group.participants}\n\n`;
                    groupid.push(group.id);
                    groupName.push(group.name);
                }
                msg += `--Trang ${page}/${numPage}--\nDùng ${global.config.PREFIX}listbox + số trang/all\n\n`

                api.sendMessage(msg + '🎭 Reply Out, Ban, Unban + số thứ tự, có thể rep nhiều số, cách nhau bằng dấu cách để Out, Ban, Unban thread đó!', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        groupName,
                        type: 'reply'
                    })
                )
            } catch (e) {
                return console.log(e)
            }
    }
};
