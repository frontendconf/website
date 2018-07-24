import fecha from 'fecha'

function formatDate (timestamp, format = 'D MMM YYYY') {
  return timestamp ? fecha.format(new Date(timestamp), format) : null
}

function formatTime (timestamp, format = 'shortTime') {
  return timestamp ? fecha.format(new Date(timestamp), format) : null
}

function formatYear (timestamp, format = 'YY') {
  return timestamp ? fecha.format(new Date(timestamp), format) : null
}

export default {
  formatDate,
  formatTime,
  formatYear
}
