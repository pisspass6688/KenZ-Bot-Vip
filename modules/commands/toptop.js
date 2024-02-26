module.exports.config = {
	name:"toptop",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Nguyễn Phụ Mạnh",
	description: "Random video tiktok gái",
	commandCategory: "Dành cho thành viên",
	cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://randomlinkapi-1.lucky2000.repl.co/videogai').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
            body: `Ngắm gái đi ae 🖤`,
						attachment: fs.createReadStream(__dirname + `/cache/top.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/top.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/top.${ext}`)).on("close", callback);
			})
}