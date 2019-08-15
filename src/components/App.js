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
    houseCardImage:[]
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
      const specialValue = {'JACK':11,'QUEEN':12,'KING':13,'ACE':1}
      
      if(value in specialValue){
        console.log(specialValue[value],'test speical')
        return specialValue[value]
      }else{
        return Number(value)
      }
    }

   onStartGame = async (deckId)=>{       
    const jsonDataUser = await this.drawCards(deckId,2)
    const jsonDataHouse = await this.drawCards(deckId,2)
    
    const userInitialValue = this.carValueHandle(jsonDataUser.cards[0].value)+this.carValueHandle(jsonDataUser.cards[1].value)
    const houseInitialValue = this.carValueHandle(jsonDataHouse.cards[0].value)+this.carValueHandle(jsonDataHouse.cards[1].value)
    console.log(jsonDataUser,jsonDataHouse,'test data on start')
    this.setState({
      userValue:userInitialValue,
      houseValue:houseInitialValue,
      userCardImages:[...this.state.userCardImages,
        jsonDataUser.cards[0].image,
        jsonDataUser.cards[1].image],
      houseCardImage:[...this.state.houseCardImage,
        jsonDataHouse.cards[0].image,
        jsonDataHouse.cards[1].image
        ]})
        
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

  onStand = ()=>{
    this.onDrawOneCardHouse() 
    console.log(this.state)
  }

  render(){
    
    console.log(this.state.userValue,this.state.houseValue,'test user and house values')
    return (
      <div className="App">
       
          <button onClick={this.onStartGame}>Start</button>
        <UserBox           
          updateUserVal={this.updateUserVal}
          drawOneCard={this.onDrawOneCardUser}
          CardImages = {this.state.userCardImages}
          onStand = {this.onStand}
        />
        <HouseBox

          drawOneCard={this.onDrawOneCardUser}
          CardImages = {this.state.houseCardImage}
          />
      </div>
    )
  }
}

export default App;
