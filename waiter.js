module.exports = function(models) {
  const home = function(req, res) {
    res.render('index');
  }

  const user_name = function(req, res, next) {
    var WaitersName = req.body.username;
    res.redirect('waiter/' + WaitersName)
    // console.log(name);
  }
  const waiter = function(req, res, next) {
    var WaitersName = req.params.username;
    console.log('Name:', WaitersName);
    res.render('waiter', {
      waitersName: WaitersName
    })
  }
  const waiters = function(req, res, next) {
    var WaitersName = req.params.username;
    var days = req.body.days;
    models.waiters.findOne({
      WaitersName: req.params.username
    }, function(err, results) {
      if (err) {
        return next(err)
      }
      if (results) {
        // req.flash('error', 'name is already entered!!!')

      } else {

        models.waiters.create({
          days: req.body.days,
          WaitersName: req.params.username
        }, function(err, results) {
          if (err) {
            return next(err)
          }
          console.log(results);
        })
      }
    })

  res.render('waiter', {
    days: days,
    waitersName: WaitersName
  })
}
// //  console.log(days);
// const admin = function (req, res, next) {
//     var WaitersName = req.params.username;
//     res.render('days');
// }

return {
  home,
  user_name,
  waiter,
  waiters
}
}
