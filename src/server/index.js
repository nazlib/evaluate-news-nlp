var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// Cors for cross origin allowance
const cors = require('cors');
const fetch = require('node-fetch');
const app = express()
var bodyParser = require('body-parser')
const dotenv = require('dotenv');

app.use(cors());
app.use(express.static('dist'))
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(__dirname)

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
 
 // POST Route
app.post('/api', async function(req, res) {
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${req.body.url}`)
    const data = await response.json()
    console.log('response=>'+data)
    res.send(data)
})
  
