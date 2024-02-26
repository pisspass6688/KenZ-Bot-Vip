module.exports.config = {
	name: "boxname",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "Nguyễn Phụ Mạnh",
	description: "Đổi tên nhóm của bạn",
	commandCategory: "Dành cho qtv box", 
	usages: "boxname [name],dùng để đổi tên box của bạn", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("❌ Bạn chưa nhập tên nhóm muốn đổi", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 Bot đã đổi tên nhóm thành: ${name}`, event.threadID, event.messageID));
}
