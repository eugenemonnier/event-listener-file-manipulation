const events = require('./events')

const logger = {}

logger.save = payload => {
  console.log(payload)
}

logger.err = payload => {
  console.error(payload)
}

// add an events.on for file save that calls logger.save
events.on('altered-success', (message) => {
  logger.save(message)
})

// add an events.on for file error that calls logger.err
events.on('file-error', (message) => {
  logger.error(message)
})

module.exports = logger
