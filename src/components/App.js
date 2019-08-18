import React from 'react'
import GameFrame from './GameFrame/GameFrame'
import {Route,Switch} from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import About from './About/About'
import GameRule from './Rule/GameRule'
import './App.css';
class App extends React.Component{
    render(){
        return(
          <div className='App'>
            <Switch>
                <Route 
                    exact 
                    path={'/'} 
                    component={LandingPage} />
                <Route
                    path={'/blackjack'} 
                    component={GameFrame}/>   
                <Route 
                    path={'/about'}
                    component={About}/>   
                    <Route 
                    path={'/rule'}
                    component={GameRule}/>   
            </Switch>
            </div>
        )
    }
}

export default App;