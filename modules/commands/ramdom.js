module.exports.config = {
	name: "ramdom",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "D-Jukie",
	description: "Khi tặng quà không biết cho ai hãy dùng đến lệnh này",
	commandCategory: "Dành cho qtv box",
	cooldowns: 0
};
module.exports.run = async ({ api, event, args, Users }) => {
	const { threadID, messageID, participantIDs, isGroup } = event;
	const num = parseInt(args[0]) || 1;
	if(isGroup == false) return api.sendMessage('Vui lòng thực hiện lệnh này ở nhóm', threadID, messageID);
	const random = participantIDs.sort(function() {
        return .5 - Math.random();
    });
    const members = [];
    for( let i = 0; i <= num - 1; i++) {
    	var name = (await Users.getData(random[i])).name;
    	members.push(name)
    }
	return api.sendMessage(`Người may mắn là: ${members.join(' ')}`, threadID, messageID);
  }