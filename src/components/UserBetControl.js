import React from 'react'
import cardApiServices from '../Services/CardService'

class WinnerDisplay extends React.Component{

    

    render(){
        let userValue = cardApiServices.calculateCardValue(this.props.userCardData)
        let houseValue = cardApiServices.calculateCardValue(this.props.houseCardData)
        
        return(
            <div className='winner-display-container'>
            Winner Display
            {userValue}
            {houseValue}
            </div>
        )
    }
}

export default WinnerDisplay