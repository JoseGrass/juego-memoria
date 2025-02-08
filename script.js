const board = document.querySelector('.game-board');
const restartButton = document.getElementById('restart-button');

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let gameLocked = false;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function generateBoard() {
    // Crear un array con dos de cada valor para las cartas
    const values = [...cardValues, ...cardValues];
    shuffle(values);

    // Crear las cartas en el tablero
    board.innerHTML = '';
    values.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function shuffle(array) {
    // Mezcla aleatoriamente los valores de las cartas
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(event) {
    if (gameLocked) return;

    const card = event.target;

    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    gameLocked = true;

    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards += 2;
        flippedCards = [];
        gameLocked = false;
        if (matchedCards === cards.length) {
            alert('¡Ganaste!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
            gameLocked = false;
        }, 1000);
    }
}

function restartGame() {
    matchedCards = 0;
    flippedCards = [];
    gameLocked = false;
    generateBoard();
}

restartButton.addEventListener('click', restartGame);

generateBoard();