module.exports.config = {
	name: "doiicon",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "HungCatMoi",
	description: "Đổi Emoji nhóm của bạn",
	commandCategory: "Dành cho qtv box", 
	usages: "boxemoji [name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("Bạn chưa nhập icon🔥🔥", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`🔥 Bot đã đổi thành công icon thành: ${emoji}`, event.threadID, event.messageID));
}