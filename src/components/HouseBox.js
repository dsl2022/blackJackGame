import React from 'react'

class HouseBox extends React.Component{
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
            
          </div>
        )
      }
}

export default HouseBox