//vsc-script-name: -test-typescript-base.vsc-script
import * as ts from 'typescript'
import * as vsc from 'vsc-base'

type TestResult = {
   success: boolean,
   errorMessage?: string
}

export async function run(path: string) {
   const testResults: TestResult[] = [];
   tsTransformNode(testResults)

}

const addSuccess = (testResults: TestResult[]) => {
   testResults.push({
      success: true
   })
}
const addError = (testResults: TestResult[], method: string, expect: any, result: any) => {
   testResults.push({
      success: false,
      errorMessage: `Failed in tsTranspile. --- expected: ${JSON.stringify(expect)} --- got: ${JSON.stringify(result)}`
   })
}

const tsTransformNode = (testResults: TestResult[]) => {
   const source = `const foo: string = 'test1'`
   const expect = `const foo = 'test1'`
   const node = ts.createSourceFile('tsTransformNodeFile', source, ts.ScriptTarget.ES2015)
   const result = vsc.tsTransformNode(node, [])
   // if (resultgetText() === expect) {
   //    addSuccess(testResults)
   // } else {
   //    addError(testResults, 'tsTranspile', expect, result)
   // }
}
