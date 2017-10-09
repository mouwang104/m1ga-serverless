console.log('starting function')
exports.handle = function(event, ctx, callback) {

  var input     = event;
  var returnMsg = '';


  




  console.log('processing event: %j', event)
  callback(null, { hello: 'to this beautiful and cruel world' })
}
