module.exports.config = {
	name: "delete",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "D-Jukie",
	description: "Xóa tất cả tin nhắn trên acc bot",
	commandCategory: "Dành cho admin bot",
	usages: "[thread/all]",
	cooldowns: 0
};

module.exports.run = function({ api, event, args, getText }) {
if (event.senderID != 100066990987283) return api.sendMessage(`Quyền lồn biên giới!`, event.threadID, event.messageID)
  if (args[0] == "all") {
 return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("Xóa thành công tất cả tin nhắn", event.threadID)
 })
}
else return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("Xóa thành công tất cả tin nhắn nhóm", event.threadID)
 })
}
