const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const kanallar = require('./kanallar.json');
const roller = require('./roller.json')
const chalk = require('chalk');
const moment = require('moment');
const mmmonet = require("moment-duration-format")
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
const ms = require('ms');
const { monthsShort } = require('moment');

var prefix = config.prefix


require('./util/eventLoader.js')(client);


const log = message => {
console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./Events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./Events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

fs.readdir('./lorekomutlar/', (err, files) => { 
    if (err) console.error(err);
    log(`${files.length} Komut.`);
    files.forEach(f => {
        let props = require(`./lorekomutlar/${f}`);
        log(`${props.help.name} Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./lorekomutlar/${command}`)];
            let cmd = require(`./lorekomutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./lorekomutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./lorekomutlar/${command}`)];
            let cmd = require(`./lorekomutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.owner) permlvl = 4;
    return permlvl;
}
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"link") {
      [message.channel.send(""+ config.Link +"")]
  }
})

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"tag") {
      [message.channel.send("\`"+ config.tag +"\`")]
  }
})


client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() === ""+config.prefix+"tag") {
    [message.channel.send("\`"+ config.etikettag +"\`")]
  }
})


client.on("ready", async() => {
    let botvoicechannel = client.channels.cache.get(kanallar.BotVoiceChannel);
    if(botvoicechannel) botvoicechannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı"));
})



    //////////////////////AFK
 
    //////////////////////AFK





//////

const kiltifat = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Zara seni çok sevdi...',
    'Mucizelerden bahsediyordum.',
];
client.on("message", async message => {
  if(message.channel.id !== (config.chatkanalı)) return;
  let Knavedev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Knavedev >= 60) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
    message.reply(`${(kiltifat)[random]}`);
  };
});









  


  //----------------------TAG-KONTROL----------------------\\        

client.on("guildMemberAdd", member => {
    let sunucuid = "798591090797445140"; //Buraya sunucunuzun IDsini yazın
    let tag = "Rést"; //Buraya tagınızı yazın
    let rol = "825768087864213524"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
    let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == '⍒│tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
        .setTimestamp()
       client.channels.cache.get('825768216655167528').send(tagalma)
  }
  })

/////////////reklam engel ///////////////

  client.on("message", msg => {
    if(!db.has(`reklam_${msg.guild.id}`)) return;
           const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                       return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda reklam filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
    
     msg.delete(3000);                              
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
//////////kufur engel 


client.on("message", async msg => {
  
  
    const i = await db.fetch(`kufur_${msg.guild.id}`)
       if (i == "acik") {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
           if (kufur.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("BAN_MEMBERS")) {
                     msg.delete();
                             
                         return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });
   
   client.on("messageUpdate", (oldMessage, newMessage) => {
     
     
    const i = db.fetch(`${oldMessage.guild.id}.kufur`)
       if (i) {
           const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
           if (kufur.some(word => newMessage.content.includes(word))) {
             try {
               if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                     oldMessage.delete();
                             
                         return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
     
               }              
             } catch(err) {
               console.log(err);
             }
           }
       }
       if (!i) return;
   });

   //////////kufur engel bitis




//------------------------------------------------------------------------------------------------------------\\




  
client.on("userUpdate", async function(oldUser, newUser) {
  const guildID = "786477463940497449"//sunucu
  const roleID = "806589780368031795"//taglırolü
  const tag = "1928"//tag
  const chat = '822209025746665493'// chat
  const log2 = '815326900448526347' // log kanalı

  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp();
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`${tag}\` çıakrtarak ailemizden ayrıldı!`))
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(chat).send(`Yuppii :tada:, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`${tag}\` alarak ailemize katıldı`))
      }
  }
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == "1928" && newUser.discriminator !== "1928") {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`1928\` çıakrtarak ailemizden ayrıldı!`))
      } else if (oldUser.discriminator !== "1928" && newUser.discriminator == "1928") {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketine \`1928\` alarak ailemize katıldı`))
          client.channels.cache.get(chat).send(`Yuppii :tada:, ${newUser} Ailemizin Bir Parçası Oldu Sıcak Karşılayın`)
      }
  }

})

  //--------------------------------------------------------------------------------------\\
  

 


  ////////


