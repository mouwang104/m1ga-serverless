//var request = require('request');

//console.log('starting function')
exports.handle = function(event, context, callback) {

  // var input     = event;
  // var returnMsg = '';

  //var bodyData = JSON.parse(event.body);
  //var bodyData = '1234';
  var bodyData = 'and your name is :' + event.name;
  var areaCode = event.area;

  var queryString = '';

  var ApiPath = 'http://www.104.com.tw/i/apis/jobsearch.cfm';





  //var returnJson = { "userinput" : bodyData };
  
  //console.log('processing event: %j', event)
  //callback(null, { yolo: ', your name is' . name })
  callback(null,
          {
            statusCode : 200,
            headers : { 'Content-Type' : 'application/json' },
            body : bodyData
          });
}
