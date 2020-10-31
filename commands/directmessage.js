module.exports = {
    name: 'directmessage',
    description: "Sends direct message to user",
    execute(message, args){
       message.author.send("Test Message");
        
    }
};