const fs = require('fs');
const fileName = './config.json';
const Discord = require('discord.js');

const helpEmbed = new Discord.MessageEmbed()
.setColor('#a015cf');

const adminHelpEmbed = new Discord.MessageEmbed()
.setColor('#a015cf');

function getEmbed(hasPermission){
  if(hasPermission) return adminHelpEmbed;
  return helpEmbed;
}

function writeHowTo(){
  helpEmbed.setTitle("How To Use:")
  .setDescription("If you need help, ask in \#general-help\nBlue = Teams looking for people\nPink = People looking of a Team");
}

function getCommandDescritpion(item, prefix) {
  name = `${prefix}${item.name} ${item.usage}`;
  value = `${item.description}\nEx. ${prefix}${item.name} ${item.example}`;
  if(!item.permission) {
    helpEmbed.addField(name, value);
  }
  adminHelpEmbed.addField(name, value);
}

async function updateHowTo(message){
  let file = JSON.parse(fs.readFileSync(fileName));
  const {commands} = message.client;

  mid = await message.channel.send(helpEmbed)
        
  guilds = file.guilds;
  await deletePrevious(message, guilds)
  guilds[message.guild.id] = [mid.id];
  file.guilds = guilds;

  fs.writeFile(fileName, JSON.stringify(file, null, 2), err => {console.error});
}

async function deletePrevious(message, guilds) {
  try{
    msg = await message.channel.messages.fetch(guilds[message.guild.id][0]);
    return msg.delete();
  } catch(error){
    return;
  }
}

module.exports = { getEmbed, writeHowTo, getCommandDescritpion, updateHowTo };