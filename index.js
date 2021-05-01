const fs = require('fs');
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const {prefix, admin} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

//Get commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//on ready
client.on('ready', () => {
  console.log('Logged in as '+ client.user.tag + '!');
});

//on message
client.on('message', msg => {
  //check for prfix and author is not a bot
  if(msg.author.bot) return;
  
  msg.delete({ timeout: 5000 });

  if(!msg.content.startsWith(prefix)) return;

  //get command name and arguments
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  //get command
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases.includes(commandName));

  //check for command
  if(!command) return;

  //check for arguments
  if(command.args && !args.length){
    let reply = `Missing arguments for the command: ${command}`;
    
    //add proper usage to reply
    if(command.usage){
      reply += `\nProper usage: \'${prefix}${command.name} ${command.usage}\'`;
    }
    
    return msg.channel.send(reply).then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }

  //add commands to cooldown list
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timeStamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  //check if author already used command
  if(timeStamps.has(msg.author.id)){
    const expirationTime = timeStamps.get(msg.author.id) + cooldownAmount;

    //send message if still on cooldown
    if(now < expirationTime){
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(`Please wait ${timeLeft.toFixed(1)} seconds`);
    }
  }
  //delete timeStamps
  timeStamps.set(msg.author.id, now);
  setTimeout(() => timeStamps.delete(msg.author.id), cooldownAmount);

  //execute command
  try{
    command.execute(msg, args);
  } catch (error){
    console.error(error);
    msg.reply('Ran into a error, try again').then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
})

client.login(process.env['token']);