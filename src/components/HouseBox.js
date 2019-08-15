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
              <h2>Dealer</h2>
              <h2>{this.props.houseValue}</h2>
            <div className='all-cards-container house-cards'>
                {this.renderUserCard()}
            </div>
          </div>
        )
      }
}

export default HouseBox