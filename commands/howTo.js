const helpWriter= require('../helpWriter.js');
module.exports = {
  name: 'howto',
  aliases: ['start'],
  description: 'List the roles and their aliases that lookingForTeam checks for',
  permission: true,
  args: false,
  usage: '',
  example: '',
  cooldown: 5,
  execute(msg, args) {
    msg.delete({ timeout: 5000 });
    helpWriter.updateHowTo(msg).then(() => {
      msg.channel.send(`Initialization complete`)
      .then(m => {
        m.delete({ timeout: 10000 });
      });
    })
  }
};