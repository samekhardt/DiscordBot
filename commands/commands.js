module.exports = {
    name: 'directmessage',
    description: "Sends direct message to user",
    execute(message, args){
       message.author.send("Currently we have 3 commands:");
       message.author.send("-checkage , this will show how long you've been in this server");
       message.author.send("-leaderboard , this will send a leaderboard of who has been in the sever the longest");
       message.author.send("-roles , this will show the current roles available in the server");
        
    }
};