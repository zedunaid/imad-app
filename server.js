var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
  var date=data.date;
  var heading=data.heading;
  var content=data.content;
  var title=data.title;
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
            ${date}
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

app.get('/:articleName', function (req, res) {
    //articleName == article-one
    //articles == {} content object for article one
    var  articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

//counter endpoint
var ctr=0;
app.get('/counter', function (req, res) {
    ctr=ctr+1;
  res.send(ctr.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/ui/zhs.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'zhs.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
