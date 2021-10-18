import { Client } from '@typeit/discord';

import messageCreate from '@/events/messageCreate';
import ready from '@/events/ready';

const events = [
  // messageCreate is still not available in v12
  { name: 'message', func: messageCreate },
  // { name: 'ready', func: ready },
];

const eventHandler = (client: Client): void => {
  events.forEach((e) => {
    client.on(e.name, e.func);
  });
  // Probably a Discord js and ts version mismatch, workaround
  client.on('ready', () => { ready(client); });
};

export default eventHandler;
