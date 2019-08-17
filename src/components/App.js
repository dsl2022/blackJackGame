import React from 'react'
import GameFrame from './GameFrame/GameFrame'
import {Route,Switch} from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import './App.css';
class App extends React.Component{
    render(){
        return(

            <Switch>
                <Route 
                    exact path='/' component={LandingPage} />
                <Route
                    path='/blackjack' component={GameFrame}/>    
            </Switch>
            
        )
    }
}

export default App;