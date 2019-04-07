import React, { ReactNode } from 'react'

import styles from './Header.module.scss'

const Header = () => (
   <div className={styles.header}>
      <a className={styles.logo} href='/'>
         <span>vsc-base.org</span>
         <span className={styles.logoNote}>
            {' '}
            - Visual Studio Code Script and Extension Base
         </span>
      </a>
      <ul className={styles.mainNav}>
         <li>
            <a
               href='https://github.com/alfnielsen/vsc-base'
               className={styles.github}
            >
               open-source
            </a>
         </li>
      </ul>
   </div>
)

export default Header
