module.exports = {
    name: 'checkage',
    description: "Checks age of user, then provides role",
    execute(message, args){
        let member = message.member, user = member.user;

        let joinDate = new Date(member.joinedAt);
        let today = new Date();

        let age = new Date(today - joinDate);
        let years = age.getUTCFullYear() - 1970 + " years";
        let yeardiff = age.getUTCFullYear() - 1970;
        let months = age.getUTCMonth() + " months";
        let monthdiff = age.getUTCMonth();
        let days = age.getUTCDate() - 1 + " days";
        let daydiff = age.getUTCDate() -1;

        if(daydiff > 7 || monthdiff > 0 || yeardiff > 0){
            if (message.member.roles.cache.has('746044942916386879')){
                message.channel.send('You have been given the Floaters role for being in the server for over 7 days.');
                message.channel.send('Your age: ' + years + " " + months + " " + days);
            } else {
                message.channel.send('Your age: ' + years + " " + months + " " + days);
            }
        } else {
            message.channel.send('You have not been here long enough.');
            message.channel.send('Your age: ' + years + " " + months + " " + days);
        }
        
    }
};