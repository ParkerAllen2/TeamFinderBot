const { prefix, admin } = require('../config.json');
const COL_LENGTH = 12;
module.exports = {
	name: 'help',
  aliases: ['commands'],
	description: 'List all of my commands or info about a specific command.',
	usage: '<command name>',
  permission: false,
  cooldown: 5,
	execute(message, args) {
		const data =[];
    const {commands} = message.client;

    if(!args.length){
      data.push('Here\'s a list of all commands:');
      data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command`);

      hasPermission = message.member.roles.cache.some(role => role.name === admin);
      data.push(`\`\`\`` + "Name:".padEnd(COL_LENGTH + 1) + "Description:")
      data.push(commands.map(c => getCommandDescritpion(c, hasPermission)).join(""));
      data.push(`\`\`\``);
      
      return message.channel.send(data)
          .then(m => {
          m.delete({ timeout: 20000 })
        }).catch();
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name);

    if (!command) {
      return message.channel.send(`${prefix}${name} is not a valid command`)
          .then(m => {
          m.delete({ timeout: 10000 })
        }).catch();
    }

    data.push(`Name: ${command.name}`);
    if(command.aliases)
      data.push(`Aliases: ${command.aliases.join(', ')}`);

    if(command.description)
      data.push(`Description: ${command.description}`);

    if(command.usage)
      data.push(`Usage: ${prefix}${command.name} ${command.usage}`);
    
    data.push(`Cooldown: ${command.cooldown || 3} second(s)`);

    message.channel.send(data)
          .then(m => {
          m.delete({ timeout: 20000 })
        }).catch();
	}
};

function getCommandDescritpion(item, hasPermission) {
  if(item.permission && !hasPermission) {
    return;
  }
  rtn = `${prefix}${item.name.padEnd(COL_LENGTH, ' ')}${item.description}\n` + 
  `${' '.padEnd(COL_LENGTH, ' ')} Ex. ${prefix}${item.name} ${item.usage}\n\n`;
  return rtn;
}