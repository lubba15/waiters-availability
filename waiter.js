module.exports = function(models) {
  const home = function(req, res) {
    res.render('index');
  }

  const user_name = function(req, res, next) {
  //  var name = {};
    var WaitersName = req.body.username;
    res.redirect('waiter/' + WaitersName)
    // console.log(name);
  }
  const waiter = function(req, res, next) {
    var name = req.params.username;
    console.log('Name:', name);
    res.render('waiter', {
      waitersName: name
    })
  }
  const waiter2 = function(req, res, next) {
      var name = req.params.username;
    var days = req.body.days;
    console.log(days);
    

    res.render('waiter', {
      days: days,
      waitersName:name
    })
  }


  return {
    home,
    user_name,
    waiter,
    waiter2
  }
}
