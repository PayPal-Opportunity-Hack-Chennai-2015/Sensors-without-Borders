
var request = require('request'),
    _ = require('lodash');

var required_fields = ["current_date", "GPS_Location", "Device_Succ_Install", "@name", "SensorDevice_Id", "Device_Install_Photo"]
var required_meta_fields = ["userID", "username", "deviceID"]

var username = process.env.COMMCARE_USERNAME;
var password = process.env.COMMCARE_PASSWORD;
var domain = "swb-opphack"
var options = {
   url: 'https://www.commcarehq.org/a/' + domain + "/api/v0.4/form/",
   // authentication headers
   auth : {
     user : username,
     pass : password
   },
   json: true
};

console.log(options);
filterObjectFields = function(entry){
  return _.extend(_.pick(entry.form, required_fields), _.pick(entry.form.meta, required_meta_fields));
}

//this is the call
getCommCareForms = function(callback){
  request.get(options, function response(err, httpResponse, data){
    callback(err, data && data.objects.map(filterObjectFields))
  })
}

getCommCareForms(console.log);

module.exports.getCommCareForms = getCommCareForms;
