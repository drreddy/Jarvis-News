var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var session = require('express-session');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var getnewsfromrss = require('./modules/rss');
var getnewsfromapi = require('./modules/api');

local = false;

if(local){
  mongoUrl = "jarvislocal"
}else{
  mongoUrl = "mongo db link goes here"
}

var collections = ["users"]

var db = mongojs(mongoUrl, collections);

db.runCommand({ping:1}, function(err, res) {
    if(!err && res.ok) console.log("we're up");
});

app.use('/images', express.static(__dirname + '/public/images'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

app.use(session({secret: 'Buzzlightyear'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var sess;

app.get('/', function(req,res){
    sess=req.session;
    if(sess.email){
      res.redirect('/home');
    }else{
      res.render('index');
    }
  }
);  

app.get('/home', function(req,res){
  sess=req.session;
  if(sess.email){
    res.render('home', {fname: sess.fname, mail: sess.email});
  }else{
    res.redirect('/');
  }
});

app.post('/login',function(req,res){
  mailid = req.body.email
  pwd = req.body.pwd

  db.users.find({email: mailid}, function(err, users) {
    if( users.length == 0 ){
      res.json({ type:'mailidErr', mssg: 'User doesnot exist. Please register first.' });
    }
    else{
      users.forEach( function(user) {
        if (user['password'] === pwd){
          sess=req.session;
          sess.email=user['email'];
          sess.fname=user['fname'];
          res.json({ type:'Ok', mssg: 'Successfully authenticated, Redirecting to dashboard.' });
        }else res.json({ type:'pwdErr', mssg: 'Check your password' });
      });
    }
  });
});

app.post('/register',function(req,res){

  mailid = req.body.email
  pwd = req.body.pwd
  name = req.body.fname

  // strip all the white spaces and add validation

  db.users.find({email: mailid}, function(err, users) {
    if( users.length == 0 ){
      console.log("No users found");
      db.users.save({email: mailid, password: pwd, fname: name}, function(err, saved) {
        if( err || !saved ) res.json({ type:'Err', mssg: 'Sorry, error occured user not saved. Please try again later.' });
        else {
          sess=req.session;
          sess.email=mailid;
          sess.fname=name;
          res.json({ type:'Ok', mssg: 'Registration Successfull ...' });
        }
      });
    }
    else{
      res.json({ type:'Err', mssg: 'Email already registered ...'});
    } 
  });

});

app.get('/logout',function(req,res){

  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });

});

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

// port,host
server.listen(port);

io.on('connection', function(socket){

    function emitmssg(data){
        io.sockets.connected[socket.id].emit("news",data);
    }
    
    socket.on("get data",function(src){
        (src !== "hn") ? getnewsfromrss(src,emitmssg) : getnewsfromapi(src,emitmssg)
    });

    socket.on("save news",function(src){
      db.users.update({email: src['useremail']}, 
                    {
                      $push: {
                          saved: {
                            title: src['title'],
                            link: src['link'],
                            desc: src['desc'],
                            source: src['source']
                          }
                      }
                    }, function(err) {
                      if( err ){
                        io.sockets.connected[socket.id].emit("news save status","err");
                      }
                      else{
                        io.sockets.connected[socket.id].emit("news save status","ok");
                      } 
                });
    });

    socket.on("remove saved news",function(src){
      db.users.update({email: src['useremail']}, 
                    {
                      $pull: { 
                        saved: { 
                          title: src['title']
                        } 
                      }
                    }, function(err) {
                      if( err ){
                        io.sockets.connected[socket.id].emit("news removal status","err");
                      }
                      else{
                        io.sockets.connected[socket.id].emit("news removal status","ok");
                      } 
                });
    });

    socket.on("get saved news",function(mailid){
      db.users.find({email: mailid}, function(err, users) {
        if( users.length == 0 ){
          console.log("some err");
        }
        else{
          users.forEach( function(user) {
            io.sockets.connected[socket.id].emit("saved news",user['saved']);
          });
        }
      });
    });
});