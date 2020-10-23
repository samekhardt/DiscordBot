module.exports = {
    name: 'roles',
    description: "List of current roles in the server",
    execute(message, args){
            message.channel.send('Roles: Server Daddy, Mod, OGs, Weebu, Floaters, Newcomer');
    }
};