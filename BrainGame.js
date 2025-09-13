document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      { name: 'fries', img: 'https://img.icons8.com/color/100/fries.png' },
      { name: 'burger', img: 'https://img.icons8.com/color/100/hamburger.png' },
      { name: 'pizza', img: 'https://img.icons8.com/color/100/pizza.png' },
      { name: 'icecream', img: 'https://img.icons8.com/color/100/ice-cream-cone.png' },
      { name: 'hotdog', img: 'https://img.icons8.com/color/100/hot-dog.png' },
      { name: 'milkshake', img: 'https://img.icons8.com/color/100/milkshake.png' },
      { name: 'fries', img: 'https://img.icons8.com/color/100/fries.png' },
      { name: 'burger', img: 'https://img.icons8.com/color/100/hamburger.png' },
      { name: 'pizza', img: 'https://img.icons8.com/color/100/pizza.png' },
      { name: 'icecream', img: 'https://img.icons8.com/color/100/ice-cream-cone.png' },
      { name: 'hotdog', img: 'https://img.icons8.com/color/100/hot-dog.png' },
      { name: 'milkshake', img: 'https://img.icons8.com/color/100/milkshake.png' }
    ];
  
    cardArray.sort(() => 0.5 - Math.random());
  
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const movesDisplay = document.querySelector('#moves');
    const timerDisplay = document.querySelector('#timer');
  
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moves = 0;
    let time = 0;
    let timerInterval;
  
    // Start timer
    function startTimer() {
      timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = `Time: ${time}s`;
      }, 1000);
    }
  
    // Create board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'https://img.icons8.com/fluency/100/question-mark.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      }
    }
  
    // Check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];
  
      if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'https://img.icons8.com/emoji/100/check-mark-emoji.png');
        cards[optionTwoId].setAttribute('src', 'https://img.icons8.com/emoji/100/check-mark-emoji.png');
        cardsWon.push(cardsChosen);
      } else {
        cards[optionOneId].setAttribute('src', 'https://img.icons8.com/fluency/100/question-mark.png');
        cards[optionTwoId].setAttribute('src', 'https://img.icons8.com/fluency/100/question-mark.png');
      }
  
      cardsChosen = [];
      cardsChosenId = [];
      moves++;
      movesDisplay.textContent = `Moves: ${moves}`;
      resultDisplay.textContent = 'Score: ' + cardsWon.length;
  
      if (cardsWon.length === cardArray.length / 2) {
        clearInterval(timerInterval);
        resultDisplay.textContent = `🎉 You Won! Final Score: ${cardsWon.length}`;
        alert(`Game Over 🎮 \nMoves: ${moves} \nTime: ${time}s`);
      }
    }
  
    // Flip card
    function flipCard() {
      if (!timerInterval) startTimer(); // Start timer on first click
      let cardId = this.getAttribute('data-id');
      if (cardsChosenId.includes(cardId)) return; // Prevent double click on same card
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
  
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 600);
      }
    }
  
    createBoard();
  });
  