import React from 'react'
import cardApiServices from '../Services/CardService'


class UserBox extends React.Component{
  forcedStand=(userValue,aceCount)=>{
    return (userValue-aceCount*10>21)    
  }

  onBlackJack=()=>{
    return cardApiServices.checkBlackJack(this.props.userCardData[0],this.props.userCardData[1])
  }

  renderUserCard=(cardData)=>{
    return cardData.map((card,index)=>
    <div key = {index} style={{                  
      left:`${index*20}px`
      }} className='card-container'>        
      <img src={card.image} alt={'card image'+index}/>
    </div>)
   
  }

  onStand=()=>{   
    this.props.onStand()   
  }

  renderButton=(userValue,aceCount)=>{    
    if(this.forcedStand()){
      this.onStand()
    }
    return(
      <div className='user-btn-container'>
        <button disabled={ this.onBlackJack() || this.forcedStand(userValue,aceCount) || this.props.isStand} onClick={this.props.drawOneCard}>Hit</button>
        <button disabled = { this.onBlackJack() || this.forcedStand(userValue,aceCount)||this.props.isStand} onClick={this.onStand}>Stand</button>
        {/* <button disabled={!this.props.isSplit} onClick={this.props.isSplitHandle}>Split</button> */}
      </div>
    )
  }

  nothing=()=>{}

  render(){    
    return(
        <div className='user table-box' >                     
          <div className='all-cards-container'>
          {this.renderUserCard(this.props.userCardData)}   
        </div>                    
      </div>
    )
  }
}

export default UserBox;