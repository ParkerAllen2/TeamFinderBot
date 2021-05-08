const dbManager = require('../teamDatabaseManager.js');
module.exports = {
  name: 'cleardb',
  aliases: [],
  description: 'clears the database',
  permission: true,
  args: false,
  usage: '',
  example: '',
  cooldown: 5,
  execute(msg, args) {
    msg.delete({ timeout: 5000 });
    dbManager.clear(msg)
  }
};