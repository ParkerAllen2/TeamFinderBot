const MAXDESCRIPTIONLENGTH = 256;
const { teamRoles } = require('../config.json');
const dbManager = require('../teamDatabaseManager.js');

module.exports = {
  name: 'lookForMember',
  aliases: ['findm', 'lookm'],
  description: 'example',
  args: true,
  usage: '<list of roles> <extra details about you>',
  cooldown: 5,
  execute(msg, args) {

    members = "";
    description = "";
    readingDescription = false;
    
    //<lookm junior artist this is here
    //Parse args
    let i;
    for(i = 0; i < args.length; i++) {
      if(readingDescription) {
        description += args[i] + " ";
        continue;
      }
      
      //check for number
      let amount = ""
      if(!isNaN(args[i]) && i + 1 < args.length) {
        amount = args[i] + " ";
        i++;
      }
      for(r in teamRoles) {
        //normal check
        if(aliasesCheck(teamRoles[r].aliases, args[i])) {
          members += amount + teamRoles[r].name + " ";
          readingDescription = false;
          break;
        }
        //2 words check
        if(i + 1 == args.length) {
          readingDescription = true;
          break;
        }
        if(aliasesCheck(teamRoles[r].aliases, args[i] + " " + args[i + 1])) {
          members += amount + teamRoles[r].name + " ";
          readingDescription = false;
          i++;
          break;
        }
        readingDescription = true;
      }
      if(readingDescription) {
        description += amount + args[i] + " ";
      }
    }

    endOfString = members.substring(members.length - 2);
    if(endOfString)

    if(description == "") {
      return dbManager.addTeam(msg, members, description, true);
    }

    if(description.length > MAXDESCRIPTIONLENGTH) {
      return msg.reply(`Your Description was too long\n\n ${description}`)
        .then(m => {
          m.delete({ timeout: 10000 })
        }).catch();
    }

    dbManager.addTeam(msg, members, description, true);
  }
};

function aliasesCheck(aliases, args, next) {
  return aliases.includes(args.toLowerCase());
}