import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import User from './user'
import Admin from './admin'
 
ReactDOM.render(
    <React.StrictMode>
       <Router>
        <h2>Page principale à la racine</h2>
           <switch>
            <Route path="/admin">
                <Admin />
                </Route>
                <Route path='/user'>
                    <User/>
                </Route>
               </switch>
               </Router>
    </React.StrictMode>,
    document.getElementById('root')
)