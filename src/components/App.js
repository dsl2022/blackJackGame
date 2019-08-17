import React from 'react'
import GameFrame from './GameFrame/GameFrame'
import {Route,Switch} from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import './App.css';
<<<<<<< HEAD
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
=======
// import ControlBox from './ControlBox'
import UserBox from './userBox'
import HouseBox from './HouseBox'
import cardApiServices from '../Services/CardService'
import UserBetControl from './UserBetControl';



class App extends React.Component {
  state={
    chip:500,
    userCardData:[],
    houseCardData:[],
    deckId:'',
    // houseValue:0,       
    isStandForUser:false,
    isGameStarted:false, 
    isBlackJack:false, // those are derivative state, not a good practice. 
    cardRemaining:0
  }
  
  
  async componentDidMount(){       
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
    )
    const jsonData = await response.json()    
    this.setState({deckId:jsonData.deck_id,
                    cardRemaining:Number(jsonData.remaining)})        
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
        // isBusted:false,
        // houseValue:0,                   
        isStandForUser:false,
        isGameStarted:false,
        isBlackJack:false,
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
    try{
      const jsonDataUser = await cardApiServices.drawCards(this.state.deckId,2)
      const jsonDataHouse = await cardApiServices.drawCards(this.state.deckId,1)    
      const userCard_1 = cardApiServices.carValueHandle(jsonDataUser.cards[0].value)
      const userCard_2 = cardApiServices.carValueHandle(jsonDataUser.cards[1].value)
       
      // const houseInitialValue = cardApiServices.carValueHandle(jsonDataHouse.cards[0].value)    
      this.checkBlackJack(userCard_1,userCard_2)    
      this.onCheckIsAce(userCard_1)
      this.onCheckIsAce(userCard_2)
      this.setState({
        userCardData:jsonDataUser.cards,
        houseCardData:jsonDataHouse.cards,     
        // houseValue:houseInitialValue,
        cardRemaining:Number(jsonDataHouse.remaining),
        isGameStarted:true})
    }catch(error){
      console.log(error)
      window.location.reload(true)
      
      
    }
    
        
  }

 
  onCheckBusted= async (cardValue)=>{
    const currentValue = cardApiServices.calculateCardValue(this.state.userCardData)
    const maxValue = currentValue+cardValue-(cardApiServices.aceCount(this.state.userCardData)*10)
    
    if(maxValue>21){
      this.setState({isStandForUser:true})      
    }
  }
  
  userBustHandle=(cardValue,cardData)=>{
    if(cardApiServices.onCheckBusted(cardValue,cardData)){
      this.setState({isStandForUser:true}) 
      
    }
  }
  

  onDrawOneCardUser = async ()=>{  
    try{
      const jsonData = await cardApiServices.drawCards(this.state.deckId,1)
    const cardValue = cardApiServices.carValueHandle(jsonData.cards[0].value)
    console.log(cardValue,'test card value')
    // this.userBustHandle(cardValue,this.state.userCardData)
    this.userBustHandle(cardValue,this.state.userCardData)
    if(!this.state.isStandForUser){this.setState({
        userCardData:this.state.userCardData.concat(jsonData.cards),
        cardRemaining:Number(jsonData.remaining)
      })}
    }
    catch(error){
      console.log(error)
    } 
    
               
    }

  onDrawOneCardHouse = async ()=>{
    const jsonData = await cardApiServices.drawCards(this.state.deckId,1)
    // const cardValue = cardApiServices.carValueHandle(jsonData.cards[0].value)
    console.log(jsonData.cards,'test card value inside on draw house')
    this.setState({
      houseCardData:this.state.houseCardData.concat(jsonData.cards),
      // houseValue:this.state.houseValue+cardValue
    }) 
    }
  

  onStand = ()=>{   
    this.setState({isStandForUser:true})               
  }

  onUpdateChip=(chip)=>{
    this.setState({chip:chip})
  }
 
  render(){
    console.log(this.state,'test state') 
    console.log(this.props,'test props')   
    if(this.state.cardRemaining<10){
      cardApiServices.shuffleCard(this.state.deckId)
    }
    return (
      <div className="App">
       
          <button onClick={this.onStartGame}>Deal</button>
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
          // CardImages = {this.state.houseCardImage}
          // houseValue = {this.state.houseValue}
          houseCardData={this.state.houseCardData}
          />          
          </div>
          <UserBetControl 
            userCardData={this.state.userCardData}
            houseCardData={this.state.houseCardData}
            chip = {this.state.chip}
            onUpdateChip = {this.onUpdateChip}
          />
         
      </div>
    )
  }
>>>>>>> 26188c62ad70134173d0fb3adb8f81c8c2f39791
}

export default App;