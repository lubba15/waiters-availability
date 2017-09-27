module.exports = function(models) {
  const home = function(req, res) {
    res.render('index');
  }

  const user_name = function(req, res, next) {
    var WaitersName = req.body.username
    res.redirect('waiter/' + WaitersName)
    // console.log(name);
  }
  const waiter = function(req, res, next) {
    var WaitersName = req.params.username;
    models.waiters.findOne({
      WaitersName: req.params.username
    }, function(err, results) {
      if (err) {
        return next(err)
      }
      console.log('user_name:', WaitersName);
      if (WaitersName) {

        res.render('waiter', {
          days: results.day,
          waitersName: WaitersName
        })
      }
    })
  }
  const waiters = function(req, res, next) {
    var WaitersName = req.params.username;
    var days = req.body.days;
    models.waiters.findOne({
      WaitersName: req.params.username
    }, function(err, result) {
      if (err) {
        return next(err)
      }
      if (result) {
        result.days = req.body.days;
        result.save(function(err) {
          if (err) {
            return next(err)
          }
        })
        res.render('waiter', {
          days: days,
          waitersName: WaitersName
        })
      }

      if (!result) {
        models.waiters.create({
          days: req.body.days,
          WaitersName: req.params.username
        }, function(err, results) {
          if (err) {
            return next(err)
          }
          res.render('waiter', {
            days: days,
            waitersName: WaitersName
          })
        })
      }
    })
  }

  function Colors(userDays) {
    if (userDays < 3) {
      return 'firstColor'
    } else
    if (userDays === 3) {
      return 'secondColor'
    } else
    if (userDays > 3) {
      return 'thirdColor'
    }
  }


  const admin = function(req, res, next) {
    models.waiters.find({},
      function(err, results) {
        if (err) {
          return next(err)
        }
        var data = [{
            day: 'Monday',
            names: []
          },
          {
            day: 'Tuesday',
            names: []
          },
          {
            day: 'Wednesday',
            names: []
          },
          {
            day: 'Thursday',
            names: []
          },
          {
            day: 'Friday',
            names: []
          },
          {
            day: 'Saturday',
            names: []
          },
          {
            day: 'Sunday',
            names: []
          }
        ]

        console.log(results);

        for (var i = 0; i < results.length; i++) {
          var user_name = results[i].WaitersName;
          var woking_days = results[i].days;
          console.log(user_name);
          for (var a = 0; a < woking_days.length; a++) {

            if (woking_days[a] == 'Monday') {
              data[0].names.push(user_name)
            }

            if (woking_days[a] == 'Tuesday') {
              data[1].names.push(user_name)
            }

            if (woking_days[a] == 'Wednesday') {
              data[2].names.push(user_name)
            }
            if (woking_days[a] == 'Thursday') {
              data[3].names.push(user_name)
            }
            if (woking_days[a] == 'Friday') {
              data[4].names.push(user_name)
            }
            if (woking_days[a] == 'Saturday') {
              data[5].names.push(user_name)
            }
            if (woking_days[a] == 'Sunday') {
              data[6].names.push(user_name)
            }
          }
        }
        // console.log(data[1].names);
        res.render('days', {
          Monday: data[0].names,
          mondayColor: Colors(data[0].names.length),

          Tuesday: data[1].names,
          TuesdayColor: Colors(data[1].names.length),

          Wednesday: data[2].names,
          WednesdayColor: Colors(data[2].names.length),

          Thursday: data[3].names,
          ThursdayColor: Colors(data[3].names.length),

          Friday: data[4].names,
          FridayColor: Colors(data[4].names.length),

          Saturday: data[5].names,
          SaturdayColor: Colors(data[5].names.length),

          Sunday: data[6].names,
          SundayColor: Colors(data[6].names.length)
        })
      })
  }

  const reset = function(req, res, next) {
    models.waiters.remove({},
      function(err) {
        if (err) {
          return next(err)
        }
        res.render('waiter')
      })
  }

  return {
    home,
    user_name,
    waiter,
    waiters,
    admin,
    reset
  }
}
