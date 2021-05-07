const MAXDESCRIPTIONLENGTH = 256;
const { roles } = require('../config.json');
const dbManager = require('../teamDatabaseManager.js');

module.exports = {
  name: 'lookt',
  aliases: ['findt'],
  description: 'Creates a message that you are looking to join a team',
  permission: false,
  args: false,
  usage: 'this is the description',
  cooldown: 5,
  execute(msg, args) {
    skills = "";
    description = "";

    for(i in roles) {
      if(msg.member.roles.cache.some(role => role.name === roles[i]))
        skills += roles[i] + " ";
    }
    
    if(args.length == 0) {
      return dbManager.addMember(msg, skills, description, false);
    }

    for(i in args) {
      description += args[i] + " ";
    }

    if(description.length > MAXDESCRIPTIONLENGTH) {
      return msg.reply(`Your Description was too long\n\n ${description}`)
        .then(m => {
          m.delete({ timeout: 10000 })
        }).catch();
    }
    dbManager.addMember(msg, skills, description, false);
  }
};