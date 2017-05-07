
const runtastic = require('runtastic-js');
const config = require('./config.json');
const fs = require('fs');
const runtasticApi = new runtastic(config.email, config.password);

runtasticApi.login(function(err, user) {
  if (err) return console.log(err);

  const activities = require('./activities.json');

  Promise.all(activities.filter(a => a).map(a => {
    return new Promise((resolve, reject) => {
      const id = a[0];
      const timestamp = a[1];
      runtasticApi.fetchActivityDetails(id, true, function(err, details) {
        if (err) return reject(err);
        fs.writeFileSync('activities/'+timestamp+'-'+id+'.json', JSON.stringify(details))
        resolve(details)
      });
    })
  }))
  .catch(err => console.err(err))
  .then(() => {
    runtasticApi.logout()
  })

});
