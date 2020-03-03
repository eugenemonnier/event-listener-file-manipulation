jest.mock('fs')
const files = require('../lib/files')

describe('files module', () => {
  it('can load a file', () => {
    return files.loadFile('foo.txt')
      .then(contents => {
        expect(Buffer.isBuffer(contents)).toBeTruthy()
      })
  })

  it('can save a file', () => {
    const buffer = Buffer.from('test')
    return files.saveFile('real_legit_file.txt', buffer)
      .then(success => {
        expect(success).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
  })

  it('raises an error if a file is invalid', () => {
    const buffer = Buffer.from('test')
    return files.saveFile(null, buffer)
      .then(success => {
        expect(success).toBeUndefined()
      })
      .catch(err => {
        expect(err.message).toEqual('Invalid file')
      })
  })

  it('can uppercase a buffer of text', () => {
    const lowercase = Buffer.from('abcdef')
    const uppercase = Buffer.from('ABCDEF')
    expect(files.convertBuffer(lowercase)).toEqual(Buffer.from(uppercase))
  })
  describe('alterFile', () => {
    it('works when a good filename is passed', () => {
      return files.alterFile('real_legit_file.txt')
        .then(success => {
          expect(success).toBeUndefined()
        })
        .catch(err => {
          expect(err).toBeUndefined()
        })
    })

    it('fails when a bad filename is passed', () => {
      return files.alterFile(null)
        .then(success => {
          expect(success).toBeFalsy()
        })
        .catch(err => {
          expect(err.message).toEqual('Invalid file')
        })
    })
  })
})
