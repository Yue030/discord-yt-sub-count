import { Client, Message } from 'discord.js';

export type Command = {
  name: string;
  aliases: string[];
  usage: string;
  description: string;
  execute: (msg: Message, args: string[], client: Client) => void;
};

export type Notification = {
  dcServerId: string;
  dcChannelId: string;
  targetSubCount: number;
};

export type BotData = {
  prefix: string;
  ytChannelId: string;
  ytChannelName: string;
  ytSubCount: number;
  notifications: Array<Notification>
};
