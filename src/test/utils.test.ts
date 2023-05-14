const fs = require('fs')

const utils = require('../utils')

let mockFs
afterEach(() => {
    mockFs.mockRestore()
})
beforeEach(() => {
    mockFs = jest.spyOn(fs, 'readFileSync')
})
test('read text file', () => {
    const expectValue = ' \n '
    mockFs.mockReturnValue(expectValue)
    expect(utils.readFile('./package.json')).toBe(expectValue)
})
test('read object file', () => {
    const expectValue = {
        a: 'b'
    }
    mockFs.mockReturnValue(JSON.stringify(expectValue))
    expect(utils.readObjectFromFile('./package.json')).toStrictEqual(expectValue)
})
test('read package file', () => {
    const f = require('../utils')
    const expectValue = {
        a: 'c'
    }
    mockFs.mockReturnValue(JSON.stringify(expectValue))
    expect(f.readPackageFile()).toStrictEqual(expectValue)
})
test('read array from  file', () => {
    const inputValue = 'hello\nthere'
    const expectValue = ['hello', 'there']
    mockFs.mockReturnValue(inputValue)
    expect(utils.readArrayFromFile('.ksjhdfkh')).toStrictEqual(expectValue)
})
