import React, { useState, useEffect } from 'react'

import styles from './MethodTestPrinter.module.scss'
import { interfaces } from 'mocha';

type MethodWithTestPrinter = {
   testArguments: { [key: string]: string },
   testPrinter: (args: { [key: string]: string }, printResult: (str: string) => void) => void
}

interface MethodTestProps {
   method: MethodWithTestPrinter
}

const MethodTestPrinter = ({method}: MethodTestProps) => {
   const [args, setArgs] = useState(method.testArguments)
   const [result, setResult] = useState('')
   const items = []
   useEffect(() => {
      method.testPrinter && method.testPrinter(args, (str: string) => setResult(str))
   }, [args])
   const change = (key: string, value: string) => {
      const nextArgs = {
         ...args,
         [key]: value
      }
      setArgs(nextArgs)
      //		onClickCall && onClickCall(nextArgs, (str: string) => setResult(str))
   }
   for (let key in method.testArguments) {
      items.push(
         <div key={'input_' + key}>
            <span className={styles.textfieldLabel}>{key}</span>
            <div className={styles.inputWrap}>
               <input
                  className={styles.textfield}
                  name={key}
                  value={args[key]}
                  onChange={e => {
                     change(e.target.name, e.target.value)
                  }}
               />
               <div
                  className={styles.resetter}
                  onClick={() => {
                     change(key, method.testArguments[key])
                  }}
               >
                  r
               </div>
            </div>
         </div>
      )
   }
   return (
      <div className={styles.wrap}>
         <div className={styles.headline}>Try the method</div>
         {items}
         <div className={styles.testResult}>
            <span className={styles.testResultTitle}>result:</span>
            <pre className={styles.testResultBox}>{result}</pre>
         </div>
      </div>
   )
}

export default MethodTestPrinter
