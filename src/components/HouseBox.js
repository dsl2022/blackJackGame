import React from 'react'
import cardApiServices from '../Services/CardService'

class HouseBox extends React.Component{

    renderUserCard=(cardData)=>{
        return cardData.map((card,index)=>
          <div key = {index} 
          style={{                     
            left:`${index*20}px`
            }}
          className='card-container'>        
            <img src={card.image} alt={'card image'+index}/>
          </div>
        )
      }
    
      renderValue=(userValue,aceCount)=>{
        if(aceCount>0){
          return(                       
            <h2>{userValue}/{userValue-aceCount*10}</h2>
          )
        }
        else{
          return <h2>{userValue}</h2>
        }
      }

      handleHouseDraw=()=>{                                        
        this.props.drawOneCard()
      }

      checkBusted =()=>{
          return(cardApiServices.calculateCardValue(this.props.houseCardData))
      }


    render(){
        const houseData = this.props.houseCardData
        const houseValue = cardApiServices.calculateCardValue(houseData)          
        const aceCount = cardApiServices.aceCount(houseData)                
        
        if(this.props.isUserStand&&((houseValue-(aceCount*10))<16)){
            // console.log(houseValue-(aceCount*10),'after')            
            this.handleHouseDraw()           
        }
        
        
        return(
          <div className='house table-box' >        
            <div className='all-cards-container'>
                {this.renderUserCard(houseData)}
            </div>
          </div>
        )
      }
    }

export default HouseBox