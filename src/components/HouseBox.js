import React from 'react'

class HouseBox extends React.Component{
    renderUserCard=()=>{
        return this.props.houseCardData.map((card,index)=>
          <div key = {index} 
          style={{ 
            // position:'absolute',           
            left:`${index*20}px`
            }}
          className='house-card-container card'>        
            <img src={card.image} alt={'user card '+index}/>
          </div>
        )
      }
    
      render(){
        return(
          <div className='house table-box' >
              <div className='user-head-bar'>
              <h2>Dealer</h2>
              <h2>{this.props.houseValue}</h2>
              </div>
            <div className='all-cards-container'>
                {this.renderUserCard()}
            </div>
          </div>
        )
      }
}

export default HouseBox