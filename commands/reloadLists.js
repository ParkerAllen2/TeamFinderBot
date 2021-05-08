const dbManager = require('../teamDatabaseManager.js');
module.exports = {
  name: 'reload',
  aliases: ['refresh'],
  description: 'reloads the list of teams and people looking for teams',
  permission: true,
  args: false,
  usage: '',
  example: '',
  cooldown: 5,
  execute(msg, args) {
    msg.delete({ timeout: 5000 });
  }
};