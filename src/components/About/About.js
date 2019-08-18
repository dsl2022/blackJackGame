import React from 'react'
import {Link} from 'react-router-dom'
import './About.css'
class About extends React.Component{
    render(){
        return(
            <div className='about'>
                <div className='home-link'>
                <Link className='landing-btn control-btn' to='/'>
                        Home
                    </Link> 
                </div>    
                <div className='about-intro'>
                <h2>About</h2>
                <p>
                This is my first Blackjack game, and it's an interview assignment. 
                This project is built with ReactJS, and the Api I used is  
                <a href='https://deckofcardsapi.com/'> Deck of Cards</a> by <a href='https://twitter.com/crobertsbmw'>Chase Roberts</a>. 
                The game currently includes nearly all features of a standard Blackjack game, such as Hit, Stand, and Deal and 
                betting chips. except that I did not implement the Split feature due to the lack of time.

                Thank you for spending time to play it, if you see any bug please let me know.  
                You can visit my <a href='https://github.com/JizongL/blackJackGame.git '>Github</a>
                </p>
                </div>
            </div>
        )
    }
}

export default About