Jarvis-News
=====================

> Jarvis is a new age news/imformation aggregator for users. Jarvis goes out and collects the latest stuff going on from the sites and serve them to you, it also lets you to save the content for future reading. Jarvis also provides some surprise user experience features (like uttering the news content, hands free control (basic implemented) ) on the client side, which makes it the best. The screencast of the app demo: https://www.youtube.com/watch?v=NeOIUZUbE60

Note: This is just a basic proof of idea project. Strict validations ans code optimizations have not been implemented yet.

Version
----
0.1

Installation
--------------
##### Note: before running the server the link for mongodb database must be added in server.js file
----
```sh
git clone https://github.com/drreddy/Jarvis-News.git
cd Jarvis-News
npm install
node server.js
```

### To Do (Future work)
---
1. Implement full fledged audio utterence with more audio controls like forward, backward, stop.
2. Implement full fledged hands free control.
3. Improve the validations on both client and server side.
4. Run a cron job for retreiving and storing the news in timely fashion.
5. Implement a good dbms system


License
----
MIT

**Free Software, Hell Yeah!**
