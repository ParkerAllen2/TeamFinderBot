const MAXDESCRIPTIONLENGTH = 256;
const { roles } = require('../config.json');
const dbManager = require('../teamDatabaseManager.js');

module.exports = {
  name: 'lookm',
  aliases: ['findm'],
  description: 'Writes a message that you have a team and are looking for your given roles',
  permission: false,
  args: true,
  usage: '2 artist coder 1 musician This is the description',
  cooldown: 5,
  execute(msg, args) {

    members = 'Looking For: ';
    description = '';
    readingDescription = false;
    
    //<lookm junior artist this is here
    //Parse args
    let i;
    for(i = 0; i < args.length; i++) {
      if(readingDescription) {
        description += args[i] + ' ';
        continue;
      }
      
      //check for number
      let amount = ''
      if(!isNaN(args[i]) && i + 1 < args.length) {
        amount = args[i] + ' ';
        i++;
      }
      for(r in roles) {
        //normal check
        if(aliasesCheck(roles[r].aliases, args[i])) {
          members += amount + roles[r].name + ' ';
          readingDescription = false;
          break;
        }
        //2 words check
        if(i + 1 == args.length) {
          readingDescription = true;
          break;
        }
        if(aliasesCheck(roles[r].aliases, args[i] + ' ' + args[i + 1])) {
          members += amount + roles[r].name + ' ';
          readingDescription = false;
          i++;
          break;
        }
        readingDescription = true;
      }
      if(readingDescription) {
        description += amount + args[i] + ' ';
      }
    }

    endOfString = members.substring(members.length - 2);
    if(endOfString)

    if(description == '') {
      return dbManager.writeTeam(msg, members, description, true);
    }

    if(description.length > MAXDESCRIPTIONLENGTH) {
      return msg.reply(`Your Description was too long\n\n ${description}`)
        .then(m => {
          m.delete({ timeout: 10000 })
        }).catch();
    }

    dbManager.writeTeam(msg, members, description, true);
  }
};

function aliasesCheck(aliases, args) {
  return aliases.includes(args.toLowerCase());
}