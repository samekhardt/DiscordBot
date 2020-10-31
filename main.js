const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');
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

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
});

client.on('guildMemberAdd', guildMember => {
    guildMember.roles.set(['745686987805163562']).then(console.log).catch(console.error);
    var embed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setTitle('**Hello!**')
        .setDescription(`Welcome to ${member.guild}.`)
        .setFooter(member.guild.name, member.guild.iconURL);

    guildMember.send(embed)
        .catch(console.error);
})

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === 'roles'){
        client.commands.get('roles').execute(message, args);
    } else if(command === 'checkage'){
        client.commands.get('checkage').execute(message, args);
    } else if(command === 'directmessage'){
        client.commands.get('directmessage').execute(message, args);
    }
});

client.on('message', message =>{
    if (message.author.bot) return;
    let member = message.member, user = member.user;
    var joinDate = new Date(member.joinedAt);
    var today = new Date();

    var age = new Date(today - joinDate);
    var yeardiff = age.getUTCFullYear() - 1970;
    var monthdiff = age.getUTCMonth();
    var daydiff = age.getUTCDate() -1;

    if(daydiff > 7 || monthdiff > 0 || yeardiff > 0){
        if(message.member.roles.cache.has('746044942916386879') || message.member.roles.cache.has('716830388793769985') || message.member.roles.cache.has('752979280031514706')){
        } else{
            message.member.roles.add('746044942916386879').catch(console.error);
        }
    } else {
    }

    if (message.content.startsWith(mudeaPrefix))
    {
    }
    else{
        antiSpam.message(message);
    }
});

client.login(process.env.token)