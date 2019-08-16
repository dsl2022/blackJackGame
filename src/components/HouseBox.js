import React from 'react'
import cardApiServices from '../Services/CardService'

class HouseBox extends React.Component{
    state={
        houseValue:cardApiServices.calculateCardValue(this.props.houseCardData),   
        values:[]     
    }
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
        }else{
          return <h2>{userValue}</h2>
        }
      }

      handleHouseDraw=()=>{
        // console.log(value,'before test value') 
        
        
           
                this.props.drawOneCard()
                // value+=cardApiServices.calculateCardValue(this.props.houseCardData)
                
           
            
        
              
        
        // if(value<21){
        //     this.props.drawOneCard()
        //     value+=cardApiServices.calculateCardValue(this.props.houseCardData)
        // }                 
      }
      checkBusted =()=>{
          return(cardApiServices.calculateCardValue(this.props.houseCardData))
      }
      nothing=()=>{

      }
      

      render(){
           const houseData = this.props.houseCardData
          const houseValue = cardApiServices.calculateCardValue(houseData)          
          const aceCount = cardApiServices.aceCount(houseData)
        
          //   console.log(cardApiServices.carValueHandle(houseData[houseData.length]),'test last value')
        //   console.log(houseValue,'first house value')
        // console.log(this.state.houseValue,'first house value')
        // this.props.isUserStand && 
        
        // console.log((houseData.length&&cardApiServices.calculateCardValue(houseData[houseData.length-1])),'test before draw house')
        // console.log(houseValue<16,'test true value')
        console.log(houseValue,'before')
        if(this.props.isUserStand&&(houseValue-(aceCount*10)<16)){
            console.log(houseValue,'after')
            console.log(houseValue-(aceCount*10),'calculation')
            this.handleHouseDraw()
            
        }
        // this.props.isUserStand&&cardApiServices.calculateCardValue(houseData)<16?this.handleHouseDraw():this.nothing()
        
        return(
          <div className='house table-box' >
              <div className='user-head-bar'>
              <h2>Dealer</h2>
              {this.renderValue(houseValue,aceCount)}
              </div>
            <div className='all-cards-container'>
                {this.renderUserCard(houseData)}
            </div>
          </div>
        )
      }
}

export default HouseBox