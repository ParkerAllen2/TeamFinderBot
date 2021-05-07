const Discord = require('discord.js');
const Database = require("@replit/database");
let { guilds } = require('./config.json');  //[0, 1] = teams, members
const teamDB = new Database();
/*
 * <lookm junior artist this is here
 * <lookt here is this
 * 
 * Bugs:
 * 
 */

/*
 * Delete previous message
 * Write new message
 * Set new info
 */
async function writeTeam(message, roles, description, isTeam) {
  await deletePrevious(message);

  color = (isTeam) ? '#499bf2' : '#ff77a1';
  const embed = new Discord.MessageEmbed()
  .setColor(color)
  .setAuthor(message.author.username)
	.setTitle(roles)
  .setDescription(description)
  .setTimestamp();

  message.channel.send(embed).then(m => {
    teamDB.set(message.author.id, [m.id, Math.floor(Date.now() / 1000), roles, description, isTeam]);
  });
}

/*
 * Get message id
 * fetch message
 * delete message
 */
async function deletePrevious(message) {
  author = message.author.id;
  value = await teamDB.get(author);
  if(value == null)
    return;
  message.channel.messages.fetch(value[0])
  .then( msg  => msg.delete)
  .catch();
}

/*
 * deletes a key,value pair of given message's author
 */
async function deleteTeam(message, id) {
  await deletePrevious(message);
  await teamDB.delete(id);
}

/*
 * clears database then rewrites messages
 */
async function clear() {
  const keys = await teamDB.list();
  for(k in keys) {
    await teamDB.delete(keys[k]);
  }
  msg.channel.send(`Database cleared ${keys.length} keys`)
  .then(m => {
    m.delete({ timeout: 10000 })
  }).catch();
}

/*
 * Resets guild values since require is not asynchronus
 */
function addNewGuild(newGuilds) {
  guilds = newGuilds;
}

module.exports = { writeTeam, deleteTeam, clear, addNewGuild };