const dbManager = require('../teamDatabaseManager.js');
module.exports = {
  name: 'found',
  aliases: ['rm', 'remove'],
  description: 'example',
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    dbManager.deleteAuthor(msg).then( () => {
      msg.reply("**Removed**").then(m => {
        m.delete({ timeout: 10000 })
      }).catch();
    });
  }
};