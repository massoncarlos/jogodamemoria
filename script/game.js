let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setcard: function (id){

        let card =this.cards.filter(card=>card.id===id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }
        if(!this.firstCard){
            this.firstCard =card;
            this.firstCard.flipped=true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped=true;
            this.lockMode=true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
       return this.cards.filter(card=>!card.flipped).length == 0;
    },

    imgs : ['1','2','3','4','5','6','7','8','9','10'],

    card : null,

    createCardsFromImg: function (imgs){
        this.cards=[]
    
        this.imgs.forEach((img)=>{
            this.cards.push(this.crateAPairofImg(img));
        })
        
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()

        return this.cards
    },
    
    crateAPairofImg: function (img){
        return[{
            id: this.createIdWithImg(img),
            icon: img,
            flipped: false,
        },{
            id: this.createIdWithImg(img),
            icon: img,
            flipped: false,
        }]
    },
    
    createIdWithImg: function (img){
        return img + parseInt(Math.random() * 1000);
    
    },

    shuffleCards: function (){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}