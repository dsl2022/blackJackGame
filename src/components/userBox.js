import React from 'react'


class UserBox extends React.Component{
  

  
  renderUserCard=()=>{
    return this.props.CardImages.map((card,index)=>
      <div className='card-container user-cards'>        
        <img src={card} alt={'user card '+index}/>
      </div>
    )
  }

  render(){
    return(
      <div className='user-box' >
        {this.renderUserCard()}
        <button onClick={this.props.drawOneCard}>Draw a card</button>
      </div>
    )
  }
}

export default UserBox;