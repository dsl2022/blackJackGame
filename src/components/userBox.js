import React from 'react'



class UserBox extends React.Component{
  
  
  
  renderUserCard=(cardArray)=>{
    return cardArray.map((card,index)=>
      <div key = {index} style={{ 
        position:'absolute',           
        left:`${index*40}px`
        }} className='card-container user-cards'>        
        <img src={card} alt={'user card '+index}/>
      </div>
    )
  }

  renderButton=()=>{
    return(
      <div className='user-btn-container'>
        <button disabled={this.props.isStand} onClick={this.props.drawOneCard}>Hit</button>
        <button onClick={this.props.onStand}>Stand</button>
        <button disabled={!this.props.isSplit} onClick={this.props.isSplitHandle}>Split</button>
      </div>
    )
  }

  renderValue=()=>{
    if(this.props.aceCount>0){
      return(
        <h2>{this.props.userValue}/{this.props.userValue-this.props.aceCount*10}</h2>
      )
    }else{
      return <h2>{this.props.userValue}</h2>
    }
  }
  render(){
    
    return(
      <div className='user-box' >
        <h2>You</h2>
        {this.renderValue()}
        <div style={{position:'relative'}}className='all-cards-container user-cards'>
        {this.renderUserCard(this.props.CardImages)}        
        </div>
        <div style={{position:'relative'}}className='user-btn'>
          {this.props.isGameStarted && this.renderButton()}
        </div>
      </div>
    )
  }
}

export default UserBox;