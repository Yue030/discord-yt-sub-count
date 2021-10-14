import { Intents } from 'discord.js';
import { Client } from '@typeit/discord';

import Command from './handler/command';
import Event from './handler/event';

import config from './config.json';

const client = new Client({
  ws: {
    intents: [Intents.FLAGS.GUILDS],
  },
  classes: [
    `${__dirname}/*Discord.ts`, // glob string to load the classes
    `${__dirname}/*Discord.js`, // If you compile using "tsc" the file extension change to .js
  ],
  silent: false,
  variablesChar: ':',
});

client.login(config.token);
