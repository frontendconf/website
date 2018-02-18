import fecha from 'fecha'

function formatDate (timestamp, format = 'D MMM YYYY') {
  return fecha.format(new Date(timestamp), format)
}

function formatTime (timestamp, format = 'shortTime') {
  return fecha.format(new Date(timestamp), format)
}

function formatYear (timestamp, format = 'YY') {
  return fecha.format(new Date(timestamp), format)
}

export default {
  formatDate,
  formatTime,
  formatYear
}
