import { prefix } from '../config.json';

const messageCreate = (client: any, Discord: any, msg: any) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) {
    try {
      command.execute(msg, args, client);
    } catch (error) {
      console.error(error);
      msg.channel.send('something error!');
    }
  } else {
    msg.channel.send('Command Not Found!');
  }
};

export default messageCreate;
