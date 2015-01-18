var request = require('request'),
    feedData = require('../helpers/metadata'),
    getDescription = require('../helpers/descextractor'),
    FeedParser = require('feedparser');

var getFeed = function(source,cb){
    var data = {};
    feed = feedData[source];
    
    data['source'] = feed['source_name'];
    data['news'] = [];

    var req = request({
        uri: feed['url']
    })
    var feedparser = new FeedParser();
    
    req.on('error', done);
    req.on('response', function(res) {
      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      res.pipe(feedparser);
    });

    feedparser.on('error', done);
    feedparser.on('end', done);
    feedparser.on('readable', function() {
      var post;
      while (post = this.read()) {
          
          var temp = {};
          temp['title'] = post.title;
          temp['description'] = getDescription(post.description,source);
          temp['link'] = (post.origlink == null) ? post.link : post.origlink;
          data['news'].push(temp);
          
//           console.log("\n\n" + temp['title'] + "\n\n");
//           console.log(temp['description'] + "\n\n");
//           console.log(temp['link']);
      }
    });
    
    feedparser.on('end', function(){
//         console.log(JSON.stringify(data));
        cb(JSON.stringify(data));
    });

    function done(err) {
      if (err) {
        console.log(err, err.stack);
      }
    }
}

module.exports = getFeed