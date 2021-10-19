import { Client } from '@typeit/discord';

import ready from '@/events/ready';
import messageCreate from '@/events/messageCreate';

const events = [
  // { name: 'ready', func: ready },
  // messageCreate is still not available in v12
  { name: 'message', func: messageCreate },
];

const eventHandler = (client: Client): void => {
  // Probably a Discord js and ts version mismatch, workaround
  client.on('ready', () => { ready(client); });

  events.forEach((e) => {
    client.on(e.name, e.func);
  });
};

export default eventHandler;
