const fs = require('fs');
const fileName = './config.json';
const dbManager = require('../teamDatabaseManager.js');

module.exports = {
  name: 'setup',
  aliases: [],
  description: 'example',
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    let file = JSON.parse(fs.readFileSync(fileName));
    if(!msg.member.roles.cache.some(role => role.name === file.admin)) return;

    msg.channel.send('teams').then(sentTeam => {
      msg.channel.send('members').then(sentMember => {
        
        guilds = file.guilds;
        guilds[msg.guild.id] = [sentTeam.id, sentMember.id];
        file.guilds = guilds;

        fs.writeFile(fileName, JSON.stringify(file, null, 2), err => {console.error});
        dbManager.addNewGuild(guilds);
        dbManager.writeTeamMessage(sentTeam).then( () => {
          dbManager.writeMembersMessage(sentMember);
        });
        
        msg.reply(`Initialization complete`)
        .then(m => {
          m.delete({ timeout: 10000 });
        });

      });
    });
  }
};