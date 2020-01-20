const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
});


app.get("/conversion",function(req,res){
  res.sendFile(__dirname+"/conversions.html");
});

app.post("/conversion", function(req, res){
  var url = "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1";
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var final_url = "https://apiv2.bitcoinaverage.com/convert/global?from="+crypto+"&to="+fiat+"&amount=+"+amount;
  request(final_url, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    console.log(body);
    res.send("<h1>value is "+price+"</h1>");
  })
})

app.post("/",function(req, res){
  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  request(url+crypto+fiat, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.averages.week;
    var price_month = data.averages.month;
    // console.log(price);
    // console.log(req.body.crypto);
    // console.log(req.body.fiat);

    res.write("<h1>This week's average "+crypto+" price of this week is "+price+" "+fiat+"</h1>");
    res.write("<h1>This week's average "+crypto+" price of this month is "+price_month+" "+fiat+"</h1>")
  });
});

app.listen(3000, function(){
  console.log("Server started at port 3000");
});