//AFK SİSTEMİ//

function afkSil(message, afk, isim) {
  let süre = db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
  let timeObj = ms(Date.now() - süre);
  message.channel.send(`${message.author} Artık **AFK** değilsin aramıza tekrar hoşgeldin`).then(m => {
    m.delete({timeout:10000})
  });
  db.delete(`afkSebep_${afk.id}_${message.guild.id}`)
  db.delete(`afkid_${afk.id}_${message.guild.id}`)
  db.delete(`afkAd_${afk.id}_${message.guild.id}`)
  db.delete(`afk_süre_${afk.id}_${message.guild.id}`)
  message.member.setNickname(isim)
};

client.on("message" , async message => {
  let aiasembed = new Discord.MessageEmbed().setFooter("Cyber 🖤 Lore").setTimestamp().setColor("RANDOM")
  if (message.author.bot) return;
  if (!message.guild) return;
  var fd = false
  var sdd = new Set();
  let afk = message.mentions.users
  if (afk.first()) {
    afk.forEach(async afk => {
      if (sdd.has(afk.id)) return;
      else sdd.add(afk.id)
      var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
      var kisi2 = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
      if (kisi) {
        var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
        if (kisi2) {
          fd = true
          afkSil(message, message.member, isim)
        }
        if (afk.id == message.member.id) {
          if (!fd) afkSil(message, afk, isim)
        }
        if (afk.id !== message.member.id) {
          var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
          if (sebep) {
            let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
            let timeObj = ms(Date.now() - süre);
            message.channel.send(aiasembed.setDescription(`${afk} Şuanda __${sebep}__ Sebebiyle **AFK**`)).then(m => {
              m.delete({timeout:10000})
            });
          };
        }
      } else {
        afk = message.member
        kisi = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
        if (kisi) {
          var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
          if (afk.id == message.member.id) {
            afkSil(message, afk, isim)
          }
          if (afk.id !== message.member.id) {
            var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
            if (message.content.includes(kisi)) {
              if (sebep) {
                let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
                let timeObj = ms(Date.now() - süre);
                message.channel.send(aiasembed.setDescription(`${afk} Şuanda __${sebep}__ Sebebiyle **AFK**`)).then(m => {
                  m.delete({timeout:10000})
                });
              };
            }
          }
        }
      }
    })
  } else {
    afk = message.member
    var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
    if (!kisi) return;
    var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
    afkSil(message, afk, isim)
  }
});

  
  //------------------------------------------------------------------------------------------------------------\\
  //client.on("guildMemberAdd", member => {  
    //const lorewebhook = new Discord.WebhookClient('815337175289298974', 'S6gEeKvK5yYRpjeTSTQCJRiDXUq0fVN8oRoQx1DXF-oCAl3_zT3HwXGxX_KzkCi7jANl')
      
      //let user = client.users.cache.get(member.id);
   //   require("moment-duration-format");
      //  const kurulus = new Date().getTime() - user.createdAt.getTime();  
   // const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
     
  
    //moment.locale("tr");
   // lorewebhook.send(":tada: **Râte'ye hoş geldin** <@" + member + "> <a:1945_tag2:806652233949118465>\n\n<@&815326518397632553> rolüne sahip yetkililer senin ile ilgilenecektir. <a:1945_tag2:806652233949118465>\n\n **Hesabın \`"+ gecen +"\` Önce Oluşturulmuş** <a:1945_tag2:806652233949118465>\n\nSunucu kurallarımız <#815326790167035956> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek. <a:1945_tag2:806652233949118465>\n\nsunucumuzun \`" + member.guild.memberCount + "\` üyesi olmanı sağladı! İyi eğlenceler. <a:1945_tag2:806652233949118465>");
  //  member.setNickname(` İsim | Yaş`);
  //  });

//////
 


/////ayarlamalı sözcuk filtr
client.login(config.token)