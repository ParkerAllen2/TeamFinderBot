const dbManager = require('../teamDatabaseManager.js');
module.exports = {
  name: 'cleardb',
  aliases: [],
  description: 'clears the database',
  permission: true,
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    dbManager.clear().then(() => {
      dbManager.writeTeamMessage(msg).then( () => {
        dbManager.writeMembersMessage(msg);
      });
    });
  }
};