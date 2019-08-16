import React from 'react'
import cardApiServices from '../Services/CardService'


class UserBox extends React.Component{

  

  forcedStand=(userValue,aceCount)=>{
    return (userValue-aceCount*10>21)    
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
    // const userValue = cardApiServices.calculateCardValue(this.props.userCardData);
    // console.log(Value,'test user value')
    return(
      <div className='user-btn-container'>
        <button disabled={ this.forcedStand(userValue,aceCount) && this.props.isStand} onClick={this.props.drawOneCard}>Hit</button>
        <button disabled = {this.forcedStand(userValue,aceCount)||this.props.isStand} onClick={this.onStand}>Stand</button>
        {/* <button disabled={!this.props.isSplit} onClick={this.props.isSplitHandle}>Split</button> */}
      </div>
    )
  }

  renderValue=(userValue,aceCount)=>{
    if(aceCount>0){
      return(
        
        // <h2>{this.props.userValue}/{this.props.userValue-this.props.aceCount*10}</h2>
        <h2>{userValue}/{userValue-aceCount*10}</h2>
      )
    }else{
      return <h2>{userValue}</h2>
    }
  }

  nothing=()=>{}

  render(){
    const userValue = cardApiServices.calculateCardValue(this.props.userCardData)
    const aceCount = cardApiServices.aceCount(this.props.userCardData)
    // this.forcedStand(userValue,aceCount)?this.props.onStand():this.nothing()
    return(
      <div className='user table-box' >
        <div className='user-head-bar'>
          <h2>You</h2>
          
          {this.renderValue(userValue,aceCount)}
        </div>
        
             
        <div className='all-cards-container'>
        {this.renderUserCard(this.props.userCardData)}   
      </div>
        
          {this.props.isGameStarted && this.renderButton(userValue,aceCount)}
        
      </div>
    )
  }
}

export default UserBox;