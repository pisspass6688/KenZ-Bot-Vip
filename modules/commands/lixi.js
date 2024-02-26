module.exports.config = {
    name: "lixi",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "Horizon Lucius Synthesis I",
    description: "Lì Xì",
    commandCategory: "Dành cho admin bot",
    usages: "",
    cooldowns: 5
    };
    var array = [];
    module.exports.run = async function ({ api,event,Users,Currencies,args }) {
    var x = global.data.allCurrenciesID;var out = (msg) => api.sendMessage(msg,event.threadID,event.messageID);
        let ix = Math.floor(Math.random() * 100000000) + 1000000000; 
                let rxxi = global.data.allThreadID;var xs = false;
                    var mention = Object.keys(event.mentions);
                    switch (args[0]) {
                        case 'all': {
                            if (xs == true) return out("Lì xì r");
                            for (let ex of x) {
                                await Currencies.increaseMoney(ex, parseInt(ix));
                                    array.push(ex);
                            }
                            for (let exs of rxxi) {
                                api.sendMessage("𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨: 𝐍𝐡𝐨́𝐦 𝐁𝐚̣𝐧 đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐀𝐝𝐦𝐢𝐧 𝐋𝐢̀ 𝐗𝐢̀, 𝐂𝐡𝐮́𝐜 𝐂𝐚́𝐜 𝐁𝐚̣𝐧 𝟏 𝐧𝐠𝐚̀𝐲 𝐯𝐮𝐢 𝐯𝐞̉\n𝐍𝐨́ 𝐬𝐞̃ + 𝐧𝐠𝐚̂̃𝐮 𝐧𝐡𝐢𝐞̂𝐧 𝐧𝐡𝐚 𝐭𝐮̛̣ 𝐱𝐞𝐦 𝐛𝐚̆̀𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 /𝐦𝐨𝐧𝐞𝐲",exs,(error,info) => {
                                    if (error) return;
                                });
                            }
                                xs = true;
                            return api.sendMessage("Thành Công !",event.threadID);
                        }
                            break;
                        case "user": {
                            if (xs == true) return out("Lì xì r");if(array.includes(args[1])) return out("𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐚̀𝐲 đ𝐚̃ 𝐝𝐮̛𝐨̛̣𝐜 𝐥𝐢̀ 𝐱𝐢̀");array.push(args[1]);
                            if (isNaN(args[1])) return api.sendMessage("𝐕𝐮𝐢 𝐋𝐨̀𝐧𝐠 𝐍𝐡𝐚̣̂𝐩 𝐈𝐃 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 !",event.threadID,event.messageID);
                                await Currencies.increaseMoney(parseInt(args[1]), parseInt(ix));
                                    out("Đã Lì Xì Thành Công !");
                                        return api.sendMessage("𝐁𝐚̣𝐧 đ𝐮̛𝐨̛̣𝐜 𝐥𝐢̀ 𝐱𝐢̀ 𝐤𝐢̀𝐚 , 𝐜𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝐦𝐚𝐲 𝐦𝐚̆́𝐧 𝐧𝐡𝐞́, 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐧 𝐝𝐮̛𝐨̛̣𝐜 𝐥𝐚̀ : " +  ix,parseInt(args[1]));
                        }
                            break;
                        case "thread": {
                            if (isNaN(args[1])) return api.sendMessage("𝐕𝐮𝐢 𝐋𝐨̀𝐧𝐠 𝐍𝐡𝐚̣̂𝐩 𝐈𝐃 𝐍𝐡𝐨́𝐦 !",event.threadID,event.messageID);
                                var xl = await api.getThreadInfo(args[1]);
                                    var sll = xl.participantIDs;var outlix = [];
                                        for (let cham of sll) {
                                                if(array.includes(cham)) return outlix.push(cham);
                                            await Currencies.increaseMoney(cham, parseInt(ix)); 
                                        }
                                    out("𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 !, 𝐒𝐨̂́ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐊𝐨 𝐃𝐮̛𝐨̛̣𝐜 𝐋𝐢̀ 𝐗𝐢̀ 𝐋𝐚̂̀𝐧 𝟐 𝐋𝐚̀ : " + outlix.join(", "));
                                return api.sendMessage("𝐍𝐡𝐨́𝐦 𝐦𝐢̀𝐧𝐡 𝐭𝐚̂́𝐭 𝐜𝐚̉ 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 đ𝐮̛𝐨̛̣𝐜 𝐋𝐢̀ 𝐗𝐢̀ 𝐊𝐢̀𝐚",parseInt(args[1]));
                        }   
                            break;  
                        case  `${mention[0]}`: {    
                            if (isNaN(mention[0])) return out("𝐓𝐚𝐠 𝐬𝐚𝐢 𝐫𝐨̂̀𝐢 𝐤𝐢𝐚 𝐜𝐡𝐮̉ 𝐧𝐡𝐚̂𝐧");array.push(mention[0]);
                            if(array.includes(mention[0])) return out("𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐚̀𝐲 đ𝐚̃ 𝐝𝐮̛𝐨̛̣𝐜 𝐥𝐢̀ 𝐱𝐢̀");
                                else await Currencies.increaseMoney(mention[0], parseInt(ix)); 
                                    return out ("UwU " + event.mentions[mention].replace("@", "") + " 𝐁𝐚̣𝐧 đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐥𝐢̀ 𝐱𝐢̀ 𝐤𝐢̀𝐚, 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐥𝐚̀ :  " + ix);
                        }
                    break;
                default: {
                        if(array.includes(event.senderID)) return out("𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐚̀𝐲 đ𝐚̃ 𝐝𝐮̛𝐨̛̣𝐜 𝐥𝐢̀ 𝐱𝐢̀");array.push(event.senderID);
                    await Currencies.increaseMoney(event.senderID, parseInt(ix)); 
                return out("𝐍𝐡𝐚̣̂𝐧 𝐋𝐢̀ 𝐗𝐢̀ 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 !, 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐥𝐚̀ : " + ix);
            }
        }
    };