import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router'
import AllAnnotations from '../../allAnnotations/AllAnnotations'
import AllScripts from '../../allScripts/AllScripts'
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode'
import styles from './Scripts.module.scss'

const Scripts = () => {
   const { history, location, match } = useReactRouter()
   const [activeScript, setActiveScript] = useState('')
   useEffect(() => {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
      setActiveScript(id)
      console.log(id)
   }, [location])
   return (
      <div>
         <div className={styles.description}>
            <h2>Scripts</h2>
            <p>
               This page contains scripts for vsc-script and vsc-scaffolding.
            </p>
            <p>
               All script can also be inspiration for solving other problems for
               both vsc-script and extension (using vsc-base)
            </p>
            <h4>Open-source GPL-3</h4>
            <p>
               vsc-base, vsc-script ( and related extension project:
               vsc-scaffolding and vsc-move) are all open-source project
               license's under GNU General Public License v3, as well as the
               source code for this website (vsc-base.org).
            </p>
            <p>
               It is encouraged to use any code you find to make your project
               easier in any way that fits you. (commercial, community or
               private).
               <br />
               The GPL-3 license is only there to project the source from (bad)
               people that will try to make copyright protection on this open
               free and shared community code.
            </p>
         </div>
         <div className={styles.annotatedCode}>
            <h3>
               Scripts
               <span className={styles.titleNote} />
            </h3>
         </div>
         <div>
            <AllScripts activeScript={activeScript} />
         </div>
      </div>
   )
}
export default Scripts
