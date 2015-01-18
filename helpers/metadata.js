var feed_info = {}

feed_info["tc"] = {
    type: "rss",
    url: "http://feeds.feedburner.com/TechCrunch/",
    source_name: "TechCrunch"
}
feed_info["mashable"] = {
    type: "rss",
    url: "http://feeds.mashable.com/mashable/tech",
    source_name: "Mashable"
}
feed_info["hn"] = {
    type: "api",
    url: "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=200",
    source_name: "HackerNews"
}

feed_info["gn"] = {
    type: "rss",
    url: "https://news.google.co.in/news?pz=1&hl=en&output=rss",
    source_name: "Google News"
}
feed_info["bbc"] = {
    type: "rss",
    url: "http://feeds.bbci.co.uk/news/rss.xml?edition=int",
    source_name: "BBC World News"
}
feed_info["nyt"] = {
    type: "rss",
    url: "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",
    source_name: "The New York Times"
}

feed_info["gnsports"] = {
    type: "rss",
    url: "https://news.google.co.in/news?pz=1&hl=en&topic=s&output=rss",
    source_name: "Google News Sports"
}

feed_info["mw"] = {
    type: "rss",
    url: "http://feeds.marketwatch.com/marketwatch/marketpulse/",
    source_name: "Market Watch"
}

feed_info["reddit"] = {
    type: "rss",
    url: "http://www.reddit.com/r/news/.rss",
    source_name: "Reddit"
}



feed_info["tcstartup"] = {
    type: "rss",
    url: "http://feeds.feedburner.com/TechCrunch/",
    source_name: "TechCrunch-Startups"
}
feed_info["tccompanies"] = {
    type: "rss",
    url: "http://feeds.feedburner.com/TechCrunch/",
    source_name: "TechCrunch-Companies"
}

module.exports = feed_info
