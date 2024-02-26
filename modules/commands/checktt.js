const axios = require('axios');
const fs = require('fs-extra');
const time = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
const dataRank = fs.existsSync(__dirname + '/checktt/checktt.json') ? JSON.parse(fs.readFileSync(__dirname + '/checktt/checktt.json')) : {};
class Modules {
    get config() {
        return {
            name: "checktt",
            version: "1.0.0",
            description: "Kiểm tra tương tác của nhóm",
            hasPermssion: 0,
            credits: "Thiệu Trung Kiên",
            commandCategory: "Dành cho thành viên",
            usages: "[channel]",
            cooldowns: 0
        };
    }
    onLoad() {
        if (!fs.existsSync(__dirname + '/checktt') && !fs.existsSync(__dirname + '/checktt/checktt.json')) {
            fs.mkdirSync(__dirname + '/checktt', { recursive: true });
            fs.writeFileSync(__dirname + '/checktt/checktt.json', JSON.stringify({}));
        }
        global.client.events.set('autoDataCheckTT', {
            config: {
                name: 'autoDataCheckTT',
                eventType: ['log:subscribe', 'log:unsubscribe'],
                version: '1.0.0',
                credits: 'Thiệu Trung Kiên',
                description: 'Tự động xóa dữ liệu tương tác khi có thành viên rời khỏi nhóm',
            },
          // Bật selflisten cho bot thì mới có thể xóa data khi bot kick !
            run: async function ({ api, event }) {
                switch (event.logMessageType) {
                    case "log:subscribe": {
                        if (event.logMessageData.addedParticipants.find(item => item.userFbId == api.getCurrentUserID())) return;
                        if (event.threadID in dataRank) {
                            for (let id of event.logMessageData.addedParticipants) {
                                if (id.userFbId == api.getCurrentUserID()) return;
                                if (!(id.userFbId in dataRank[event.threadID])) {
                                    dataRank[event.threadID][id.userFbId] = 0;
                                }
                            }
                            fs.writeFileSync(__dirname + '/checktt/checktt.json', JSON.stringify(dataRank, null, 2));
                        }
                    }
                    break;
                    case "log:unsubscribe": {
                        console.log("ĐANG XÓA DỮ LIỆU TƯƠNG TÁC")
                        if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
                        if (event.threadID in dataRank) {
                            delete dataRank[event.threadID][event.logMessageData.leftParticipantFbId];
                            fs.writeFileSync(__dirname + '/checktt/checktt.json', JSON.stringify(dataRank, null, 2));
                        }
                    }
                }
            }
        })
    }
    randomImg() {
        return new Promise(async (resolve, reject) => {
            const getUrl = (await axios.get('https://RandomLinkAPI-1.lucky2000.repl.co/anime')).data.data;
            axios.get(getUrl, {
                responseType: 'stream'
            }).then(res => {
                resolve(res.data);
            }).catch(err => reject(err));
        })
    }
    sorted(obj) {
        return Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
    }
    checkRank(count) {
        const ranks = [
            { name: 'Thách Đấu', count: 2000, image: 'https://i.imgur.com/qFV8Fys.png'
},
            { name: 'Cao Thủ', count: 1000, image: 'https://i.imgur.com/I3JhnCl.png' },
            { name: 'Tinh Anh', count: 900, image: 'https://i.imgur.com/jsHAKpB.png' },
            { name: 'Kim Cương', count: 700, image: 'https://i.imgur.com/ltbektS.png' },
            { name: 'Bạch Kim', count: 500, image: 'https://i.imgur.com/m0UkrWN.png' },
            { name: 'Vàng', count: 300, image: 'https://i.imgur.com/ZhdWyGV.png' },
            { name: 'Bạc', count: 100, image: 'https://i.imgur.com/7tDrzWp.png' },
            { name: 'Đồng', count: 0, image: 'https://i.imgur.com/FNsp98q.png' }
        ];
        for (let rank of ranks) {
            if (count >= rank.count) return rank;
        }
    }
    async run({ api, event, Users, args }) {
        if (!(event.threadID in dataRank)) {
            dataRank[event.threadID] = {};
        }
        if (!(event.senderID in dataRank[event.threadID])) {
            dataRank[event.threadID][event.senderID] = 0;
        }
        switch (args[0]) {
            case "all": {
                var msg = "", i = 1;
                var data = dataRank[event.threadID];
                for (let id of event.participantIDs) {
                    if (!(id in data)) {
                        if (id == api.getCurrentUserID()) continue;
                        data[id] = 0;
                    }
                }
                var { name } = await api.getThreadInfo(event.threadID) || 'Không xác định';
                for (let id of this.sorted(data)) {
                    var nameUser = await Users.getNameUser(id);
                    msg += `Top ${i++}\n👤 Tên: ${nameUser}\n💬 Số tin nhắn: ${data[id]}\n🏆 Rank: ${(this.checkRank(data[id]) || {}).name || 'Đồng'}\n\n`;
                }
                return api.sendMessage({ body: `️🎉 ${name} ️🎉\n────────────────\n ${msg} ===𝐋𝐮̛𝐮 𝐘́===\n────────────────\n📌 Nếu bạn muốn lọc nhanh hãy reply tin nhắn này và ghi chữ 'auto'\n📌 Dùng 'checktt reset' để làm mới tương tác`, attachment: await this.randomImg() }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        thread: event.threadID,
                        type: "checktt",
                        data: data
                    })
                }, event.messageID);
            }
            case "reset": {
                if ((await api.getThreadInfo(event.threadID)).adminIDs.find(item => item.id == event.senderID) || global.config.ADMINBOT.includes(event.senderID)) {
                    for (let id in dataRank[event.threadID]) {
                        dataRank[event.threadID][id] = 0;
                    }
                    return api.sendMessage("Đã reset thành công !", event.threadID);
                }
                else return api.sendMessage("Bạn phải là quản trị viên nhóm mới được reset !", event.threadID);
            }
            default: {
                let idCheck;
                idCheck = isNaN(String(args[0])) ? "message_reply" === event.type ? event.messageReply.senderID : event.mentions[0] || event.senderID : args[0];
                const name = await Users.getNameUser(idCheck);
                const data = dataRank[event.threadID];
                const count = data[idCheck] || 0;
                const rank = this.checkRank(count);

                const generateMessage = () => {
                    return `👤 𝐓𝐞̂𝐧: ${name}\n💬 𝐒𝐨̂́ 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧: ${count}\n🏆 𝐗𝐞̂́𝐩 𝐡𝐚̣𝐧𝐠: ${(rank || {}).name || 'Đồng'}\n⏲ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${time}\n`;
                };
                await api.sendMessage({ body: generateMessage()}, event.threadID);
            }
        }
    }
    async handleEvent({ api, event }) {
        if (event.type == "message" && event.senderID != api.getCurrentUserID()) {
            if (!dataRank.hasOwnProperty(event.threadID)) {
                dataRank[event.threadID] = {};
                for (let id of event.participantIDs) {
                    if (id == api.getCurrentUserID()) continue;
                    dataRank[event.threadID][id] = 0;
                }
            }
            else if (!event.senderID in dataRank[event.threadID]) {
                dataRank[event.threadID][event.senderID] += 1;
            }
            else {
                dataRank[event.threadID][event.senderID] += 1;
            }
            fs.writeFileSync(__dirname + "/checktt/checktt.json", JSON.stringify(dataRank, null, 4));
        }
    }
    async handleReply({ api, event, handleReply, Threads }) {
        if ((await api.getThreadInfo(event.threadID)).adminIDs.find(item => item.id == event.senderID)) {
            if ((await api.getThreadInfo(event.threadID)).adminIDs.find(item => item.id == api.getCurrentUserID())) {
                switch (handleReply.type) {
                    case "checktt": {
                        switch (event.body.toLowerCase()) {
                            case "auto": {
                                return api.sendMessage(`Nhập số lượng tin nhắn tối thiểu để lọc!`, event.threadID, (err, info) => {
                                    global.client.handleReply.push({
                                        name: this.config.name,
                                        messageID: info.messageID,
                                        author: event.senderID,
                                        thread: event.threadID,
                                        type: "autofilter",
                                        data: handleReply.data
                                    })
                                }, event.messageID);
                            }
                            default: {
                                const data = Object.keys(handleReply.data);
                                const Number = event.body.split(" ") || event.body;
                                console.log(Number)
                                for (var i = 0; i < Number.length; i++) {
                                    if (isNaN(Number[i])) return api.sendMessage("Số lượng không hợp lệ!", event.threadID, event.messageID);
                                    const id = data[parseInt(Number[i]) - 1];
                                    try {
                                        if (id == api.getCurrentUserID()) continue;
                                        await api.removeUserFromGroup(id, handleReply.thread);
                                    } catch (error) {
                                        return api.sendMessage("Không thể kick thành viên có ID: " + id, event.threadID, event.messageID);
                                    }
                                }
                                api.sendMessage("Đã kick thành viên!", event.threadID, event.messageID);
                            }
                        }
                    }
                        break;
                    case "autofilter": {
                        const data = this.sorted(handleReply.data);
                        const count = parseInt(event.body);
                        if (isNaN(count)) return api.sendMessage("Số lượng không hợp lệ!", event.threadID, event.messageID);
                        for (let id of data) {
                            if (id == api.getCurrentUserID()) continue;
                            if (handleReply.data[id] < count) {
                                try {
                                    await api.removeUserFromGroup(id, handleReply.thread);
                                    api.sendMessage("Đã kick thành viên có ID: " + id, event.threadID, event.messageID);
                                } catch (error) {
                                    return api.sendMessage("Không thể kick thành viên có ID: " + id, event.threadID, event.messageID);
                                }
                            }
                        }
                    }
                }
            } else {
                return api.sendMessage("Bot không phải quản trị viên nhóm", event.threadID);
            }
        }
        else {
            return api.sendMessage("Bạn phải là quản trị viên nhóm mới được kick người khác !", event.threadID);
        }
    }
}
module.exports = new Modules();