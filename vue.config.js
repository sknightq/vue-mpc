const config =
  process.env.NODE_ENV === 'production'
    ? require('./config/pro')
    : require('./config/dev')
module.exports = config
