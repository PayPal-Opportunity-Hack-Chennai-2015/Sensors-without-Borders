
var request = require('request');

var username = "sensorswithoutborders@gmail.com"
var password = "OPPHACK"
var domain = "swb-opphack"
var options = {
   url: 'https://www.commcarehq.org/a/' + domain,
   port: 443,
   path: '/api/v0.4/form/',
   // authentication headers
   auth : {
     user : username,
     pass : password
   }
};

//this is the call
function getCommCareForms(){
  request.get(options, function response(err, httpResponse, body){
    return body;
  })
}
