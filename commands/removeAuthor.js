const dbManager = require('../teamDatabaseManager.js');
module.exports = {
  name: 'found',
  aliases: ['rm', 'remove'],
  description: 'Use this when you found a team or your team was filled to remove the message',
  permission: false,
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    dbManager.deleteAuthor(msg).then( () => {
      msg.channel.send("**Removed**").then(m => {
        m.delete({ timeout: 10000 })
      }).catch();
    });
  }
};