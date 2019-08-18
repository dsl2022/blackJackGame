import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends React.Component{
    render(){
        return(
            <div className='landing-page'>
            
                <div className='landing-btn-box'>
                    <Link className='landing-btn control-btn' to='/blackjack'>
                        Play
                    </Link>     
                    <Link className='landing-btn control-btn' to='/rule'>
                        Rule
                    </Link> 
                    <Link className='landing-btn control-btn' to='/about'>
                        About
                    </Link>   
                </div>
            </div>
        )
    }
}

export default LandingPage;