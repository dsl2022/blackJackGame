import React from 'react';
import './App.css';
// import ControlBox from './ControlBox'
import UserBox from './userBox'

class App extends React.Component {
  state={
    deckId:'',
    houseValue:0,
    userValue:0,
    drawnCardData:{},
    userCardImages:[]
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

   onDrawCard= async (deckId)=>{    
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`
    )
    const jsonData = await response.json()
    // console.log(jsonData,'test')
    this.setState({drawnCardData:jsonData,userCardImages:[...this.state.userCardImages,jsonData.cards[0].image,jsonData.cards[1].image]})
  }

  onDrawOneCard= async ()=>{
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
    )
    const jsonData = await response.json()
    this.setState({userCardImages:[...this.state.userCardImages,jsonData.cards[0].image]})
    console.log(jsonData,'test draw one card')
  }

  // onUpdateUserCardImages=()={

  // }

  render(){
    
    console.log(this.state,'test drawcard data')
    return (
      <div className="App">
       
          <button onClick={this.onDrawCard}>Start</button>
        <UserBox 
          cardData={this.state.drawnCardData}
          updateUserVal={this.updateUserVal}
          drawOneCard={this.onDrawOneCard}
          userCardImages = {this.state.userCardImages}
        />
      </div>
    )
  }
}

export default App;
