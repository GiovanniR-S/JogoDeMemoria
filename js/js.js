const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fistCard, secondCard;
let lockBoard = false;

//Audios
var selectAudio = document.querySelector('.select');
var erroAudio = document.querySelector('.erro');
var acertouAudio = document.querySelector('.acertou');

function flipCard(){
    if(lockBoard) return;
    if(this === fistCard) return;

    selectAudio.play();

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        fistCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();

}

function checkForMath() {
    if(fistCard.dataset.card === secondCard.dataset.card){
        disableCards();
        acertouAudio.play();
        return;
    }

    unFlipCard();
}

function disableCards() {
    fistCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCard(){
    lockBoard = true;
    erroAudio.play();
    setTimeout(() => {
        fistCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();

    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [fistCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

function reset(){
    return window.location.reload();
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})

