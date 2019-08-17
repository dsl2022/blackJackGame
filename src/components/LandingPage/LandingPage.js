import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends React.Component{
    render(){
        return(
            <div className='landing-page'>
                     <Link className='landing-play-btn' to='/blackjack'>
                         Play
                         </Link>       
            </div>
        )
    }
}

export default LandingPage;