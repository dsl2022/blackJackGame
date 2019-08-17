import React from 'react'
import cardApiServices from '../Services/CardService'

class WinnerDisplay extends React.Component{
    onBlackJackUser=()=>{
        return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])
      }
    
    // onBlackJackHouse=()=>{
    //     return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.houseCardData[1])
    // }
    

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
                <div className='chip-display'>
                    {this.props.chip}
                </div>
            <div className='winner-buster-display'>
                {userValue-userAceCount*10>21&&'Bust, you lost'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)>(houseValue-houseAceCount*10))&&'You won'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)<(houseValue-houseAceCount*10))&&'Dealer Won'}
                {(this.props.isHouseFinished&&(userValue-userAceCount*10)===(houseValue-houseAceCount*10))&&'Push'}
                
                {this.onBlackJackUser() && 'Black Jack! You Won'}
                
            </div>    
            
            {/* Users: {userValue}
            Dealer: {houseValue} */}
            </div>
        )
    }
}

export default WinnerDisplay