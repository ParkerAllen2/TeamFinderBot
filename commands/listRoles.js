const { roles } = require('../config.json');
module.exports = {
  name: 'listr',
  aliases: ['roles', 'lsr'],
  description: 'List the roles that lookingForTeam checks for',
  permission: true,
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    const data =[];
    for(r in roles) {
      data.push(roles[r]);
    }
    msg.channel.send(data)
      .then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
};