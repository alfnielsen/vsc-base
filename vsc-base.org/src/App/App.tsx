import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import useReactRouter from 'use-react-router'
import AllAnnotations from 'allAnnotations/AllAnnotations'
import Header from 'components/Header/Header'
import HighlightedCode from 'components/HighlightedCode/HighlightedCode'
import Home from '../pages/home/Home'
import Scripts from '../pages/scripts/Scripts'
import styles from './App.module.scss'

const App = () => {
   return (
      <div className={styles.App}>
         <Header />
         <Switch>
            <Route path='/scripts' component={Scripts} />
            <Route path='*' component={Home} />
         </Switch>
      </div>
   )
}
export default App
