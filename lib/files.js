const fs = require('fs')
const util = require('util')
const events = require('./events')

require('./logger')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const files = {}

files.loadFile = file => readFile(file)

files.saveFile = (file, buffer) => writeFile(file, buffer)

files.convertBuffer = buffer => {
  // should take in a buffer and return a new Buffer
  // which has the capitalized contents of the input buffer
  console.log(buffer)
  const capitalized = buffer.toString().trim().toUpperCase()
  return Buffer.from(capitalized, 'utf-8')
}

files.alterFile = async (file) => {
  try {
    console.log(file)
    // load some file into a buffer
    const buffer = await files.loadFile(file)
    // convert the buffer into a uppercased version of its string representation
    const convertedBuffer = files.convertBuffer(buffer)
    // save the file
    await files.saveFile(file, convertedBuffer)
    // on success emit a success status ("0" in UNIX means "success")
    const status = {
      status: 0,
      file: file,
      message: 'saved properly'
    }
    events.emit('altered-success', status)
  } catch (error) {
    // on failure emit a failure status
    const status = {
      status: 1,
      file: file,
      message: error.message
    }
    events.emit('read-write-error ', status)
  }
}

module.exports = files
