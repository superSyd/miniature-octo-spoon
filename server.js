var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(middleware = (req,res,next) =>{
console.log(req.method + " "+req.path+" - "+req.ip)
next();
})

app.get('/now', (req,res,next) => {
  
  req.time = new Date().toString();
  next();

}, (req,res) => {
  res.send({time: req.time})
})

app.get("/:word/echo", (req,res) => {
  const {word} = req.params
  res.send({
    echo: word
  })
})

app.get("/name", (req,res)=>{
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.send({
    name : firstname + " "+lastname
  })
})

//console.log("Hello World");
/*
app.get("/", (req, res) => {
  res.send("Hello Express");
});
*/

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.use("/public",express.static(__dirname + "/public"))

let myObject = {"message":"Hello json"}
let myObjectUpperCase = {"message":"HELLO JSON"}

app.get("/json", (req, res) => {

  if(process.env.MESSAGE_STYLE === "uppercase"){
    
    res.json(myObjectUpperCase);
  } else {
    res.json(myObject);
  }
  
});

app.post("/name", (req,res)=>{
  const firstname = req.body.first;
  const lastname = req.body.last;

  res.send({
    name: firstname +" "+ lastname
  })
})

































 module.exports = app;
