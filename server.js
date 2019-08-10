const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const yelp = require('yelp-fusion');
const app = express()

const apiKey = '0b6f4f3f81a001b38f22b46ed1fbfbad';
const yelpKey = 'Qzq9eLNy493qEtHUUjKW9sW4l1CU_8p39u_VbtQV8khGCf0WYyM2JSyu8uCqK7iMZRjS18a2YOKAor1Fwa13-Ay2CqHMzbzU5jS4ah55pTxq9L5xJUaYCI1GcFEzXXYx';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error,  try again'});
    } else {
      let weather = JSON.parse(body)
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please  again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(8000, function () {
  console.log('htttp://localhost:8000')
})