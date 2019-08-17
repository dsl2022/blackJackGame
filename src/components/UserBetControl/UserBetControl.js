import React from 'react'
import cardApiServices from '../../Services/CardService'
import chip_20 from '../../assets/chip-20.png'
import chip_50 from '../../assets/chip-50.png'
import chip_100 from '../../assets/chip-100.png'
import double from '../../assets/double-down.png'
import './UserBetControl.css'
class WinnerDisplay extends React.Component{
    onBlackJackUser=()=>{
        return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])
      }
    
    // onBlackJackHouse=()=>{
    //     return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.houseCardData[1])
    // }

  forcedStand=(userValue,aceCount)=>{
    return (userValue-aceCount*10>21)    
  }

  onBlackJack=()=>{
    return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])
  }
    renderButton=(userValue,aceCount)=>{
        // const userValue = cardApiServices.calculateCardValue(this.props.userCardData);
        // console.log(Value,'test user value')
        return(
          <>
            <button disabled={ this.onBlackJack() || this.forcedStand(userValue,aceCount) || this.props.isUserStand} onClick={this.props.drawOneCard}>Hit</button>
            <button disabled = { this.onBlackJack() || this.forcedStand(userValue,aceCount)||this.props.isUserStand} onClick={this.onStand}>Stand</button>
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
        }else{
          return <h2>{userValue}</h2>
        }
      }
    render(){
        let userValue = cardApiServices.calculateCardValue(this.props.userCardData)
        let houseValue = cardApiServices.calculateCardValue(this.props.houseCardData)
        const userAceCount = cardApiServices.aceCount(this.props.userCardData)
        const houseAceCount = cardApiServices.aceCount(this.props.houseCardData)
        // const userWin = (userValue-aceCount*10)>houseValue?'You win':''
        // console.log(userValue-userAceCount*10,'user after no ace',houseValue-houseAceCount*10,'house after no ace')
        // console.log((this.props.isHouseFinished&&(userValue-userAceCount*10)<(houseValue-houseAceCount*10)),'lost check')
        // console.log((this.props.isHouseFinished&&(userValue-userAceCount*10)===(houseValue-houseAceCount*10)),'push check')
        // console.log((this.props.isHouseFinished&&(userValue-userAceCount*10)>(houseValue-houseAceCount*10)),'win check')
        console.log(this.onBlackJackUser(), 'Black Jack! You Won check inside usercontrol')
        return(
            <div className='winner-display-container'>
              <div className='score-display'>
                <div className='play score-box'>               
                <h2>You: </h2> {this.renderValue(userValue,userAceCount)}
               </div>

              <div className='chips-box'>
                <input type="image" alt ='' src={chip_20} name="test" class="btTxt submit" id="chip" /> 
                <input type="image" alt ='' src={chip_50} name="test" class="btTxt submit" id="chip" />  
                <input type="image" alt ='' src={chip_100} name="test" class="btTxt submit" id="chip" />  
                <input type="image" alt ='' src={double} name="test" class="btTxt submit" id="chip-double" />  
              </div>

               <div className='dealer score-box'>               
               <h2>Dealer: </h2> {this.renderValue(houseValue,houseAceCount)}
              </div>
              </div>
                <div className='chip-display'>
                <h2>Chip total: </h2> <h2>{this.props.chip}</h2>
                </div>
            <div className='winner-buster-display'>
                {userValue-userAceCount*10>21&&'Bust, you lost'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)>(houseValue-houseAceCount*10))&&'You won'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)<(houseValue-houseAceCount*10))&&'Dealer Won'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)===(houseValue-houseAceCount*10))&&'Push'}
                
                {this.onBlackJackUser() && 'Black Jack! You Won'}
                
            </div>   
            <div className='user-btn-container'> 
            <button onClick={this.props.onStartGame}>Deal</button>
            {this.props.isGameStarted && this.renderButton(userValue,userAceCount)}
            {/* Users: {userValue}
            Dealer: {houseValue} */}
            </div>
            </div>
        )
    }
}

export default WinnerDisplay