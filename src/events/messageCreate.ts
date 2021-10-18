import { Message, Client } from 'discord.js';

import commandHandler from '@/handler/commands';

const messageCreate = (msg: Message, client: Client): void => {
  if (msg.author.bot) return;
  commandHandler(msg, client);
};

export default messageCreate;
