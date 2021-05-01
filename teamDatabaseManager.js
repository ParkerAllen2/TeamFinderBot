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
 * discord.message, string, string
 */
async function addTeam(message, roles, description) {
  last = await teamDB.get(message.author.username);
  await teamDB.set(message.author.username, [roles, description, true])
  
  if (last != null && last[2] == false) {
    await writeMembersMessage(message);
  }
  await writeTeamMessage(message);
    
  message.reply("**Updated**").then(m => {
    m.delete({ timeout: 10000 })
  }).catch();
}

/*
 * discord.message
 */
async function writeTeamMessage(message) {
  msg = await message.channel.messages.fetch(guilds[message.guild.id][0]);
  data = [];
  data.push(`Teams Looking For Members:`);
  let keys = await teamDB.list();

  for(k in keys) {
    value = await teamDB.get(keys[k]);
    if (value[2])
      data.push(`\`\`\`${keys[k]} is looking for: ${value[0]}\n${value[1]}\`\`\``);
  }
  data.push(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`);
  return msg.edit(data);
}

/*
 * discord.message, string, string
 */
async function addMember(message, roles, description) {
  last = await teamDB.get(message.author.username);
  await teamDB.set(message.author.username, [roles, description, false])
  
  if (last != null && last[2] == true) {
    await writeTeamMessage(message);
  }
  await writeMembersMessage(message);
    
  message.reply("**Updated**").then(m => {
    m.delete({ timeout: 10000 })
  }).catch();
}

/*
 * discord.message
 */
async function writeMembersMessage(message) {
  msg = await message.channel.messages.fetch(guilds[message.guild.id][1]);
  data = [];
  data.push(`People Looking To Join A Team:`);
  let keys = await teamDB.list();

  for(k in keys) {
    value = await teamDB.get(keys[k]);
    if (!value[2])
      data.push(`\`\`\`${keys[k]}: ${value[0]}\n${value[1]}\`\`\``);
  }
  return msg.edit(data);
}

/*
 * deletes a key,value pair of given message's author
 */
async function deleteAuthor(message) {
  author = message.author.username;
  const value = await teamDB.get(author);
  if(value == null) return;

  await teamDB.delete(author);
  if(value[2]) {
    return writeTeamMessage(message);
  }
  writeMembersMessage(message);
}

/*
 * clears database then rewrites messages
 */
async function clear() {
  const keys = await teamDB.list();
  for(k in keys) {
    await teamDB.delete(keys[k]);
  }
  msg.reply(`Database cleared ${keys.length} keys`)
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

module.exports = { addTeam, writeTeamMessage, addMember, writeMembersMessage, deleteAuthor, clear, addNewGuild };