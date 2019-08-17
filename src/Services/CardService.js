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
          return 11
        }
        else if(value in faceCards){        
          return faceCards[value]
        }
        else{
          return Number(value)
        }
      },
    
    calculateCardValue(cardData){            
      let count=0;        
      cardData.forEach(card=>            
        count+=this.carValueHandle(card.value))        
        return count
      },

    checkBlackJack(card_1,card_2){      
      if(card_1 === undefined || card_1.length === 0)
        {
          return 
        }
        else{
          return this.carValueHandle(card_1.value)+this.carValueHandle(card_2.value)===21
        }
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
      return maxValue>21                  
    },
      
    busted(cardData){
      if(!cardData){
        return
        }
      else{
        return cardApiServices.calculateCardValue(cardData)>21}
      }      
    }

export default cardApiServices;