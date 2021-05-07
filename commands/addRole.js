const fs = require('fs');
const fileName = './config.json';
module.exports = {
  name: 'addr',
  aliases: [],
  description: 'Adds a role lookingForTeam checks for',
  permission: true,
  args: true,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    let file = JSON.parse(fs.readFileSync(fileName));

    tempRoles = file.roles;
    tempRoles.push(args[0]);
    file.roles = tempRoles;
    
    fs.writeFile(fileName, JSON.stringify(file, null, 2), err => console.error);

    msg.channel.send(`Added Role: ${args[0]}`)
    .then(m => {
      m.delete({ timeout: 10000 })
    }).catch();
  }
};