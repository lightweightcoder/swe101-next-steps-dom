// Global setup 1 ------------------------------------------------
let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

const cardContainer = document.createElement('div');

const buttonContainer = document.createElement('div');

// Helper functions ------------------------------------------
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// cards is an array of card objects
const shuffleCards = (cards) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem; // giving eslint warning bc it is advised
    cards[randomIndex] = currentItem; // not to alter the contents of an input (cards).
  }

  // give back the shuffled deck
  return cards;
};

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitColors = ['red', 'red', 'black', 'black'];
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // make a variable for the current suit color
    const currentSuitColor = suitColors[suitIndex];

    // make a variable for the current suit symbol
    const currentSuitSymbol = suitSymbols[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSuitSymbol,
        display: displayName,
        color: currentSuitColor,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

// output message
const output = (message) => {
  gameInfo.innerHTML = message;
};

// create a card element to be appeneded t0 the card container
const makeCardElement = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.display;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Global setup 2: variables that cant be initilized in GLobal setup 1---
const deck = shuffleCards(makeDeck());

// Player action callbacks --------------------------------
const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();

    const cardElement = makeCardElement(player1Card);

    // since it is player 1's turn, it is a new round
    // so empty cardContainer
    cardContainer.innerHTML = '';

    cardContainer.appendChild(cardElement);

    // let game know it is 2nd player's turn
    playersTurn = 2;
    output('Its player 2 turn. Click to draw a card!');
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();

    const cardElement = makeCardElement(player2Card);

    cardContainer.appendChild(cardElement);

    const playerCardsOutput = `Player 1 drew ${player1Card.name} of ${player1Card.suit}. Player 2 drew ${player2Card.name} of ${player2Card.suit}.`;

    if (player1Card.rank > player2Card.rank) {
      output(`player 1 wins! <br> ${playerCardsOutput}`);
    } else if (player1Card.rank < player2Card.rank) {
      output(`player 2 wins! <br> ${playerCardsOutput}`);
    } else {
      output(`tie! <br> ${playerCardsOutput}`);
    }

    // let game know round has ended and start new round
    playersTurn = 1;
  }
};

// Game initialization -----------------------------------
const gameInit = () => {
  // initialize cardContainer functionality
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  buttonContainer.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonContainer.appendChild(player2Button);

  document.body.appendChild(buttonContainer);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // initialize game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

gameInit();
