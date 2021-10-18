import { Client, Message } from 'discord.js';

export type Command = {
  name: string;
  aliases: string[];
  usage: string;
  description: string;
  execute: (msg: Message, args: string[], client: Client) => void;
};

export type ServerListItem = {
  server_id: string;
  channel_id: string;
};
