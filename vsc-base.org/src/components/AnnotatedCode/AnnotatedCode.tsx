import React, { ReactNode, useEffect, useState, JSXElementConstructor } from 'react'
import Prism from 'prismjs'
//@ts-ignore
import 'prismjs/components/prism-typescript'
import cx from 'classnames'

import styles from './AnnotatedCode.module.scss'
import CopyToClipboard from 'react-copy-to-clipboard'
import AnimateHeight from 'react-animate-height'
import HighlightedCode from 'components/HighlightedCode/HighlightedCode'

interface AnnotatedCodeProps {
   annotation: ReactNode
   code: string
   codeEx: string
   title: string
   test?: ReactNode
   small?: boolean
   description?: ReactNode
}

const AnnotatedCode = ({
   title,
   annotation,
   test,
   code,
   codeEx,
   small = true,
   description = null
}: AnnotatedCodeProps) => {
   const [showAll, setShowAll] = useState(!small)
   const [copyEx, setCopyEx] = useState(false)
   const [copyCode, setCopyCode] = useState(false)
   useEffect(() => {
      Prism.highlightAll()
   }, [code, showAll])
   const copy = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      setter(true)
      setTimeout(() => setter(false), 2000)
   }
   return (
      <>
         <div className={cx(styles.wrapTop, { [styles.wrapTopFull]: showAll })}>
            <div className={styles.annotation}>
               <div
                  className={styles.title}
                  onClick={() => {
                     setShowAll(!showAll)
                  }}
               >
                  {title}
                  <div className={styles.arrow}> {showAll ? '▲' : '▼'} </div>
               </div>
            </div>
            <HighlightedCode className={styles.codeArea} code={codeEx} />
         </div>
         <AnimateHeight
            duration={120}
            height={showAll ? 'auto' : 0} // see props documentation bellow
         >
            <div className={styles.wrapFull}>
               <div className={styles.annotation}>
                  <div className={styles.description}>{annotation}</div>
               </div>
               <HighlightedCode className={styles.codeArea} code={code} />
               <div className={styles.test}>{test}</div>
            </div>
         </AnimateHeight>
         <div className={styles.seperator} />
      </>
   )
}

export default AnnotatedCode
