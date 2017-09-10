var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');
var config={
    user: 'zunaidsorathiya9',
    database: 'zunaidsorathiya9',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session({
    secret: 'someRandomValue',
     cookie: {maxAge: 1000*60*60*24*30}
    
}));

var articles={
'article-one':{
    
    title: 'Article One | ZHS Creations',
    heading: 'Article One',
    date: 'Aug 6, 2017',
    content: `
         <p>
            Hello! Welcome to my article one.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
        </p>
        
        <p>est text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test textHello! Welcome to my article one.Hola!T
        </p>  
        
         <p>
           Hello! Welcome to my article one.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
        </p>`
    },

'article-two':{
    
    title: 'Article Two | ZHS Creations',
    heading: 'Article Two',
    date: 'Aug 7, 2017',
    content: `
        <p>
            Hello! Welcome to my article Two.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
        </p>
        
        
        
         <p>
           Hello! Welcome to my article Two.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
        </p>`
    
    
},

'article-three':{
    
    title: 'Article Three | ZHS Creations',
    heading: 'Article Three',
    date: 'Aug 8, 2017',
    content: `
                <p>
            Hello! Welcome to my article Three.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
                </p>
             <p>
           Hello! Welcome to my article Three.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.Hola!Test text.
          </p>`
    
    
}

};





function createTemplate(data)
{
  var date=data['date'];
  var heading=data['heading'];
  var content=data['content'];
  var title=data['title'];
   var htmlTemplate =`
     <html>
    <head>
       
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="view port" content="width=device-width, initial-scale=1"/>
        <style>
           
        </style>
    </head>
    
    <body>
        <div class="container">
        <div>
          <a href="/">Home</a>
                  </div>
          <hr/>
            
        <h3>${heading}</h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
       ${content}
           </div> 
        </div>
    </body>
    `;
    return htmlTemplate;
}






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);

function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input, 'salt', 100000, 512, 'sha512');
    return ["pdkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
  //make a select request
  //return a response
  var hashValue =hash(req.params.input,'This-is-salt');
  res.send(hashValue);
});

app.post('/create-user',function (req,res)
{
var username=req.body.username;
var password=req.body.password;
var salt=crypto.randomBytes(128).toString('hex');
var dbString = hash(password,salt);
pool.query('insert into "user" (username,password) values ($1,$2)',[username,dbString],function (err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else {
        
             
              res.send("User successfully created"+username);
            
        }
}

)

});
//counter endpoint
var ctr=0;
app.get('/counter', function (req, res) {
    ctr=ctr+1;
  res.send(ctr.toString());
});

app.post('/login',function (req,res)
{
var username=req.body.username;
var password=req.body.password;


pool.query('select * from "user" where username=$1',[username],function (err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else {
             
             if(result.rows.length===0)
             {
                 res.status(403).send(JSON.stringify({"error":"Username/Password is incorrect empty"}));
             }
             else
             {
                 var dbString=result.rows[0].password;
                 var salt=dbString.split('$')[2];
                 var hashedPass=hash(password,salt);
                 if(dbString===hashedPass)
                 {
                req.session.auth = {userId: result.rows[0].id};
               res.send(JSON.stringify({"message":"credentials are correct"}));
             }
                 else
             {
                  res.status(403).send(JSON.stringify({"error":"Username/Password is incorrect"}));  
             }
                 
             }
              
             }
        }


)

});

app.get('/check-login', function (req, res) {
    if(req.session&&req.session.auth&&req.session.auth.userId)
    {
  res.send('You are logged-in and your user-Id is: '+req.session.auth.userId.toString());}
  
  else { res.send('You are not logged-in');}
});

var names=[];
app.get('/submit-name', function(req, res) {//url: /submit-name?name=xxx
    //get the names
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/logout', function (req, res) {
    
    delete req.session.auth;
    res.send('You are Logged Out');
});



app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles == {} content object for article one
    
    pool.query("select * from article where title =$1",[req.params.articleName],function (err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else {
            
            if(result.rows.length === 0)
            {
             res.status(404).send('No Article Found');    
            }
            else
            {
             var articleData=result.rows[0];
             
              res.send(createTemplate(articleData));
            }
        }
        
        
    }
    );
  
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/zhs.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'zhs.png'));
});

app.get('/ui/back.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'back.jpg'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});