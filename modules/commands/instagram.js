module.exports.config = {
    name: 'instagram',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tiện ích về Instagram',
    commandCategory: 'Tiện ích',
    usages: '< infouser|image|video|postuser >',
    cooldowns: 2,
    dependencies: {
        'image-downloader': '',
    }
};
     const fs = require("fs");
const {
    image
} = require('image-downloader');
const {
    createReadStream, unlinkSync, mkdirSync, rmdirSync
} = require('fs-extra');
const {
    get
} = require('axios');
const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1: +n;
module.exports.run = async function({
    api, event, args
}) {
    try {
        switch (args[0]) {
            case 'infouser': {
                const res = await get(`https://api-thanhali.thanhali.repl.co/instagram/infouser?ig=${args[1]}`),d=__dirname + '/cache/instagram_.png';
                if(z=res.data[0].name, !!z || z == 'INVALID_USERNAME') return api.sendMessage(`Không tìm thấy thông tin người dùng`, event.threadID, event.messageID);
                api.sendMessage({
                    body: infoUser(res.data[0]), attachment: await stream_(res.data[0].profile_pic_url_hd,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            case 'image': {
                const res = await get(`https://api-thanhali.thanhali.repl.co/instagram/downloadpost?url=${args[1]}`),d=__dirname + '/cache/instagram_.png';
                api.sendMessage({
                    body: infoImage(res.data,true), attachment: await stream_(res.data.display_url,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            case 'video': {
                const res = await get(`https://api-thanhali.thanhali.repl.co/instagram/downloadpost?url=${args[1]}`),d=__dirname + '/cache/instagram_.mp4';
                api.sendMessage({
                    body: infoVideo(res.data,true), attachment: await stream_(res.data.video_url,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            /*case 'searchuser': {
                const res = await get(`https://api-thanhali.thanhali.repl.co/instagram/searchig?ig=${args[1]}`);
                runSearchUser(api, event, res.data.users, 6, +args[2]||0x2-1);
            }; break;*/
            case 'postuser': {
                const res = await get(`https://api-thanhali.thanhali.repl.co/instagram/postuser?username=${args[1]}`);
                runPostUser(api, event, res.data.data.user, 6, +args[2]||0x1,true,event.senderID);
            }; break;
            default: api.sendMessage({body :`==== 𝐇𝐔̛𝐎̛́𝐍𝐆 𝐃𝐀̂̃𝐍 ====\n\n- instagram infouser < tên người dùng >: Xem thông tin người dùng\n- instagram image < sao chép liên kết >: Tải ảnh\n- instagram video < sao chép liên kết >: Tải video\n- instagram postuser < tên người dùng >: Xem những bài đăng của người dùng`,attachment: fs.createReadStream(__dirname + `/cache/str.png`) }, event.threadID,event.messageID);
            };
        }catch(err) {
            api.sendMessage(`${err}`, event.threadID, event.messageID)
        };
    };
    module.exports.handleReply = async function({
        handleReply: $, api, event
    }){
        try {
      if(event.senderID != $.author) return;
     if ($.case == 'searchUser') if(['trang', 'list'].includes(event.args[0].toLowerCase())) runSearchUser(api, event, $.data, 6, +event.args[1],$.type,$.author); else return api.sendMessage(`Phản hồi < trang + STT | list + STT >`, event.threadID, event.messageID);
     if ($.case == 'post') if (['trang', 'list'].includes(event.args[0].toLowerCase())) runPostUser(api, event, $.data, 6, event.args[1]); else if(isFinite(event.args[0])) {
         const {node={}}=$.data[$.type?'edge_felix_video_timeline':'edge_owner_to_timeline_media'].edges[event.args[0]-0x1],d=__dirname + `/cache/instagram_.${$.type?'mp4':'jpg'}`;
         api.sendMessage({
         body: $.type?infoVideo(node,false):infoImage(node,false), attachment: await stream_(node[$.type?'video_url':'display_url'],d)
     }, event.threadID, ()=>unlinkSync(d),event.messageID)
     };
        }catch(err){
            api.sendMessage(`${err}`, event.threadID, event.messageID);
        };
    };
    module.exports.handleReaction = function({
        handleReaction: $, api, event
    }){
      if (event.userID!=$.author)return;
      runPostUser(api, event, $.data, 6, 0x2-1, $.type?false:true,$.author);
    };
    async function stream_(url, dest) {
        await image({
            url, dest
        });
        return createReadStream(dest);
    };
    function check(a) {
        return a.replace(/null/g, 'Không có dữ liệu').replace(/false/g, 'Không').replace(/true/g, 'Có').replace(/undefined/g, 'Không xác định');
    };
    function infoUser(a) {
        return check(`- Tên: ${a.full_name}\n- ID: ${a.username}\n- Tiểu sử: ${a.biography}\n- Liên kết: ${a.bio_links.join(', ')}\n- Liên kết ngoài: ${a.external_url}\n- Người theo dõi: ${a.follower_count}\n- Đang theo dõi: ${a.following_count}\n- Số bài đăng: ${a.media_count}\n- Tài khoản riêng tư: ${a.is_private}\n- Xác minh tài khoản: ${a.is_verified}`);
    };
    function infoImage(a,b) {
       return check(`- Tiêu đề: ${x=a.edge_media_to_caption.edges, x.length == 0 ? null: x[0].node.text}\n- Lượt thích: ${a.edge_media_preview_like.count}\n- Lượt bình luận: ${a[!b?'edge_media_to_comment':'edge_media_to_parent_comment'].count}${b?`\n- Tên: ${a.owner.full_name}\n- ID: ${a.owner.username}\n- Người theo dõi: ${a.owner.edge_followed_by.count}`:``}`);
    };
    function infoVideo(a,b) {
        return check(`- Tiêu đề: ${x=a.edge_media_to_caption.edges, x.length == 0 ? null: x[0].node.text}\n- Lượt thích: ${a.edge_media_preview_like.count}\n- Lượt xem: ${a.video_view_count}${b?`\n- Lượt phát video: ${a.video_play_count}\n- Lượt bình luận: ${a.edge_media_to_parent_comment.count}`:``}\n- Thời gian: ${a.video_duration.toFixed()}s${b?`\n- Tên: ${a.owner.full_name}\n- ID: ${a.owner.username}\n- Số người theo dõi: ${a.owner.edge_followed_by.count}`:``}`);
    };
   /* async function runSearchUser(a,b,c,d,e,g){
       var txt = '', i=(d*e)-d,at=new Array(),l=c.length,dir=__dirname+`/cache/instagram_dir_${b.messageID}`;mkdirSync(dir);
       for(;i++<(l<=d*e?l:d*e);){txt += `${i}. ${c[i].user.full_name}\n • UserName: ${c[i].user.username}\n\n`;at.push(await stream_(c[i].user.profile_pic_url,dir+`/instagram_${i}.jpg`));};
       txt += `____\n Trang[${e}/${roof(c.length/d)}]\nReply [trang | list + STT]`; 
       a.sendMessage({body:check(txt),attachment:at}, b.threadID, (err, data) => {global.client.handleReply.push({
           name: 'instagram', messageID: data.messageID, author: b.senderID, data: c, 'case': 'searchUser'
       }) ;rmdirSync(dir, {recursive: true})},b.messageID);
    };*/
 async function runPostUser(a,b,c,d,e,g,h){
       var txt='',i=(d*e)-d,n=c[g?'edge_felix_video_timeline':'edge_owner_to_timeline_media'].edges,l=n.length,iv=g?'video':'image',o,at=[],dir=__dirname+`/cache/instagram_dir_${b.messageID}`;mkdirSync(dir);
       for (;i++<(l<=d*e?l:d*e);) {
       var x=n[i-1].node.edge_media_to_caption.edges||[];
       txt+=`${i}. ${!x||x==0||!x[0].node||!x[0].node.text?null:x[0].node.text}${g?`(${n[i-1].node.video_duration.toFixed()}s)`:``}\n`;at.push(await stream_(n[i-1].node['thumbnail_src'],dir+`/instagram_${i-1}.jpg`));
       };
       txt+=`\nTrang < ${e}/${roof(n.length/d)} >\n\n- Thả cảm xúc để chuyển qua danh sách ${g?'image':'video'}\n- < Phản hồi > + < trang|list + STT > để chuyển tab\n- < Phản hồi + STT > để xem ${iv}`;
       a.sendMessage({body:check(txt),attachment:at}, b.threadID, (err, data) => {
       o={
           name: 'instagram', messageID: data.messageID, author: h, data: c, 'case': 'post', type: g
       }; global.client.handleReply.push(o),global.client.handleReaction.push(o);
       rmdirSync(dir, {recursive: true})
       }, b.messageID);
    };