module.exports = {
    name: 'checkage',
    description: "Checks age of user, then provides role",
    execute(message, args){
        let member = message.member, user = member.user;

        var joinDate = new Date(member.joinedAt);
        console.log(joinDate);
        var today = new Date();
        console.log(today);

        var age = new Date(today - joinDate);
        var years = age.getUTCFullYear() - 1970 + " years";
        var yeardiff = age.getUTCFullYear() - 1970;
        var months = age.getUTCMonth() + " months";
        var monthdiff = age.getUTCMonth();
        var days = age.getUTCDate() - 1 + " days";
        var daydiff = age.getUTCDate() -1;

        console.log(years + " " + months + " " + days);
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