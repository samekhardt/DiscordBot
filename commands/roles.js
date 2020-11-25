module.exports = {
    name: 'roles',
    description: "List of current roles in the server",
    execute(message, args){
            message.author.send('Roles: Server Daddy, Mod, OGs, Weebu, PC Master Race, Console Plebs');
    }
};