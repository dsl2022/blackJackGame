import React from 'react';
import UserBox from '../userBox'
import HouseBox from '../HouseBox'
import cardApiServices from '../../Services/CardService'
import UserBetControl from '../UserBetControl/UserBetControl';
import './GameFrame.css'


class GameFrame extends React.Component {
  state={
    chip:500,
    chipBetRecord:[],
    userCardData:[],
    houseCardData:[],
    deckId:'',
    houseFinished:false,     
    isStandForUser:false,
    isGameStarted:false,  
    cardRemaining:54 // initial value, avoid reshuffled before creating new deck. 
  }
  
  // make a new deck and update state with the deckId for all subsequence draw or shuffle
  async componentDidMount(){       
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
    )
    const jsonData = await response.json()    
    this.setState({deckId:jsonData.deck_id,
                    cardRemaining:Number(jsonData.remaining)})        
  }

// reset state after each deal is invoked
    resetGameState=()=>{
      this.setState({
        userCardData:[],
        houseCardData:[],                
        isStandForUser:false,
        isGameStarted:false,
        houseFinished:false
      })
    }

// handler starts each round of deal. 
   onStartGame = async (deckId)=>{    
    if(this.state.isGameStarted){
      this.resetGameState()
    }
    try{
      const jsonDataUser = await cardApiServices.drawCards(this.state.deckId,2)
      const jsonDataHouse = await cardApiServices.drawCards(this.state.deckId,1)    
      this.setState({
        userCardData:jsonDataUser.cards,
        houseCardData:jsonDataHouse.cards,     
        cardRemaining:Number(jsonDataHouse.remaining),
        isGameStarted:true})
    }catch(error){
      console.log(error)
      window.location.reload(true)            
    }
  }

  
  userBustHandle=(cardValue,cardData)=>{
    if(cardApiServices.onCheckBusted(cardValue,cardData)){
      this.setState({isBusted:true}) 
      
    }
  }
  // draw one card handler for player
  onDrawOneCardUser = async ()=>{  
    try{
      const jsonData = await cardApiServices.drawCards(this.state.deckId,1)
      const cardValue = cardApiServices.carValueHandle(jsonData.cards[0].value)
    
      this.userBustHandle(cardValue,this.state.userCardData)
      this.setState({
        userCardData:this.state.userCardData.concat(jsonData.cards),
        cardRemaining:Number(jsonData.remaining)
      })
    }
    catch(error){
      console.log(error)
    }                
  }

  onDrawOneCardHouse = async ()=>{
    const jsonData = await cardApiServices.drawCards(this.state.deckId,1)

    this.setState({
      houseCardData:this.state.houseCardData.concat(jsonData.cards),
    }) 
    // console.log(cardApiServices.calculateCardValue(this.state.houseCardData)-cardApiServices.aceCount(this.state.houseCardData)*10,'test inside house draw')
    // if house card values is greater than 16, update state house is finished. 
    if(cardApiServices.calculateCardValue(this.state.houseCardData)-cardApiServices.aceCount(this.state.houseCardData)*10>=16){
      console.log(cardApiServices.calculateCardValue(this.state.houseCardData)-cardApiServices.aceCount(this.state.houseCardData)*10,'ran house finished')
      this.setState({houseFinished:true})
    }
  }
  
  // handler for updating user stand
  onStand = ()=>{   
    this.setState({isStandForUser:true})               
  }

  onUpdateChip=(chip)=>{
    this.setState({chip:chip})
  }

  // onHouseFinished=()=>{
  //   this.setState({houseFinished:true})
  // }
 
  render(){
    console.log(this.state,'test state')   
    if(this.state.cardRemaining<10){
      cardApiServices.shuffleCard(this.state.deckId)
    }
    return (
      <div className="App">          
      <div className='game-frame'>
        <UserBox                     
          drawOneCard={this.onDrawOneCardUser}         
          onStand = {this.onStand}          
          isGameStarted = {this.state.isGameStarted}       
          userCardData = {this.state.userCardData}
          isStand = {this.state.isStandForUser}
        />
        <HouseBox

          drawOneCard={this.onDrawOneCardHouse}
          isUserStand = {this.state.isStandForUser}
          houseCardData={this.state.houseCardData}
          // onHouseFinished={this.onHouseFinished}
          />          
          </div>
          <UserBetControl 
          drawOneCard={this.onDrawOneCardUser} 
            userCardData={this.state.userCardData}
            houseCardData={this.state.houseCardData}
            chip = {this.state.chip}
            isUserStand={this.state.isStandForUser}
            onUpdateChip = {this.onUpdateChip}
            isHouseFinished={this.state.houseFinished}
            onStand = {this.onStand}          
            isGameStarted = {this.state.isGameStarted}  
            onStartGame = {this.onStartGame}
          />
          
      </div>
    )
  }
}

export default GameFrame;
