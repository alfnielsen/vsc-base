import React, { ReactNode, useEffect, useState } from 'react'
import cx from 'classnames'
import Prism from 'prismjs'
//@ts-ignore
import 'prismjs/components/prism-typescript'

import CopyToClipboard from 'react-copy-to-clipboard'

import styles from './HighlightedCode.module.scss'

const HighlightedCode = ({ code, className = '' }: { code: string; className?: string }) => {
   const [copyCode, setCopyCode] = useState(false)
   useEffect(() => {
      Prism.highlightAll()
   }, [code])
   const copy = () => {
      setCopyCode(true)
      setTimeout(() => setCopyCode(false), 2000)
   }
   return (
      <div className={cx(styles.codeArea, className)}>
         <pre className={styles.code}>
            <code className='language-ts'>{code}</code>
         </pre>
         <div className={styles.copyArea}>
            {copyCode && <span className={styles.copiedLabel}>Copied</span>}
            <CopyToClipboard text={code} onCopy={copy}>
               <span className={styles.copy}>✁</span>
            </CopyToClipboard>
         </div>
      </div>
   )
}

export default HighlightedCode
