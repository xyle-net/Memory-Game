const emojis = [
    'card1.png', 'card2.png', 'card3.png', 'card4.png', 
    'card1.png', 'card2.png', 'card3.png', 'card4.png', 
    'card5.webp', 'card6.png', 'card7.webp', 'card5.webp', 
    'card6.png', 'card7.webp', 'card8.webp', 'card8.webp'
];
let shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
let selectedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('gameBoard');
shuffledEmojis.forEach((emoji, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.style.backgroundImage = "url('images/back.png')";
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
        let index = this.dataset.index;
        this.style.backgroundImage = `url('images/${shuffledEmojis[index]}')`;
        this.style.backgroundSize = "contain";
        this.style.backgroundRepeat = "no-repeat";
        this.style.backgroundPosition = "center";
        this.classList.add('flipped');
        selectedCards.push(this);
    }
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    if (selectedCards[0].style.backgroundImage === selectedCards[1].style.backgroundImage) {
        matchedCards.push(...selectedCards);
    } else {
        selectedCards.forEach(card => {
            card.style.backgroundImage = "url('images/back.png')";
            card.style.backgroundSize = "cover";
            card.style.backgroundPosition = "center";
            card.classList.remove('flipped');
        });
    }
    selectedCards = [];
    if (matchedCards.length === emojis.length) {
        setTimeout(() => alert('Поздравляем! Вы выиграли! 🎉'), 300);
    }
}