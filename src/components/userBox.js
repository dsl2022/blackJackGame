import React from 'react'


class UserBox extends React.Component{
  

  
  renderUserCard=()=>{
    return this.props.CardImages.map((card,index)=>
      <div key = {index} className='card-container user-cards'>        
        <img src={card} alt={'user card '+index}/>
      </div>
    )
  }

  render(){
    return(
      <div className='user-box' >
        {this.renderUserCard()}
        <button onClick={this.props.drawOneCard}>Hit</button>
        <button onClick={this.props.onStand}>Stand</button>
      </div>
    )
  }
}

export default UserBox;