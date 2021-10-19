import { Intents } from 'discord.js';
import { Client } from '@typeit/discord';

import eventHandler from '@/handler/events';
import { token } from '@/handler/config';

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

eventHandler(client);

client.login(token);
