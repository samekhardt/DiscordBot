const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: "Shows members of the server in order from oldest to youngest",
    execute(message, args){
        const mysql = require('mysql');
        let con = mysql.createConnection({
            host: "mkorvuw3sl6cu9ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            database: "frdisnf4wn6jum83",
            user: "ek0a1l8kakjo4p9y",
            password: "v54qciosxhn3tsys"
        })
        let usernameArray = [];

            
        con.query("SELECT ID, Username, JoinDate FROM Users order by JoinDate ASC", function (err, result, fields) {
            if(err) throw err;
            let resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            resultArray.forEach(function(v){
                let date = new Date(v.JoinDate);
                let years = date.getFullYear();
                let months = date.getMonth() + 1;
                let days = date.getDate();
                let joinDate = (months + "/" + days + "/" + years);
                usernameArray.push(v.Username + " " + joinDate);
            });
            
            const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Leaderboard")
            .addFields({name: "Users by age", value: usernameArray})
            message.channel.send(embed);
        })
    }
};