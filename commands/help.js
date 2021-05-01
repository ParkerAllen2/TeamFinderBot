const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
  aliases: ['commands'],
	description: 'List all of my commands or info about a specific command.',
	usage: '<command name>',
  cooldown: 5,
	execute(message, args) {
		const data =[];
    const {commands} = message.client;

    if(!args.length){
      data.push('Here\'s a list of all commands:');
      data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command`);
      
      data.push(`\`\`\`` + "Name:".padEnd(16) + "Usage:")
      data.push(commands.map(getCommandDescritpion).join(""));
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

function getCommandDescritpion(item) {
  var colLength = 16;
  var rtn = `${item.name.padEnd(colLength, ' ')}${prefix}${item.name} ${item.usage}\n`;
  return rtn;
}