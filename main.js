/* plugins */
/*____________________________________________________________________________*/
var fs = require('fs');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://paulissimo11%40gmail.com:pass@smtp.gmail.com');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfoliodb');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './source/images' });

/* models */
/*____________________________________________________________________________*/
var Post = mongoose.model('Post', {
  title: String,
  date: String,
  text: String
});

var Work = mongoose.model('Work', {
  title: String,
  tech: String,
  image: String
});

var imagePath;

var Skill = mongoose.model('Skill', {
  html: String,
  css: String,
  js: String,
  php: String,
  mysql: String,
  node: String,
  mongo: String,
  git: String,
  gulp: String,
  bower: String
});

/* app */
/*____________________________________________________________________________*/
app.set('views', './build');
app.set('view engine', 'jade');

app.use(bodyParser.json());

app.use(session({
  secret: 'portfolio',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

/* app.get */
/*____________________________________________________________________________*/
app.get(['/','/index.html'], function(req, res) {
  if (req.session.user === 'admin') {
    res.render('index', { pageTitle: 'Main page', authLink: '/admin.html', authText: 'Администрирование'});
  } else {
    res.render('index', { pageTitle: 'Main page', authLink: '#auth', authText: 'Авторизоваться'});
  }
});

app.get('/blog.html', function(req, res) {
  Post.find({}).then(function(posts) {
    res.render('blog', { pageTitle: 'Blog page', posts: posts });
  });
});

app.get('/works.html', function(req, res) {
  Work.find({}).then(function(works) {
    res.render('works', { pageTitle: 'Works page', works: works});
  });
});

app.get('/about.html', function(req, res) {
  Skill.find({}).then(function(skills) {
    console.log(skills);
    res.render('about', { pageTitle: 'About page', skills: skills});
  });
});

app.get('/admin.html', function(req, res) {
  if (req.session.user === 'admin') {
    res.render('admin', { pageTitle: 'Admin page'});
  } else {
    res.status(404);
    res.render('404', { pageTitle: '404 not found'})
  }
});

app.get('/*', function(req, res){
  var extMatch = /\..*/g;
  var fileExt = req.url.match(extMatch);

  if (fileExt == '.html') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
  } else if (fileExt == '.css') {
    res.setHeader('Content-Type', 'text/css; charset=utf8');
  } else if (fileExt == '.png') {
    res.setHeader('Content-Type', 'image/png');
  } else if (fileExt == '.jpg') {
    res.setHeader('Content-Type', 'image/jpg');
  } else if (fileExt == '.svg') {
    res.setHeader('Content-Type', 'image/svg+xml');
  }

  var fileName = './build/' + req.url;
  if(fs.existsSync(fileName) && (fileExt == '.html' || fileExt == '.css')) {
    var content = fs.readFileSync('./build/' + req.url, {encoding: 'utf8'});
  } else if(fs.existsSync(fileName)) {
    content = fs.readFileSync('./build/' + req.url);
  } else {
    res.status(404);
    res.render('404', { pageTitle: '404 not found'});
    res.end();
  }

  res.write(content);
  res.end();
});

/* app.post */
/*____________________________________________________________________________*/
app.post('/blog', function(req, res) {
  var post = new Post( req.body );
  post.save();
  res.end();
});

app.post('/image', multipartyMiddleware, function(req, res) {
  //console.log('поступил пост-запрос на /image', req.body);
  //console.log(req.files, 'next console log');

  for (var key in req.files) {
    var name = req.files[key];
    for (var newKey in name) {
      var ext = name[newKey];
      for (var anotherKey in ext) {
        if (anotherKey == 'path') {
          imagePath = ext[anotherKey];
        }
      }
    }
  }

  res.end();
});

app.post('/work', function(req, res) {
  var work = new Work ({
    title: req.body.title,
    tech: req.body.tech,
    image: imagePath
  });
  work.save();
  res.end();
});
/*___setup for skills removing from db before saving new data__*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/portfoliodb';

var removeSkills = function(db, callback) {
  db.collection('skills').deleteMany( {}, function(err, results) {
    console.log(results);
    callback();
  });
};
/*_____*/
app.post('/about', function(req, res) {
  var promise = new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      removeSkills(db, function() {
        db.close();
      });
      resolve();
    });
  });

  promise.then(function() {
      var skill = new Skill ( req.body );
      skill.save();
      res.end();
    },
    function() { console.log('fail') }
  );
});

app.post('/auth', function(req, res) {
  console.log(req.body);

  if(req.body.login === 'admin' && req.body.password === 'pass') {
    req.session.user = 'admin';
    //res.render('index', { pageTitle: 'Main page', authLink: '/admin.html', authText: 'Администрирование'});
    res.redirect('/admin.html');
  } else {
    console.log('error');
    //res.render('index', {}); //отрендерить индекс-страницу с каким-либо параметром
  }
  res.end();
});

app.post('/mail', function(req, res) {
  var mailOptions = {
    from: req.body.mail,
    to: 'dmitrygavrish@gmail.com',
    subject: 'Portfolio site: message from ' + req.body.name + ' mail: ' + req.body.mail,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  res.end();
});

/* app.listen */
/*____________________________________________________________________________*/
app.listen(3000);