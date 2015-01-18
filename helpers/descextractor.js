var cheerio = require('cheerio'),
    encoder = require('./decoder'),
    sanedesc = "",
    insane = "";

var getdesc = function(rssdesc, source){
    $ = cheerio.load(rssdesc);
    switch(source){
        case "tc":
            (rssdesc.split('<')[0] == '') ? insane = rssdesc.split('/>')[1].split('<')[0] : insane = rssdesc.split('<')[0]
            break;
        case "mashable":
            insane = $('p').eq(0).text();
            break;
        case "gn":
            insane = $('.lh font[size="-1"]').eq(1).text();
            break;
        case "bbc":
            insane = rssdesc;
            break;
        case "nyt":
            insane = rssdesc.split("<")[0]
            break;
        case "gnsports":
            insane = $('.lh font[size="-1"]').eq(1).text();
            break;
        case "mw":
            (rssdesc.indexOf("<p>") !== -1) ? insane = $('p').eq(0).text() : insane = rssdesc.split("-")[1]
            break;
        case "reddit":
            insane = "";
            break;
        default:
            insane = "";
    };
    sanedesc = encoder.htmlDecode(insane).trim();
    return sanedesc
}

module.exports = getdesc