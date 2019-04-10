import React, { ReactNode, useState } from 'react'
import cx from 'classnames'

import styles from './AnnotatedCode.module.scss'
import AnimateHeight from 'react-animate-height'
import HighlightedCode from 'components/HighlightedCode/HighlightedCode'

interface AnnotatedCodeProps {
   id?: string
   annotation: ReactNode
   code: string
   codeOneLineEx?: string
   codeEx?: string
   title: string
   test?: ReactNode
   open?: boolean
   description?: ReactNode
}

const AnnotatedCode = ({
   id,
   title,
   annotation,
   test,
   code,
   codeOneLineEx,
   codeEx,
   open = false
}: AnnotatedCodeProps) => {
   const [showAll, setShowAll] = useState(open)
   return (
      <>
         <div
            id={id}
            className={cx(styles.wrapTop, { [styles.wrapTopFull]: showAll })}
         >
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
            {codeOneLineEx && (
               <HighlightedCode
                  className={styles.codeArea}
                  code={codeOneLineEx}
               />
            )}
         </div>
         <AnimateHeight
            duration={120}
            height={showAll ? 'auto' : 0} // see props documentation bellow
         >
            <div className={styles.wrapFull}>
               <div className={styles.description}>{annotation}</div>
            </div>
            <div className={styles.wrapFullFlex}>
               <div className={styles.sourceWrap}>
                  <h4 className={styles.subtitle}>Source</h4>
                  <HighlightedCode className={styles.codeArea} code={code} />
               </div>
               {test && (
                  <div className={styles.textWrap}>
                     <h4 className={styles.subtitle}>Test</h4>
                     <div className={styles.test}>{test}</div>
                  </div>
               )}
            </div>
            {codeEx && (
               <div className={styles.wrapFull}>
                  <h4 className={styles.subtitle}>Example</h4>
                  <HighlightedCode className={styles.codeArea} code={codeEx} />
               </div>
            )}
         </AnimateHeight>
         <div className={styles.seperator} />
      </>
   )
}

export default AnnotatedCode
