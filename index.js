const { Client, Collection } = require(`discord.js`);
const { config } = require(`dotenv`);
const mysql = require(`mysql`);

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + `/.env`
});

[`command`].forEach(handler => {
    require(`./handler/${handler}`)(client)
})

client.on(`ready`, () => {
    console.log(`Online`);

});

client.on(`message`, async message => {

    const prefix = `!`

    if (message.author.bot) return;

    //Where we add users to table

    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);
});


client.login(process.env.TOKEN);
