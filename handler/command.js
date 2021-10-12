const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Commands');
table.setHeading('Command', 'Load Status');

module.exports = (client, Discord) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.categories = readdirSync('./commands/');

    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (const file of commands) {
            const cmd = require(`../commands/${dir}/${file}`);
            
            if (cmd.name) {
                client.commands.set(cmd.name, cmd);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.');
                continue;
            }

            if (cmd.aliases && Array.isArray(cmd.aliases)) {
                cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
            }
        }
    })

    console.log(table.toString());
}