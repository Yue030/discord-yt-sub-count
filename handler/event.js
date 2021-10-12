const { readdirSync } = require('fs');

module.exports = (client, Discord) => {
    readdirSync('./events/').forEach(file => {
        const event = require(`../events/${file}`);
        const event_name = file.split('.')[0];
        client.on(event_name, event.bind(null, client, Discord));
    })
}