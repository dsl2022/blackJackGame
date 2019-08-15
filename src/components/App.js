import React from 'react';
import './App.css';
// import ControlBox from './ControlBox'
import UserBox from './userBox'
import HouseBox from './HouseBox'
class App extends React.Component {
  state={
    deckId:'',
    houseValue:0,
    userValue:0,    
    userCardImages:[],
    userCardSplitHandImages:[],
    houseCardImage:[],
    isStandForUser:false,
    isGameStarted:false,
    isBlackJack:false,
    aceCount:0
  }
  
  
  async componentDidMount(){   
    
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    )
    const jsonData = await response.json()
    
    this.setState({deckId:jsonData.deck_id})
     
    
  }

    onUpdateUserValue=()=>{

    }

    onUpdateHouseValue=()=>{

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
        
        houseValue:0,
        userValue:0,    
        userCardImages:[],
        userCardSplitHandImages:[],
        houseCardImage:[],
        isStandForUser:false,
        isGameStarted:false,
        isBlackJack:false,
        aceCount:0,
        isSplit:false,
      })
    }


    onCheckSplit=(card_1,card_2)=>{
      
      if(card_1===card_2){
        this.setState({isSplit:true})
      }
    }

    onCheckIsAce=(card)=>{
      if(card===11){
        this.setState({aceCount:this.state.aceCount+1})
      }
    }

   onStartGame = async (deckId)=>{    
    if(this.state.isGameStarted){
      this.resetGameState()
    }

    const jsonDataUser = await this.drawCards(deckId,2)
    const jsonDataHouse = await this.drawCards(deckId,1)
    
    const userCard_1 = this.carValueHandle(jsonDataUser.cards[0].value)
    const userCard_2 = this.carValueHandle(jsonDataUser.cards[1].value)
    
    const userInitialValue = userCard_1+userCard_2
    const houseInitialValue = this.carValueHandle(jsonDataHouse.cards[0].value)
    // console.log(jsonDataUser,jsonDataHouse,'test data on start')
    this.checkBlackJack(userCard_1,userCard_2)    
    this.onCheckSplit(userCard_1,userCard_2)
    this.onCheckIsAce(userCard_1)
    this.onCheckIsAce(userCard_2)
    this.setState({
      userValue:userInitialValue,
      houseValue:houseInitialValue,
      userCardImages:[...this.state.userCardImages,
        jsonDataUser.cards[0].image,
        jsonDataUser.cards[1].image],
      houseCardImage:[...this.state.houseCardImage,
        jsonDataHouse.cards[0].image,        
        ],
        isGameStarted:true})
        
  }

  onDrawOneCardUser = async ()=>{   
    const jsonData = await this.drawCards(this.state.deckId,1)
    const cardValue = this.carValueHandle(jsonData.cards[0].value)
    this.setState({
        userCardImages
        :[...this.state.userCardImages,
        jsonData.cards[0].image],
        userValue:this.state.userValue+cardValue
        })  
         
  }

  onDrawOneCardHouse = async ()=>{
    const jsonData = await this.drawCards(this.state.deckId,1)
    const cardValue = this.carValueHandle(jsonData.cards[0].value)
    this.setState({houseCardImage
        :[...this.state.houseCardImage,
        jsonData.cards[0].image],
        houseValue:this.state.houseValue+cardValue}) 
  }

  onStand = async ()=>{
   
    this.setState({isStandForUser:true})
    
    while(this.state.houseValue<16){      
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
          updateUserVal={this.updateUserVal}
          drawOneCard={this.onDrawOneCardUser}
          CardImages = {this.state.userCardImages}
          onStand = {this.onStand}
          isStand = {this.state.isStandForUser}
          isGameStarted = {this.state.isGameStarted}
          isSplitHandle = {this.updateIsSplit}
          isSplit = {this.state.isSplit}
          userValue = {this.state.userValue}
          aceCount = {this.state.aceCount}
        />
        <HouseBox

          drawOneCard={this.onDrawOneCardUser}
          CardImages = {this.state.houseCardImage}
          houseValue = {this.state.houseValue}
          />
          </div>
      </div>
    )
  }
}

export default App;
