const {admin} = require('../config.json');
module.exports = {
  name: 'delteMessages',
  aliases: ['delm'],
  description: 'example',
  args: true,
  usage: '<numberOfMessages>',
  cooldown: 5,
  execute(msg, args) {
    if(!msg.member.roles.cache.some(role => role.name === admin)) {
      return msg.reply("No Permission");
    }

    amount = Math.min(args[0], 99) + 1;
    msg.channel.bulkDelete(amount, true);
    msg.reply(`Deleted ${amount - 1} messages`).then(m => {
      m.delete({ timeout: 3000 })
    })

  }
};