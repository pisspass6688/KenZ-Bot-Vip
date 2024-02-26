const axios = require('axios');
class Module {
    get config() {
        return {
            name: "goibot",
            description: "Bot sẽ trả lời khi bạn gọi!",
            version: "1.0.0",
            credits: 'Nguyễn Phụ Mạnh',
            hasPermssion: 2,
            commandCategory: "Tự động",
            usages: "game",
            cooldowns: 5
        }
    }
    run() { }
    getAskedResponse(text) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: 'https://gngdxl-8080.csb.app/sim',
                headers: {
                    'Content-Type': 'application-json',
                },
                params: {
                    text: text,
                    lc: 'vn'
                }
            }).then(({ data }) => {
                resolve(data.success);
            }).catch(err => reject(err));
        });
    }
    async handleEvent({ api, event }) {
        if (event.body.toLowerCase().indexOf("bot") == 0 && event.senderID !== api.getCurrentUserID()) {
            return api.sendMessage(`===『A𝙞ㅤ𝙜ọ𝙞ㅤ𝙗𝙤𝙩ㅤ𝙩𝙝ế?』===\n━━━━━━━━━━━━━━━━━\n   𝓑é 𝓷𝓰𝓱𝓮 𝓷è `, event.threadID, async (err, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    type: "reply",
                });
            }, event.messageID);
        }
    }
    async handleReply({ api, event, handleReply }) {
        switch (handleReply.type) {
            case "reply": {
                const response = await this.getAskedResponse(event.body);
                return api.sendMessage(response, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        type: "reply"
                    });
                }, event.messageID);
            }
        }
    }
}
module.exports = new Module();