//const got = require('got');
var curl = require('curlrequest');
var request  = require('request');
var areaCode = require('_areaCode.json');
var catArray = require('_catArray.json'); 

exports.handle = function(event, context, callback) {

  const NEWBIE = 0;
  const OLDHAND = 1;

  //Return JSON, 
  const PREDEFINED_FORMAT = '?fmt=8&order=6&sltp=S&asc=1';

  //Return Column fields
  const DATA_RETURN_FIELD = '&cols=J,JOB,NAME,SAL_MONTH_LOW,ADDR_NO_DESCRIPT,PERIOD,WELFARE,JOBNO';

  var ApiPath = 'http://www.104.com.tw/i/apis/jobsearch.cfm';
  var queryString = ApiPath + PREDEFINED_FORMAT;

  //=====Below add user input

  if(undefined != event.area){
    //var areaInput = event.area;
    var targetAreaCode = Object.keys(areaCode[event.area])[0]; //AreaCode
    queryString += '&area=' + targetAreaCode;
  }
  
  if(undefined != event.cat){
    var targetCatCode = catArray[event.cat];
    queryString += '&cat=' + targetCatCode;
  }

  //2 roles
  if(undefined != event.role){
    if(NEWBIE == event.role){
       queryString += '&exp_all=2&exp=0,-1';
    }

    if(OLDHAND == event.role){
       queryString += '&exp_all=1&exp=2';
    }
  }

  //Salary Min and Max
  if(undefined != event.slmin){
    queryString += '&slmin=' + event.slmin;
  }

  if(undefined != event.slmax){
    queryString += '&slmax=' + event.slmax;
  }

  request(queryString, function (error, response, body) {

      returnBody = {
        // "area"       : targetAreaCode,
        // "cat"        : targetCatCode,
        "status"     : "success! 2",
        "queryString": queryString,
      }

      if( ! error && response.statusCode == 200){
        returnBody.data = response.body;
      }else{
        returnBody.status = 'Error! ' + error + ', STATUSCODE' + response.statusCode;
      }

      //Return data
      callback(null,
      {
        "statusCode" : 200,
        "headers" : { 'Content-Type' : 'application/json' },
        "body" : returnBody
      });
	});//end of request

}
