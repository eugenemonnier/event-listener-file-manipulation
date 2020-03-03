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
  const capitalized = buffer.toString().toUpperCase()
  return Buffer.from(capitalized, 'utf-8')
}

files.alterFile = async function (file) {
  try {
    console.log(this)
    const buffer = await this.loadFile(file)
    const convertedBuffer = this.convertBuffer(buffer)
    await this.saveFile(file, convertedBuffer)
    events.emit('altered-success', file)
  } catch (error) {
    events.emit('file-error ', file)
  }
  // load some file into a buffer
  // convert the buffer into a uppercased version of its string representation
  // save the file
  // on success emit a success status ("0" in UNIX means "success")
  // const status = {
  //   status: 0,
  //   file: file,
  //   message: 'Saved Properly'
  // }
  // events.emit('save', status)
  // on failure emit a failure status
  // const status = { status: 1 }, etc.
  
}

module.exports = files
