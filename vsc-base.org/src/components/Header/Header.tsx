import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => (
   <div className={styles.header}>
      <NavLink className={styles.logo} to='/'>
         <span>vsc-base.org</span>
      </NavLink>
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
