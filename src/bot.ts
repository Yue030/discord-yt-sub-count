import { Intents } from 'discord.js';
import { Client, Discord } from '@typeit/discord';

import Command from '@/handler/command';
import Event from '@/handler/event';

import { token } from '~/secret/config.json';

const client = new Client({
  ws: {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  },
  classes: [
    `${__dirname}/*Discord.ts`, // glob string to load the classes
    `${__dirname}/*Discord.js`, // If you compile using "tsc" the file extension change to .js
  ],
  silent: false,
  variablesChar: ':',
});

Command(client, Discord);
Event(client, Discord);

client.login(token);
