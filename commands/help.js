const { admin } = require('../config.json');
const helpWriter= require('../helpWriter.js');
module.exports = {
	name: 'help',
  aliases: ['commands'],
	description: 'List all of my commands or info about a specific command.',
	usage: '',
  example: '',
  permission: false,
  cooldown: 5,
	execute(msg, args) {
    msg.delete({ timeout: 5000 });
    
		hasPermission = msg.member.roles.cache.some(role => role.name === admin);
    msg.channel.send(helpWriter.getEmbed(hasPermission)).then(m => {
      m.delete({ timeout: 10000 });
    });
	}
};