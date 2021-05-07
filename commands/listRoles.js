const { roles } = require('../config.json');
module.exports = {
  name: 'listr',
  aliases: ['roles', 'lsr'],
  description: 'List the roles and their aliases that lookingForTeam checks for',
  permission: false,
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    
    const data =[];
    for(r in roles) {
      m = roles[r] + " aliases:\n";
      m += roles[arg[0]].aliases.join(",");
      data.push(m);
    }

    msg.channel.send(data)
      .then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
};