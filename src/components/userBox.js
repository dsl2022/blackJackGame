import React from 'react'
import { thisExpression } from '@babel/types';

class UserBox extends React.Component{
  

  renderCard=(isCard)=>{
    if(isCard){
      let img_1 = this.props.cardData.cards[0].image
      let img_2 = this.props.cardData.cards[1].image
      console.log(img_1,img_2,'test card images')
      return (
        <div>
          <img src={img_1} alt='' />
          <img src={img_2} alt='' />
        </div>
        )
    }else{
      return;
    }
    
  }

  render(){
    // console.log(this.props.cardData.cards,'test user card data')
    // const card_1_img = this.props.cardData.cards[0]
    
    
    const cards = this.renderCard(this.props.cardData.cards)
    console.log(cards,'test cards return')
    return(
      <div className='user-box' >
        {cards}
        <button onClick={this.props.drawOneCard}>Draw a card</button>
      </div>
    )
  }
}

export default UserBox;