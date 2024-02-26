module.exports.config = {
	name: "seticon",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "bao",
	description: "Đổi emoji trong nhóm",
	commandCategory: "Dành cho qtv box",
	usages: "setemoji [emoji]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const emoji = args.join(" ")
	api.changeThreadEmoji(`${args.join(" ")}`, event.threadID, event.messagaID);
}