module.exports = {
  name: 'delm',
  aliases: ['rmm'],
  description: 'deletes given amount of messages',
  permission: true,
  args: true,
  usage: '[number]',
  example: '4',
  cooldown: 5,
  execute(msg, args) {
    amount = Math.min(args[0], 99) + 1;
    msg.channel.bulkDelete(amount, true);
    msg.channel.send(`Deleted ${amount - 1} messages`).then(m => {
      m.delete({ timeout: 3000 })
    })
  }
};