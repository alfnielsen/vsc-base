import React, { useState, useEffect, ReactNode } from 'react'

import styles from './MethodTest.module.scss'

interface MethodTestProps {
   initialArgs: { [key: string]: string }
   onClickCall: (
      args: { [key: string]: string },
      setResult: (str: ReactNode) => void
   ) => void
}

const MethodTest = ({ initialArgs, onClickCall }: MethodTestProps) => {
   const [args, setArgs] = useState(initialArgs)
   const [result, setResult] = useState('' as ReactNode)
   const items = []
   useEffect(() => {
      onClickCall && onClickCall(args, (str: ReactNode) => setResult(str))
   }, [args])
   const change = (key: string, value: string) => {
      const nextArgs = {
         ...args,
         [key]: value
      }
      setArgs(nextArgs)
      //		onClickCall && onClickCall(nextArgs, (str: string) => setResult(str))
   }
   for (let key in initialArgs) {
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
                     change(key, initialArgs[key])
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

export default MethodTest
