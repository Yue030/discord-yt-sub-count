import messageCreate from '@/events/messageCreate';
import ready from '@/events/ready';

const events = [
  { name: 'messageCreate', event: messageCreate },
  { name: 'ready', event: ready },
];

const Events = (client: any, Discord: any): void => {
  events.forEach((event) => {
    client.on(event.name, event.event.bind(null, client, Discord));
  });
};

export default Events;
