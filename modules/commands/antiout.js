module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "Nguyễn Phụ Mạnh",
    hasPermssion: 1,
    description: "Bật tắt chế độ giữ người ở lại",
    usages: "antiout on/off",
    commandCategory: "Dành cho qtv box",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`⇾ Kích hoạt antiout : ${(data["antiout"] == true) ? "Giữ" : "Không giữ"} `, event.threadID);
	}