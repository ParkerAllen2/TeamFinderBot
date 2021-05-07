const fs = require('fs');
const fileName = './config.json';
const dbManager = require('../teamDatabaseManager.js');
const { prefix, admin } = require('../config.json');
const COL_LENGTH = 12;

module.exports = {
  name: 'setup',
  aliases: [],
  description: 'Creates the 2 messages and stores the message ids to be editted later',
  permission: true,
  args: false,
  usage: '',
  cooldown: 5,
  execute(msg, args) {
    return;
    let file = JSON.parse(fs.readFileSync(fileName));
    const {commands} = msg.client;
    data = writeCommands(commands);
    //first message commands
    msg.channel.send(data).then(() => {

      //second message list of teams
      msg.channel.send('teams').then(sentTeam => {

        //third message list of people looking for teams
        msg.channel.send('members').then(sentMember => {
          
          guilds = file.guilds;
          guilds[msg.guild.id] = [sentTeam.id, sentMember.id];
          file.guilds = guilds;

          fs.writeFile(fileName, JSON.stringify(file, null, 2), err => {console.error});
          dbManager.addNewGuild(guilds);
          dbManager.writeTeamMessage(sentTeam).then( () => {
            dbManager.writeMembersMessage(sentMember);
          });
          
          msg.channel.send(`Initialization complete`)
          .then(m => {
            m.delete({ timeout: 10000 });
          });

        });
      });
    });
  }
};

function writeCommands(commands) {
  const data =[];
  data.push('Here\'s a list of all commands:');
  data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command`);
  data.push(`\`\`\`` + "Name:".padEnd(COL_LENGTH + 1) + "Description:")
  data.push(commands.map(getCommandDescritpion).join(""));
  data.push(`\`\`\``);
  data.push(`**Please Only Use Commands**`);
  data.push(`This is to prevent autobiographies and job posting`);
  data.push(`For help/bugs ask in #general-help`);
  data.push(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`);
  return data;
}

function getCommandDescritpion(item) {
  if(item.permission) {
    return;
  }
  rtn = `${prefix}${item.name.padEnd(COL_LENGTH, ' ')}${item.description}\n` + 
  `${' '.padEnd(COL_LENGTH, ' ')} Ex. ${prefix}${item.name} ${item.usage}\n\n`;
  return rtn;
}