import * as assert from 'assert'

import * as vsc from '../../vsc-base-development/vsc-base'

suite('ts_tsInsertEnumMember', () => {
   test(' 1', () => {
      const source1 = `
export const enum E1 {}
`
      const res1 = `
export const enum E1 {
   key
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key')
      assert.equal(r1, res1)
   })
   test(' 2', () => {
      const source1 = `
const enum E1 {
}
`
      const res1 = `
const enum E1 {
   key,
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key', undefined, { addNewLeadingComma: true })
      assert.equal(r1, res1)
   })
   test(' 3', () => {
      const source1 = `
export const enum E1 {
   key
}
`
      const res1 = `
export const enum E1 {
   key
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key')
      assert.equal(r1, res1)
   })
   test(' 4', () => {
      const source1 = `
const enum E1 {
   keyO
}
`
      const res1 = `
const enum E1 {
   keyO,
   key
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key')
      assert.equal(r1, res1)
   })
   test(' 5', () => {
      const source1 = `
export const enum E1 {
   keyO,
}
`
      const res1 = `
export const enum E1 {
   keyO,
   key,
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key')
      assert.equal(r1, res1)
   })
   test(' 5', () => {
      const source1 = `
export const enum E1 {}
`
      const res1 = `
export const enum E1 {
    key = 'KEY',
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key', 'KEY', { newIntention: 4, addNewLeadingComma: true })
      assert.equal(r1, res1)
   })
   test(' 6', () => {
      const source1 = `
export const enum E1 {}
`
      const res1 = `
export const enum E1 {
   key = "KEY",
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key', 'KEY', { addNewLeadingComma: true, useDoubleQuotation: true })
      assert.equal(r1, res1)
   })
   test(' 7', () => {
      const source1 = `
export const enum E1 {}
`
      const res1 = `
export const enum E1 {
  key = "KEY"
}
`
      const r1 = vsc.tsInsertEnumMember(source1, 'E1', 'key', 'KEY', { newIntention: 2, useDoubleQuotation: true })
      assert.equal(r1, res1)
   })
})

suite('ts_tsInsertInterfaceMember', () => {
   test(' 1', () => {
      const source1 = `
export interface IE1 {}
`
      const res1 = `
export interface IE1 {
   key: string
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string')
      assert.equal(r1, res1)
   })
   test(' 2', () => {
      const source1 = `
interface IE1 {
}
`
      const res1 = `
interface IE1 {
   key: string
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string')
      assert.equal(r1, res1)
   })
   test(' 3', () => {
      const source1 = `
interface IE1 {
   keyO: string
}
`
      const res1 = `
interface IE1 {
   keyO: string
   key: string
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string')
      assert.equal(r1, res1)
   })
   test(' 4', () => {
      const source1 = `
export interface IE1 {
   keyO: string;
}
`
      const res1 = `
export interface IE1 {
   keyO: string;
   key: string;
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string')
      assert.equal(r1, res1)
   })
   test(' 5', () => {
      const source1 = `
interface IE1 {}
`
      const res1 = `
interface IE1 {
   key: string;
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string', { addNewLeadingSemiColon: true })
      assert.equal(r1, res1)
   })
   test(' 6', () => {
      const source1 = `
export interface IE1 {}
`
      const res1 = `
export interface IE1 {
  key: string;
}
`
      const r1 = vsc.tsInsertInterfaceMember(source1, 'IE1', 'key', 'string', { newIntention: 2, addNewLeadingSemiColon: true })
      assert.equal(r1, res1)
   })
})

suite('ts_tsInsertVariableObjectProperty', () => {
   test(' 1', () => {
      const source1 = `
export const O1 = {}
`
      const res1 = `
export const O1 = {
   key: 'test'
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `'test'`)
      assert.equal(r1, res1)
   })
   test(' 2', () => {
      const source1 = `
export const O1 = {
}
`
      const res1 = `
export const O1 = {
   key: 'test'
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `'test'`)
      assert.equal(r1, res1)
   })
   test(' 3', () => {
      const source1 = `
export const O1 = {
   key0: 't'
}
`
      const res1 = `
export const O1 = {
   key0: 't',
   key: 'test'
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `'test'`)
      assert.equal(r1, res1)
   })
   test(' 4', () => {
      const source1 = `
export const O1 = {
   key0: 't',
}
`
      const res1 = `
export const O1 = {
   key0: 't',
   key: 'test',
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `'test'`)
      assert.equal(r1, res1)
   })
   test(' 5', () => {
      const source1 = `
export const O1 = {
   key0: 't',
}
`
      const res1 = `
export const O1 = {
   key0: 't',
   key: 1,
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `1`)
      assert.equal(r1, res1)
   })
   test(' 6', () => {
      const source1 = `
export const O1 = {}
`
      const res1 = `
export const O1 = {
  key: 1
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `1`, { newIntention: 2 })
      assert.equal(r1, res1)
   })
   test(' 7', () => {
      const source1 = `
export const O1 = {}
`
      const res1 = `
export const O1 = {
  key: 1,
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `1`, { newIntention: 2, addNewTrailingComma: true })
      assert.equal(r1, res1)
   })
   test(' 8', () => {
      const source1 = `
export const O1 = {}
`
      const res1 = `
export const O1 = {
   key: 1,
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `1`, { addNewTrailingComma: true })
      assert.equal(r1, res1)
   })
   test(' 9', () => {
      const source1 = `
const foo = () => {
   export const O1 = {/**/}
}
`
      const res1 = `
const foo = () => {
   export const O1 = {/**/
      key: 1,
   }
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key', `1`, { addNewTrailingComma: true })
      assert.equal(r1, res1)
   })
   test(' 10', () => {
      const source1 = `
export const O1 = {/**/}
`
      const res1 = `
export const O1 = {/**/
   key
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key')
      assert.equal(r1, res1)
   })
   test(' 11', () => {
      const source1 = `
export const O1 = {
   keyO
}
`
      const res1 = `
export const O1 = {
   keyO,
   key
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key')
      assert.equal(r1, res1)
   })
   test(' 12', () => {
      const source1 = `
export const O1 = {
   keyO: 'test'
}
`
      const res1 = `
export const O1 = {
   keyO: 'test',
   key
}
`
      const r1 = vsc.tsInsertVariableObjectProperty(source1, 'O1', 'key')
      assert.equal(r1, res1)
   })
})

suite('ts_tsInsertImport', () => {
   test(' 1', () => {
      const source1 = ``
      const res1 = `import { t } from './t.ts'\n`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts')
      assert.equal(r1, res1)
   })
   test(' 2', () => {
      const source1 = `import { t } from './t.ts'\n`
      const res1 = `import { t } from './t.ts'\n`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts')
      assert.equal(r1, res1)
   })
   test(' 3', () => {
      const source1 = `import { t1 } from './t.ts'\n`
      const res1 = `import { t, t1 } from './t.ts'\n`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts')
      assert.equal(r1, res1)
   })
   test(' 4', () => {
      const source1 = `import { t1 } from './t2.ts'\n`
      const res1 = `import { t1 } from './t2.ts'
import { t } from './t.ts'
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts')
      assert.equal(r1, res1)
   })
   test(' 5', () => {
      const source1 = `import { t1 } from './t2.ts'\n`
      const res1 = `import { t1 } from './t2.ts'
import t from './t.ts'
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 6', () => {
      const source1 = `import { t1 } from './t.ts'\n`
      const res1 = `import t, { t1 } from './t.ts'
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 7', () => {
      const source1 = `const ff = 1`
      const res1 = `import t from './t.ts'
const ff = 1`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 8', () => {
      const source1 = `
import t2 from './t2.ts'

const ff = 1
`
      const res1 = `
import t2 from './t2.ts'
import t from './t.ts'

const ff = 1
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 9', () => {
      const source1 = `
const ff = 1
`
      const res1 = `import t from './t.ts'

const ff = 1
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 10', () => {
      const source1 = `'use strict'


const ff = 1
`
      const res1 = `'use strict'
import t from './t.ts'


const ff = 1
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true })
      assert.equal(r1, res1)
   })
   test(' 11', () => {
      const source1 = ``
      const res1 = `import { t } from "./t.ts"
`
      const r1 = vsc.tsInsertImport(source1, 't', './t.ts', { useDoubleQuotation: true })
      assert.equal(r1, res1)
   })
   test(' 12', () => {
      const source1 = `
import t2 from './t2.ts'
import { t } from './t.ts'
import t3 from './t3.ts'

const ff = 1
`
      const res1 = `
import t2 from './t2.ts'
import { t4, t } from './t.ts'
import t3 from './t3.ts'

const ff = 1
`
      const r1 = vsc.tsInsertImport(source1, 't4', './t.ts')
      assert.equal(r1, res1)
   })
})
