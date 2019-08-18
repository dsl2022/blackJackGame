import React from 'react'
import cardApiServices from '../../Services/CardService'
import {Link} from 'react-router-dom'
import chip_20 from '../../assets/chip-20.png'
import chip_50 from '../../assets/chip-50.png'
import chip_100 from '../../assets/chip-100.png'
// import double from '../../assets/double-down.png'
import './UserBetControl.css'
class WinnerDisplay extends React.Component{
  state={
    chip:500,
    chipRecord:[0,0],
    bust:false,
    blackJack:0
    
  }
  // when user card value is greater than 21, it returns true as a way to disable buttons.     
  forcedStand=(userValue,aceCount)=>{
    return (userValue-aceCount*10>21)    
  }

  // check if user got a blackJack. 
  onBlackJack=()=>{
    // if(cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])){
    //   // this.setState({blackJack:true})
    //   return true
    // }
      // this.setState({blackJack:true})
    return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])
  }
  
  // Rendering buttons handler, note: split button is for future inplementation 
  renderButton=(userValue,aceCount)=>{  
        return(
          <>
            <button 
              className= 'control-btn' 
              disabled={ this.onBlackJack() 
                || this.forcedStand(userValue,aceCount) 
                || this.props.isUserStand 
                || this.state.chip<20} 
              onClick={this.props.drawOneCard}>
                  Hit
            </button>
            <button 
              className='control-btn' 
              disabled = { this.onBlackJack() 
                || this.forcedStand(userValue,aceCount)
                ||this.props.isUserStand} 
              onClick={this.onStand}>
                  Stand
            </button>
            {/* <button disabled={!this.props.isSplit} onClick={this.props.isSplitHandle}>Split</button> */}
          </>

        )
      }
  onStand=()=>{
    this.props.onStand()       
    }

  renderValue=(userValue,aceCount)=>{
    if(aceCount>0){
      return(                       
        <h2>{userValue}/{userValue-aceCount*10}</h2>
            )
          }
    else{
      return <h2>{userValue}</h2>
        }
      }
  handleChip=(e)=>{
    this.setState({
      chipRecord:
      [...this.state.chipRecord,Number(e.target.value)]
  })}

  handleDouble=()=>{
    this.setState({
      double:true
    })
  }

 
  onUpdateChip=(bettingTotal,userValue,userAceCount,houseValue,houseAceCount)=>{
    
    console.log(((this.props.isHouseFinished
      &&(userValue-userAceCount*10)>(houseValue-houseAceCount*10))
      ||(houseValue-houseAceCount*10)>21),'test true----')
    console.log((this.props.isHouseFinished
      &&(userValue-userAceCount*10)<(houseValue-houseAceCount*10)
      &&(houseValue-houseAceCount*10)<=21),'test true lost-----')
    // console.log(this.onBlackJack(),'test blackjack ---------')
    if(this.onBlackJack()){
      let newChipTotal = this.state.chip+50                
       this.setState({chip:newChipTotal,chipRecord:[0,0],blackJack:this.state.blackJack+1})
       this.onHandleDeal()
    }
    else if(((this.props.isHouseFinished
      &&(userValue-userAceCount*10)>(houseValue-houseAceCount*10))
      ||(houseValue-houseAceCount*10)>21)){
        let newChipTotal = this.state.chip+bettingTotal          
       this.setState({chip:newChipTotal,chipRecord:[0,0]})
    }
    else if((this.props.isHouseFinished
      &&(userValue-userAceCount*10)<(houseValue-houseAceCount*10)
      &&(houseValue-houseAceCount*10)<=21)||userValue-userAceCount*10>21){
        let newChipTotal = this.state.chip-bettingTotal           
        this.setState({chip:newChipTotal,chipRecord:[0,0],bust:true})
    }else{
      console.log(bettingTotal)
    }    
   
    this.props.onUpdateHouseFinishForChip()            
  }

  onHandleDeal=()=>{
    this.setState({bust:false,chipRecord:[0,0]})
    this.props.onStartGame()

  }

  onReload=()=>{
    window.location.reload(true)  
  }
  // updateBlackJack=()=>{
  //   this.setState({blackJack:true})
  // }
  render(){
    let userValue = cardApiServices.calculateCardValue(this.props.userCardData)
    let houseValue = cardApiServices.calculateCardValue(this.props.houseCardData)
    const userAceCount = cardApiServices.aceCount(this.props.userCardData)
    const houseAceCount = cardApiServices.aceCount(this.props.houseCardData)    
    const bettingTotal = cardApiServices.calcualteBetTotal(this.state.chipRecord)
    // console.log(this.props.houseFinishedForChip,'test house finish for chip')
   
    if(this.props.houseFinishedForChip||this.onBlackJack()||(!this.state.bust&&userValue-userAceCount*10>21)){
      this.onUpdateChip(bettingTotal,userValue,userAceCount,houseValue,houseAceCount)
      // bettingTotal,userValue,userAceCount,houseValue,houseAceCount
    }
    
    if(!this.state.blackJack){
      this.onBlackJack()
      console.log(this.state.blackJack,'test state black jack inside')
    }
    
    return(
      <div className='winner-display-container'>
        <div className='score-display'>
          <div className='play score-box'>               
            <h2>You: </h2> {this.renderValue(userValue,userAceCount)}
               </div>

          <div className='chips-box'>
            <input 
              disabled={!this.props.isGameStarted || this.state.chip<20}
              onClick={this.handleChip}
              defaultValue='20'
              type="image" 
              alt ='chip button' 
              src={chip_20} 
              name="chip-button" 
              className="btTxt submit" 
              id="chip" 
              /> 
            <input 
              disabled={!this.props.isGameStarted || this.state.chip<20}
              onClick={this.handleChip}
              defaultValue='50'
              type="image" 
              alt ='chip button' 
              src={chip_50} 
              name="chip-button" 
              className="btTxt submit" 
              id="chip" 
            />  
            <input 
              disabled={!this.props.isGameStarted || this.state.chip<20}
              onClick={this.handleChip}
              defaultValue='100'
              type="image" 
              alt ='chip button' 
              src={chip_100} 
              name="chip-button" 
              className="btTxt submit" 
              id="chip" 
            />  
            {/* <input 
              disabled={!this.props.isGameStarted || this.state.chip<20}
              onClick={this.handleDouble}
              type="image" 
              alt ='' 
              src={double} 
              name="test" 
              className="btTxt submit" 
              id="chip-double" 
            />   */}
          </div>

          <div className='dealer score-box'>               
            <h2>Dealer: </h2> {this.renderValue(houseValue,houseAceCount)}
          </div>
        </div>
        <div className='chip-display'>
          <div className='chip-total'>
          Chip total: <span className='chip-display-text'>{this.state.chip} </span> 
          </div>
          <div className='bet-total'>
          Your bet: <span className='chip-display-text'> {bettingTotal}</span> 
          </div>
        </div>
        <div className='player-blackjack-count'>You have earned: {this.state.blackJack} BlackJack</div>
        <div className='winner-buster-display'>
          {userValue-userAceCount*10>21&&'Bust, you lost'}
          {((this.props.isHouseFinished&&(userValue-userAceCount*10)>(houseValue-houseAceCount*10))||(houseValue-houseAceCount*10)>21)&&'You won'}
          {(this.props.isHouseFinished&&(userValue-userAceCount*10)<(houseValue-houseAceCount*10)&&(houseValue-houseAceCount*10)<=21)&&'Dealer Won'}
          {(this.props.isHouseFinished&&(userValue-userAceCount*10)===(houseValue-houseAceCount*10))&&'Push'}                
          {this.onBlackJack() && 'Black Jack! You Won'}  
          {this.state.chip<20 && 'You need to load more chips, Start a new game!'} 
                     
        </div>   
        <div className='user-btn-container'> 
          <Link className='control-btn' to='/'>Exit</Link>
          <button 
            onClick={this.onReload}
            className='control-btn'>
            Restart
          </button>
          <button 
            disabled={this.state.chip<20}
            className='control-btn' 
            onClick={this.onHandleDeal}>Deal
          </button>
            {this.props.isGameStarted && this.renderButton(userValue,userAceCount)}      
          </div>
         
        </div>
        )
      } 
    }

export default WinnerDisplay