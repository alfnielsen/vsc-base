//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it

// import {  } from 'simple-mock'

import * as vsc from '../vsc-base-development/vsc-base'

// Defines a Mocha test suite to group tests of similar kind together
suite('Vsc base Raw Tests', function () {
   // Defines a Mocha unit test
   suite('getSubRelativePathFromAbsoluteRootPath', () => {
      test(' 1', () => {
         const r1 = vsc.getSubRelativePathFromAbsoluteRootPath(
            'c:/root/modules/file1.js',
            'modules/file2.js',
            'c:/root/'
         )
         assert.equal(r1, './file2.js')
      })
   })
   suite('addLeadingLocalDash', () => {
      test(' 1', () => {
         const r1 = vsc.addLeadingLocalDash(
            'file1.js',
         )
         assert.equal(r1, './file1.js')
      })
   })
   suite('relativePathToAbsolutePath', () => {
      test(' 1', () => {
         const r1 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.js',
            '../file2',
            'c:/root/'
         )
         assert.equal(r1, 'file2')
      })
      test(' 2', () => {
         const r2 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.ts',
            './file2',
            'c:/root/'
         )
         assert.equal(r2, 'modules/file2')
      })
      test(' 3', () => {
         const r3 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.tsx',
            './sub/file2',
            'c:/root/'
         )
         assert.equal(r3, 'modules/sub/file2')
      })
      test(' 4', () => {
         const r4 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.jsx',
            'modules/file3',
            'c:/root/'
         )
         assert.equal(r4, 'modules/file3')
      })

      test(' 5', () => {
         const r5 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.jsx',
            'react',
            'c:/root/'
         )
         assert.equal(r5, 'react') // besuce it looks like an absolute path!
      })
      test(' 6', () => {
         const r6 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.js',
            '../modules/file2',
            'c:/root/'
         )
         assert.equal(r6, 'modules/file2')
      })
      test(' 7', () => {
         const r7 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.js',
            '../modules2/file4',
            'c:/root/'
         )
         assert.equal(r7, 'modules2/file4')
      })
      test(' 8', () => {
         const r8 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/file1.js',
            '../file2',
            'c:/root'
         )
         assert.equal(r8, 'file2')
      })
      test(' 9', () => {
         const r9 = vsc.getAbsolutePathFromRelativePath(
            'c:/root/modules/sub/sub2/file1.js',
            '../../file2',
            'c:/root'
         )
         assert.equal(r9, 'modules/file2')
      })
   })
   suite('cleanPath', () => {
      test('1', () => {
         const r1 = vsc.cleanPath('c:/root/modules/../file1.js')
         assert.equal(r1, 'c:/root/file1.js')
      })
      test('2', () => {
         const r1 = vsc.cleanPath('c:/root/modules/../../file1.js')
         assert.equal(r1, 'c:/file1.js')
      })
      test('3', () => {
         const r1 = vsc.cleanPath('c:/root/modules/../.././file1.js')
         assert.equal(r1, 'c:/file1.js')
      })
      test('4', () => {
         const r1 = vsc.cleanPath('c:/root/./file1.js')
         assert.equal(r1, 'c:/root/file1.js')
      })
      test('5', () => {
         const r1 = vsc.cleanPath(
            'c:/root/../sub1/sub2/sub3/sub4/../sub4/../../sub3/sub4/file1.js'
         )
         assert.equal(r1, 'c:/sub1/sub2/sub3/sub4/file1.js')
      })
   })
   suite('toKebabCase', () => {
      test('1', () => {
         const r1 = vsc.toKebabCase('myNameIsName')
         assert.equal(r1, 'my-name-is-name')
      })
      test('2', () => {
         const r1 = vsc.toKebabCase('MyNameIsName')
         assert.equal(r1, 'my-name-is-name')
      })
      test('3', () => {
         const r1 = vsc.toKebabCase('my.NameIsName')
         assert.equal(r1, 'my.-name-is-name')
      })
   })
   suite('splitPath', () => {
      test('1', () => {
         const r1 = vsc.splitPath('c:/root/sub/file')
         assert.equal(r1[0], 'c:/root/sub')
         assert.equal(r1[1], 'file')
      })
      test('2', () => {
         const r1 = vsc.splitPath('sub/file')
         assert.equal(r1[0], 'sub')
         assert.equal(r1[1], 'file')
      })
      test('3', () => {
         const r1 = vsc.splitPath('sub/file.js')
         assert.equal(r1[0], 'sub')
         assert.equal(r1[1], 'file.js')
      })
      test('4', () => {
         const r1 = vsc.splitPath('c:/sub/sin/./file.js')
         assert.equal(r1[0], 'c:/sub/sin/.')
         assert.equal(r1[1], 'file.js')
      })
   })
   suite('getJsonParts', () => {
      const j = {
         t: { t2: { n: 'Yes' }, nb: '1' },
         j: false,
         f: { d: { f: [1] }, f: false, t: true, n: 12 }
      }
      test('1', () => {
         const r = vsc.getJsonParts(j, 't.t2.n')
         assert.equal(r, 'Yes')
      })
      test('2', () => {
         const r = vsc.getJsonParts(j, 't.t2.y')
         assert.equal(r, undefined)
      })
      test('3', () => {
         const r = vsc.getJsonParts(j, 't.t3.d.e.d')
         assert.equal(r, undefined)
      })
      test('4', () => {
         const r = vsc.getJsonParts(j, 't.nb')
         assert.equal(r, '1')
      })
      test('5', () => {
         const r = vsc.getJsonParts(j, 'j')
         assert.equal(r, false)
      })
      test('6', () => {
         const r = vsc.getJsonParts(j, 'f.d.f')
         assert.equal(r.length, 1)
         assert.equal(r[0], 1)
      })
      test('7', () => {
         const r = vsc.getJsonParts(j, 'f.f')
         assert.equal(r, false)
      })
      test('8', () => {
         const r = vsc.getJsonParts(j, 'f.t')
         assert.equal(r, true)
      })
      test('9', () => {
         const r = vsc.getJsonParts(j, 'f.n')
         assert.equal(r, 12)
      })
   })
   suite('isSubPath', () => {
      test('1', () => {
         const r = vsc.isSubPath('c:/root/sub/sub2/files', 'c:/root')
         assert.equal(r, true)
      })
      test('2', () => {
         const r = vsc.isSubPath('c:/other/sub/sub2/files', 'c:/root')
         assert.equal(r, false)
      })
      test('3', () => {
         const r = vsc.isSubPath('c:/root/sub/sub2/files', 'c:/root/')
         assert.equal(r, true)
      })
      test('4', () => {
         const r = vsc.isSubPath('c:/root/sub/sub2/files', 'c:/root/s')
         assert.equal(r, false)
      })
   })
   suite('toCamelCase', () => {
      test('1', () => {
         const r = vsc.toCamelCase('my-css-name')
         assert.equal(r, 'myCssName')
      })
      test('2', () => {
         const r = vsc.toCamelCase('my.css.name')
         assert.equal(r, 'myCssName')
      })
      test('3', () => {
         const r = vsc.toCamelCase('MyName')
         assert.equal(r, 'myName')
      })
   })
})
