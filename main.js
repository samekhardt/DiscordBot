const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = '-';
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "mkorvuw3sl6cu9ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    database: "frdisnf4wn6jum83",
    user: "ek0a1l8kakjo4p9y",
    password: "v54qciosxhn3tsys"
})
const mudeaPrefix = '$';
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
});

//Connection to DB
con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");
})

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
//Once bot is online complete below code
client.once('ready', () => {
    console.log('bot started');
    client.user.setActivity('Covid-19 Simulator');
    client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
            if (member.user.bot) return;
            const user = {ID: member.id, Username: member.displayName, JoinDate: member.joinedAt}
            con.query("INSERT INTO Users SET ? ON DUPLICATE KEY UPDATE ID = ID", user, (err, res) => {
                if(err) throw err;
            })
        })
    })
});
//When new member joins guild, apply newcomer role and add to db
client.on('guildMemberAdd', guildMember => {
    const user = {ID: guildMember.id, Username: guildMember.displayName, JoinDate: guildMember.joinedAt}
    con.query("INSERT INTO Users SET ? ON DUPLICATE KEY UPDATE ID = ID", user, (err, res) => {
        if(err) throw err;
    })
 
})
//on message check for commands
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let parts = message.content.split(" ");
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();
    

    if (command === 'roles'){
        client.commands.get('roles').execute(message, args);
    } else if(command === 'checkage'){
        client.commands.get('checkage').execute(message, args);
    } else if(command === 'commands'){
        client.commands.get('commands').execute(message, args);
    }else if(command ==='leaderboard'){
        client.commands.get('leaderboard').execute(message, args);
    }else if(parts[0] === "-giveme"){
        client.commands.get('giveme').execute(message,args);
    }
});
//check message then grab author info > check for age>7 if true; apply Floater role; Ignores mudea commands and also checks for spam messages
client.on('message', message =>{
    if (message.author.bot) return;
    if (message.content.startsWith(mudeaPrefix))
    {
    }
    else{
        antiSpam.message(message);
    }
});

//client login, token applied in heroku
client.login(process.env.token)
