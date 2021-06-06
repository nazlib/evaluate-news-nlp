var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// Cors for cross origin allowance
const cors = require('cors');
const fetch = require('node-fetch');
const app = express()
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
const geoApiUrl='http://api.geonames.org/searchJSON';
const weatherApiUrl='https://api.weatherbit.io/v2.0/forecast/daily'
const pixabayApiUrl='https://pixabay.com/api/';
app.use(cors());
app.use(express.static('dist'))
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
   // res.sendFile(path.resolve('src/client/views/index.html'))
})

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
   })
 app.get('/test', function (req, res) {
     res.send(mockAPIResponse)
 })
 console.log(`Your API key is ${process.env.API_KEY}`); 
  
app.post('/geo', async function(req, res) {
    console.log("datanb");
    const response = await fetch(`${geoApiUrl}?q=${req.body.city}&maxRows=1&username=${process.env.GEO_USER}`)
    const data = await response.json()
    res.send(data)
})
app.post('/weather', async function(req, res) {
    const response = await fetch(`${weatherApiUrl}?lat=${req.body.lat}&lon=${req.body.lng}&days=4&key=${process.env.WEA_KEY}`)
    const data = await response.json()
    res.send(data)
})
app.post('/picture', async function(req,res){
    const response = await fetch(`${pixabayApiUrl}?key=${process.env.PIX_KEY}&q=${req.body.city}&image_type=photo&pretty=true&orientation=horizontal&editors_choice=true&per_page=4&category=travel`)
    const data = await response.json()
    res.send(data)
})