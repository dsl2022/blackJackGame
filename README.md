## Introduction

This is my first Blackjack game, and it's an interview assignment. This project is built with ReactJS, and the Api I used is [Deck of Cards](https://deckofcardsapi.com/) by [Chase Roberts](https://twitter.com/crobertsbmw). 

The game currently includes nearly all features of a standard Blackjack game, such as Hit, Stand, and Deal and betting chips. except that I did not implement the Split feature due to the lack of time. 

The biggest 
Challenge of this project to me has been the task of managing its state, such as updating and keeping track of the card values, especially when an Ace is drawn, it will have two possible values for the player. and the logicals for deciding the winner, keeping track of a BlackJack or Bust, and as well as deciding when to automatically restart the game when chips are low. 

If I were to redo the project, I would definitely try to design a better state, as some of the properties in the current state are derivatives, e.g `houseFinished:false`. Also, for managing the state better, I would try using context or perhaps React Hook in the future. 


## Additional features coming 
I will plan to implement the following additonal features.

* Betting Validator(currently betting is not mandatory)
* Deal button validator
* Split option
* Background music(including on and off switch)
* Change background picture


## Snapshots of the game

!['src/assets/snapshot/landing.png']



## Technology Stack

ReactJS
Javascript
HTML
CSS
API

