const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

["command", "event"].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord);
});

client.login(require('./config.json').token);