const Discord = require('discord.js');
const { roles } = require('../config.json');
module.exports = {
  name: 'listr',
  aliases: ['roles', 'lsr'],
  description: 'List the roles and their aliases that lookingForTeam checks for',
  permission: false,
  args: false,
  usage: '',
  example: '',
  cooldown: 5,
  execute(msg, args) {
    msg.delete({ timeout: 5000 });
    
    const embed = new Discord.MessageEmbed()
    .setColor('#cc66dd')
    .setTitle("Roles");

    for(r in roles) {
      n = `${roles[r].name} aliases:`;
      v = roles[r].aliases.join(", ");
      embed.addField(n, v);
    }

    msg.channel.send(embed)
      .then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
};