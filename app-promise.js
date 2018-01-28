const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to fetch weather for',
    string:true
  }
}).help().alias('help','h').argv;

var uri_encoded_address = encodeURIComponent(argv.a);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${uri_encoded_address}&key=AIzaSyDPSv3F8vXrf8q_13zyT5jFaGSWzQcyJGI`;

axios.get(geocodeURL).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/3eec2593c0e33ec76ab37592ed56272c/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response)=>{
  var temprature = response.data.currently.temperature;
  var appTemprature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temprature}. But it feels like ${appTemprature}`);
}).catch((e)=>{
  if(e.code === 'ENOTFOUND'){
    console.log("Unable to connect to API service");
  }else{
    console.log(e.message);
  }
});
