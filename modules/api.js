var request = require('request'),
    feedData = require('../helpers/metadata');

/*
    story_text, title, author, url, points
*/

var getnews = function(source,cb,sockid){
    var data = {};
    feed = feedData[source];
    
    data['source'] = feed['source_name'];
    data['news'] = [];
    
    raw_data = {};
    
    request(feed['url'], function (error, response, body) {
        if (!error && response.statusCode != 200) { 
            error = response.statusCode;
        }

        if (typeof body !== 'undefined') {
            try {
                body = JSON.parse(body);
                raw_data = body;
            } catch (ex) {
                if (!error) error = ex;
            }
        }
        
        for(var x in raw_data['hits']){
            dat = raw_data['hits'][x];
            temp = {};
            temp["author"] = dat['author']
            temp["description"] = dat['story_text']
            temp["points"] = dat['points']
            temp["title"] = dat['title']
            temp["link"] = dat['url']
            data['news'].push(temp);
        }

        cb(sockid,JSON.stringify(data));
    });
}

module.exports = getnews