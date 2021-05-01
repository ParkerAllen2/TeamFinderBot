const {admin, roles } = require('../config.json');
module.exports = {
  name: 'listRoles',
  aliases: ['list', 'roles', 'ls'],
  description: 'example',
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    if(!msg.member.roles.cache.some(role => role.name === admin)) return;
    
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