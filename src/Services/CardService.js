const cardApiServices={
    async shuffleCard(deckId){
      try{
        await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      }catch(error){
        console.log(error)
      }
    },
    async drawCards(deckId,count){
        try {const response = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`        
        )
        return (!response.ok)?Promise.reject(response.json()):await response.json()}
        catch(error){
          console.log(error)
        }
      },
      carValueHandle(value){
        const faceCards = {'JACK':10,'QUEEN':10,'KING':10}
        
        
        if(value==='ACE'){
          // this.setState({aceCount:this.state.aceCount+1})
          return 11
        }
        else if(value in faceCards){        
          return faceCards[value]
        }else{
          return Number(value)
        }
      },
      calculateCardValue(cardData){
        // console.log(this.props.userCardData,'test user card data')
        
        let count=0;        
        cardData.forEach(card=>
          // console.log(card)
          // console.log(this.carValueHandle(card.value))
           count+=this.carValueHandle(card.value))        
        return count
      },
      checkBlackJack(card_1,card_2){      
        return card_1+card_2===21
      },
      onCheckSplit(card_1,card_2){      
        if(card_1===card_2){
          this.setState({isSplit:true})
        }
      },
      aceCount(cardData){
        let count=0;
        cardData.forEach(card=>{          
          if(card.value==='ACE'){
            count+=1
          }          
        })
        return count
      },
      onCheckBusted(cardValue,cardData){
        const currentValue = cardApiServices.calculateCardValue(cardData)
        const maxValue = currentValue+cardValue-(cardApiServices.aceCount(cardData)*10)        
        console.log(currentValue,'current t',maxValue,'max t')
        return maxValue>21                  
      }
      
}

export default cardApiServices;