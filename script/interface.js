const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";



startGame();

function startGame(){
   initializeCards(game.createCardsFromImg())
}

function initializeCards(cards){
    let gameBoard = document.getElementById('boardGame');
    gameBoard.innerHTML = "";
    game.cards.forEach((card)=>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })
    console.log(gameBoard);
}

function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, cardElement){
    let cardElementFace = document.createElement('div');

    cardElementFace.classList.add(face);
    if (face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    cardElement.appendChild(cardElementFace);
}


function flipCard(){
    if(game.firstCard && game.firstCard.id === this.id){
        return false
    }
    if(game.setcard(this.id)){
        this.classList.add('flip');
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if (game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                };
            }else{
                setTimeout(()=>{
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                    console.log(game.firstCard)
                },600);

            };
        }
    }

}

function reset(){
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
    startGame();
}