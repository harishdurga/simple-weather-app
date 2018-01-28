# simple-weather-app
this is a command line based simple node js based weather application which accepts an address and show current temprature in the area

don't forget to run to install the necessary node modules from npm

```
npm install
```
the command to get the temperatre at some place is
```
node app-promise -a="address goes here"
```
this is how the app works. The app uses two APIs to get the weather information. when you enter address the app makes a request to Google geocode API to get the latitude and longitude
for the address. And then it sends those latitude and longitude to dark sky API to get weather deatiails. 
