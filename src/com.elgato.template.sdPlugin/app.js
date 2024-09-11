const { exec } = require('child_process');
const moment = require('moment-timezone');

function getTimeRemaining() {
  const now = moment().tz('America/New_York');
  const nextPeriodStart = moment().startOf('day').add(4, 'hours').add(Math.floor(now.hour() / 4) * 4, 'hours');
  if (now.isAfter(nextPeriodStart)) {
    nextPeriodStart.add(4, 'hours');
  }
  const duration = moment.duration(nextPeriodStart.diff(now));
  return {
    hours: Math.floor(duration.asHours()),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
}

function updateButton(state) {
  const remainingTime = getTimeRemaining();
  state.setState({
    text: `${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`
  });
}

module.exports = (action, state) => {
  updateButton(state);
  setInterval(() => {
    updateButton(state);
  }, 1000);
};
