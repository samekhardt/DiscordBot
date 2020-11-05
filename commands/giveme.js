const cheerio = require("cheerio");
const request = require("request");

module.exports = {
    name: 'giveme',
    description: 'image search',
    execute(message, args){
        function getRandomint(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
            
        let parts = message.content.split(" ");
            /* extract search query from message */
        
        let search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
        
        let options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
            };
        request(options, function(error, response, responseBody) {
            if (error) {
                // handle error
                return;
            }
    
            /* Extract image URLs from responseBody using cheerio */
    
            $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
    
            // In this search engine they use ".image a.link" as their css selector for image links
            let links = $(".image a.link");
    
            // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
            // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
            let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                // Handle no results
                return;
            }
            let count = urls.length;
            let imageIndex = getRandomint(count);
            // Send result
            message.channel.send( urls[imageIndex] );
        });
        
}
}