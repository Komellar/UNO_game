const cardColors = ['red', 'orange', 'mediumblue', 'forestgreen'];

const mainCard = document.getElementById('main__card');
const mainCard2 = document.getElementById('main__card2');
let cards = document.getElementsByClassName("hand__cards");
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const getCardBtn = document.getElementById('get__card');
let cardsBox = document.getElementById('cards');
const endRoundBtn = document.getElementById('round')

cards = [...cards];


// buttons events
startBtn.addEventListener('click', () => {
    init()
})

getCardBtn.addEventListener('click', () => {
    addCard()
})

restartBtn.addEventListener('click', () => {
    location.reload()
})

let actualRound = true

// Start playing
function init() {
    startBtn.classList.add('hide');
    restartBtn.classList.remove('hide');
    setCards();
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (actualRound) {
                checkCard(card)
            } else {
                checkCardsNum(card)
            }
        })
    })
}


// if endRound clicked then change main card content
function nextRound(card) {
    setTimeout(2000)
    mainCard.innerText = Math.floor(Math.random() * 6) + 1
    mainCard.style.background = cardColors[Math.floor(Math.random() * 4)]

    while (mainCard.textContent != mainCard2.textContent && mainCard.style.background != mainCard2.style.background) {
        mainCard.innerText = Math.floor(Math.random() * 6) + 1
        mainCard.style.background = cardColors[Math.floor(Math.random() * 4)]
        actualRound = false
    }
    actualRound = true
    endRoundBtn.classList.add('hide')
    getCardBtn.classList.remove('hide');
}


// Showing all cards, adding number and color to card
function setCards() {
    cards.forEach(card => {
        card.innerText = Math.floor(Math.random() * 6) + 1
        card.style.background = cardColors[Math.floor(Math.random() * 4)]
        card.classList.remove('hide');
    })
    mainCard.innerText = Math.floor(Math.random() *6) + 1
    mainCard.style.background = cardColors[Math.floor(Math.random() * 4)]
    
    mainCard2.innerText = mainCard.innerText 
    mainCard2.style.background = mainCard.style.background 

    mainCard.classList.remove('hide');
    getCardBtn.classList.remove('hide');
}


// Checking if card can be used (same color or number)
function checkCard(card) {
    if (card.textContent === mainCard.textContent || card.style.background === mainCard.style.background) {
        mainCard.textContent = card.textContent ;
        mainCard.style.background = card.style.background;

        mainCard2.textContent = card.textContent;
        mainCard2.style.background = card.style.background;

        card.classList.add('hide');
        cards.pop();
        actualRound = false;

        endRoundBtn.addEventListener('click', () => {
            nextRound(card)
        })
        endRoundBtn.classList.remove('hide')
        getCardBtn.classList.add('hide')
    }
    if (cards.length === 0){
        alert(`CONGRATULATION YOU WIN\n`)
    }
}


// checking if its the same number as the previous cards number
function checkCardsNum(card) {
    if (card.textContent === mainCard.textContent) {
        mainCard.textContent = card.textContent ;
        mainCard.style.background = card.style.background;

        mainCard2.textContent = card.textContent;
        mainCard2.style.background = card.style.background;

        card.classList.add('hide');
        cards.pop();
        actualRound = false;
        let actualCard = card

        endRoundBtn.addEventListener('click', () => {
            nextRound(card)
        })
        endRoundBtn.classList.remove('hide')
        console.log(cards);
    }
    if (cards.length === 0){
        alert(`CONGRATULATION YOU WIN\n`)
    }
}


// Add new card to hand
function addCard() {
    if (actualRound) {
        const card = document.createElement('button');
        card.classList.add('hand__cards');

        card.innerText = Math.floor(Math.random() * 6) + 1
        card.style.background = cardColors[Math.floor(Math.random() * 4)];

        cardsBox.appendChild(card);
        cards.push(card)
        actualRound = false

        card.addEventListener('click', () => {
            if (actualRound) {
                checkCard(card)
            } else {
                checkCardsNum(card)
            }
        });

        endRoundBtn.addEventListener('click', () => {
            nextRound(card)
        });

        endRoundBtn.classList.remove('hide')
        getCardBtn.classList.add('hide')
    }
} 
