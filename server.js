// server.js
// where your node app starts

// init project
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/timestamp", (req,res)=>{

    myUnixDate = moment().unix()*1000;
    myUtcDate = moment().format("ddd, D MMM YYYY HH:mm:ss");
    timeZone = momentTimezone.tz(momentTimezone.tz.guess()).format('z');

    res.json({unix: myUnixDate, utc: myUtcDate +" "+timeZone})
})


app.get("/api/timestamp/:date_string", (req,res)=>{
  const date = req.params.date_string;


  var myDate;
  var myUnixDate;
  var myUtcDate;
  var timeZone;


    if(isNaN(date)){

    myDate = new Date(date);
  
    myUnixDate = moment(myDate.toString()).unix() * 1000;
    myUtcDate = moment(myDate.toString()).format("ddd, D MMM YYYY HH:mm:ss");
  timeZone = momentTimezone.tz(momentTimezone.tz.guess()).format('z');

  } else if(!isNaN(date)){

  myDate = new Date(parseInt(date));
  
  myUnixDate = moment(myDate.toString()).unix() * 1000;
  myUtcDate = moment(myDate.toString()).format("ddd, D MMM YYYY HH:mm:ss");
  timeZone = momentTimezone.tz(momentTimezone.tz.guess()).format('z');

  }

  if(isNaN(myUnixDate) && isNaN(myUtcDate)){
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: myUnixDate, utc: myUtcDate +" "+timeZone})

  }

  //console.log(myUnixDate, myUtcDate)

})
