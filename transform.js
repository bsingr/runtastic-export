const fs = require('fs');
const activities = require('./activities.json');
let success = 0;
let errors = 0;
activities.filter(a => a).map(a => {
  const activityPath = './activities/'+a[1]+'-'+a[0]+'.json';
  try {
    const activity = JSON.parse(fs.readFileSync(activityPath))
    const id = new Date(activity.data.attributes.start_time).toISOString();
    fs.writeFileSync('export-runs/' + id + '.json', JSON.stringify(activity.traces.gps.map(trace => {
      return {
        timestamp: new Date(trace.timestamp).toISOString(),
        longitude: trace.longitude,
        latitude: trace.latitude,
        altitude: trace.altitude
      }
    })))
    success++;
  } catch (e) {
    console.log(e, activityPath)
    errors++;
  }
})
console.log('ok', success, 'error', errors)
