import Discord from '@typeit/discord';
import { Client } from 'discord.js';

import count from '@/commands/features/count';
import set from '@/commands/features/set';

const Commands = (client: any, Discord: any): void => {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();

  [count, set].forEach((cmd: any) => {
    if (cmd.name) {
      client.commands.set(cmd.name, cmd);
      if (cmd.aliases && Array.isArray(cmd.aliases)) {
        cmd.aliases.forEach((alias: any) =>
          client.aliases.set(alias, cmd.name),
        );
      }
    } else {
      console.error('Command missing a name!');
    }
  });
};

export default Commands;
