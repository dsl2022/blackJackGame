import React from 'react'
import {Link} from 'react-router-dom'
import './GameRule.css'

class GameRule extends React.Component{
    render(){
        return(
            <div className='game-rule'>
                <div className='home-link'>
                <Link className='landing-btn control-btn' to='/'>
                        Home
                    </Link> 
                </div> 
                <div className='rule-intro'>
                <h2>BlackJack Rule</h2>
                <article>
                <h3>General rules</h3>
                <p> 
                All face cards scores 10 points, an Ace can be either 1 point or 11 point. 
                If the first two cards are an Ace and any of the face cards, or a 10. Then 
                a BlackJack is made. Otherwise, player can place bet and continue to hit
                until the player either gets busted or choose to Stand. A player gets busted
                if his or her card values are more than 21 (if there is any Aces in the player's hand,
                 the smaller value will be used to determine if player gets busted). If player
                 choose to stand, dealer will start drawing cards. If both player and dealer get
                 busted, Dealer wins. If user gets busted, dealer automatically wins. If neither 
                 gets busted, the one who has bigger value wins. 
                </p>
                <h3>The Deck</h3>
                <p>There are 5 decks of cards are used when a new game is started, the 
                decks are automatically reshuffled each round. </p>

                <h3>Betting</h3>
                
                <p>There are 3 categories of chips, 20,50 and 100. Once you start a Deal,
                you can start to bet according. Player is given 500 chips by default,
                when your remaining chips are less than 20, you will be prompted to start a new 
                game. </p>

                
                </article>
                </div>
            </div>
        )
    }
}

export default GameRule