const runtastic = require('runtastic-js');
const config = require('./config.json');
const fs = require('fs');
const runtasticApi = new runtastic(config.email, config.password);

runtasticApi.login(function(err, user) {
  if (err) return console.log(err);

  runtasticApi.fetchActivities(500, {'from': new Date('2016/01/01'), 'to': new Date()}, function(err, activities) {
    fs.writeFileSync('activities.json', JSON.stringify(activities))
  });

  runtasticApi.logout()
});
