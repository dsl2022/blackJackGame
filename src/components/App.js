import React from 'react';
import './App.css';
// import ControlBox from './ControlBox'
import UserBox from './userBox'
import HouseBox from './HouseBox'
import cardApiServices from '../Services/CardService'
class App extends React.Component {
  state={
    userCardData:[],
    houseCardData:[],
    deckId:'',
    houseValue:0,      
    scores:{house:0,user:0},  
    isStandForUser:false,
    isGameStarted:false, 
    isBlackJack:false, // those are derivative state, not a good practice. 
    // userAceCount:0, // need to redefine. 
    isBusted:false,
  }
  
  
  async componentDidMount(){       
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    )
    const jsonData = await response.json()    
    this.setState({deckId:jsonData.deck_id})        
  }

    drawCards = async (deckId,count) =>{
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${count}`        
      )
      return (!response.ok)?Promise.reject(response.json()):await response.json()
    }

    // start game, two cards are drawn for all players

    carValueHandle=(value)=>{
      const faceCards = {'JACK':10,'QUEEN':10,'KING':10}
      if(value==='ACE'){
        // this.setState({aceCount:this.state.aceCount+1})
        return 11
      }
      else if(value in faceCards){        
        return faceCards[value]
      }else{
        return Number(value)
      }
    }
    checkBlackJack=(card_1,card_2)=>{      
      if(card_1+card_2===21){
        this.setState({isBlackJack:true})
        alert('blackJack') 
      }
    }

    resetGameState=()=>{
      this.setState({
        userCardData:[],
        houseCardData:[],
        isBusted:false,
        houseValue:0,                   
        isStandForUser:false,
        isGameStarted:false,
        isBlackJack:false,
        // userAceCount:0,
        isSplit:false,
      })
    }


   

    onCheckIsAce=(card)=>{
      if(card===11){
        this.setState({userAceCount:this.state.userAceCount+1})
      }
    }

   onStartGame = async (deckId)=>{    
    if(this.state.isGameStarted){
      this.resetGameState()
    }

    const jsonDataUser = await cardApiServices.drawCards(this.state.deckId,2)
    const jsonDataHouse = await cardApiServices.drawCards(this.state.deckId,2)
    
    const userCard_1 = cardApiServices.carValueHandle(jsonDataUser.cards[0].value)
    const userCard_2 = cardApiServices.carValueHandle(jsonDataUser.cards[1].value)
    
 
    const houseInitialValue = cardApiServices.carValueHandle(jsonDataHouse.cards[0].value)
    // console.log(jsonDataUser,jsonDataHouse,'test data on start')
    this.checkBlackJack(userCard_1,userCard_2)    
    // this.onCheckSplit(userCard_1,userCard_2)
    this.onCheckIsAce(userCard_1)
    this.onCheckIsAce(userCard_2)
    this.setState({
      userCardData:jsonDataUser.cards,
      houseCardData:jsonDataHouse.cards,
     
      houseValue:houseInitialValue,
      // userCardImages:[...this.state.userCardImages,
      //   jsonDataUser.cards[0].image,
      //   jsonDataUser.cards[1].image],
      // houseCardImage:[...this.state.houseCardImage,
      //   jsonDataHouse.cards[0].image,        
      //   ],
        isGameStarted:true})
        
  }

  checkBust=(card)=>{
    if(this.state.userAceCount > 0 ){
      if(this.state.userValue-(this.state.userAceCount*10)
        +card>21){
          console.log(this.state.userValue-(this.state.userAceCount*10)
          +card,'test user count with ace')
      this.setState({isBusted:true})}
        
    }
    else if(this.state.userValue+card>21){
      this.setState({isBusted:true})
    }
  }
  onDrawOneCardUser = async ()=>{   
    const jsonData = await cardApiServices.drawCards(this.state.deckId,1)
    const cardValue = cardApiServices.carValueHandle(jsonData.cards[0].value)
    this.checkBust(cardValue)
    this.setState({
        userCardData:this.state.userCardData.concat(jsonData.cards),
        // userCardImages
        // :[...this.state.userCardImages,
        // await jsonData.cards[0].image],
        // userValue:this.state.userValue+cardValue
        })  
         
  }

  onDrawOneCardHouse = async ()=>{
    const jsonData = await this.drawCards(this.state.deckId,1)
    const cardValue = cardApiServices.carValueHandle(jsonData.cards[0].value)
    this.setState({
        houseCardData:this.state.houseCardData.concat(await jsonData.cards),
        // houseCardImage
        // :[...this.state.houseCardImage,
        // jsonData.cards[0].image],
        houseValue:this.state.houseValue+cardValue}) 
  }

  onStand = async ()=>{
   
    this.setState({isStandForUser:true})
    
    while(this.state.houseValue<21){      
      await this.onDrawOneCardHouse(); 
    }
  }

  updateIsSplit=()=>{
    this.setState({isSplit:true})
  }

  render(){
    console.log(this.state,'test state')
    // console.log(this.state.userValue,this.state.houseValue,'test user and house values')
    return (
      <div className="App">
       
          <button onClick={this.onStartGame}>Start</button>
          <div className='game-frame'>
        <UserBox           
          // updateUserVal={this.updateUserVal}
          drawOneCard={this.onDrawOneCardUser}         
          onStand = {this.onStand}
          // isStand = {this.state.isStandForUser}
          isGameStarted = {this.state.isGameStarted}
          // isSplitHandle = {this.updateIsSplit}
          // isSplit = {this.state.isSplit}
          // userValue = {this.state.userValue}
          // aceCount = {this.state.userAceCount}
          // isBusted = {this.state.isBusted}
          userCardData = {this.state.userCardData}
        />
        <HouseBox

          drawOneCard={this.onDrawOneCardUser}
          CardImages = {this.state.houseCardImage}
          houseValue = {this.state.houseValue}
          houseCardData={this.state.houseCardData}
          />
          </div>
      </div>
    )
  }
}

export default App;
