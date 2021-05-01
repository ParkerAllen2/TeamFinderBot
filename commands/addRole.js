const fs = require('fs');
const fileName = './config.json';
module.exports = {
  name: 'addRoll',
  aliases: ['add'],
  description: 'example',
  args: true,
  usage: '<role>',
  cooldown: 5,
  execute(msg, args) {
    let file = JSON.parse(fs.readFileSync(fileName));
    if(!msg.member.roles.cache.some(role => role.name === file.admin)) return;

    tempRoles = file.roles;
    tempRoles.push(args[0]);
    file.roles = tempRoles;
    
    fs.writeFile(fileName, JSON.stringify(file, null, 2), err => console.error);

    msg.reply(`Added Role: ${args[0]}`)
    .then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
};