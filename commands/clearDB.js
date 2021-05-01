const dbManager = require('../teamDatabaseManager.js');
const {admin} = require('../config.json');
module.exports = {
  name: 'clearDB',
  aliases: ['cleardb', 'clear'],
  description: 'example',
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    if(!msg.member.roles.cache.some(role => role.name === admin)) {
      return msg.reply("No Permission");
    }
    dbManager.clear().then(() => {
      dbManager.writeTeamMessage(msg).then( () => {
        dbManager.writeMembersMessage(msg);
      });
    });
  }
};