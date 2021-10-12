const { prefix } = require("../config.json");

module.exports = (client, Discord, msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    console.log(cmd);
    console.log(args);
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
        try {
            command.execute(msg, args, client);
        } catch (error) {
            console.error(error);
            msg.channel.send("something error!");
        }
    } else {
        msg.channel.send("Command Not Found!");
    }
}