// Global setup 1 ------------------------------------------------
let playersTurn = 1;
let player1Card;
let player2Card;
let currentRound = 1;
let playerWon = 'none';
let canClick = true;

const player1Hand = [];
const player2Hand = [];

let player1GreatestRankDifference;
let player2GreatestRankDifference;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

const cardContainer = document.createElement('div');

const buttonContainer = document.createElement('div');

const player1HandContainer = document.createElement('div');
player1HandContainer.classList.add('player-hand-container');
const player2HandContainer = document.createElement('div');
player2HandContainer.classList.add('player-hand-container');

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

// function to calculate greatest difference between 2 cards in hand
const getGreatestRankDifference = (hand) => {
  let highestCardRank = 0;
  let lowestCardRank = 0;
  for (let i = 0; i < hand.length; i += 1) {
    // make the 1st card in hand the lowest and highest card rank
    if (i === 0) {
      lowestCardRank = hand[0].rank;
      highestCardRank = hand[0].rank;
    } else if (hand[i].rank > highestCardRank) {
      highestCardRank = hand[i].rank;
    } else if (hand[i].rank < lowestCardRank) {
      lowestCardRank = hand[i].rank;
    }
  }

  // compare difference between highest and lowest card rank
  const greatestRankDifference = (highestCardRank - lowestCardRank);

  return greatestRankDifference;
};

// function to find which player has the greatest difference between 2 cards in hand
const getPlayerWithGreatestDifference = () => {
  player1GreatestRankDifference = getGreatestRankDifference(player1Hand);
  player2GreatestRankDifference = getGreatestRankDifference(player2Hand);
  let result = 'none';

  if (player1GreatestRankDifference > player2GreatestRankDifference) {
    result = 'player1';
  } else if (player2GreatestRankDifference > player1GreatestRankDifference) {
    result = 'player2';
  }
  return result;
};

// Global setup 2: variables that cant be initilized in GLobal setup 1----
const deck = shuffleCards(makeDeck());

// Player action callbacks --------------------------------
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    output('waiting...');

    setTimeout(() => {
      player1Card = deck.pop();

      player1Hand.push(player1Card);

      const cardElement = makeCardElement(player1Card);

      player1HandContainer.appendChild(cardElement);

      // let game know it is 2nd player's turn
      playersTurn = 2;
      output('Its player 2 turn. Click to draw a card!');

      // allow next player to click
      canClick = true;
    }, 1000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    output('waiting...');

    setTimeout(() => {
      player2Card = deck.pop();

      player2Hand.push(player2Card);

      const cardElement = makeCardElement(player2Card);

      player2HandContainer.appendChild(cardElement);

      const playerCardsOutput = `Player 1 drew ${player1Card.name} of ${player1Card.suit}. Player 2 drew ${player2Card.name} of ${player2Card.suit}.`;

      const playerWithGreatestDifference = getPlayerWithGreatestDifference();

      playerWon = playerWithGreatestDifference;

      if (currentRound === 1) {
        output(`${playerCardsOutput}. Player 1, draw a card to continue playing.`);
      } else if (playerWon === 'player1') {
        output(`player 1 wins! <br> 
      ${playerCardsOutput}. <br>
      Player 1 greatest rank difference is ${player1GreatestRankDifference}. <br>
      Player 2 greatest rank difference is ${player2GreatestRankDifference}`);
      } else if (playerWon === 'player2') {
        output(`player 2 wins! <br> ${playerCardsOutput}. <br>
      Player 1 greatest rank difference is ${player1GreatestRankDifference}. <br>
      Player 2 greatest rank difference is ${player2GreatestRankDifference}`);
      } else if (playerWon === 'none') {
        output(`tie! <br> ${playerCardsOutput}. <br>
      Player 1 greatest rank difference is ${player1GreatestRankDifference}. <br>
      Player 2 greatest rank difference is ${player2GreatestRankDifference}`);
      } else {
        output('there is an error with the program. Please refresh to restart the game.');
      }

      // let game know round has ended and start new round
      playersTurn = 1;
      currentRound += 1;

      // allow next player to click
      canClick = true;
    }, 1000);
  }
};

// Game initialization -----------------------------------
const gameInit = () => {
  // initialize playerHandContainer functionality
  cardContainer.appendChild(player1HandContainer);
  cardContainer.appendChild(player2HandContainer);

  // initialize cardContainer functionality
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  buttonContainer.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonContainer.appendChild(player2Button);

  document.body.appendChild(buttonContainer);

  player1Button.addEventListener('click', () => {
    if (deck.length === 0) {
      output(`There are no more cards in the deck. ${playerWon} won!`);
    } else { player1Click(); }
  });
  player2Button.addEventListener('click', () => {
    if (deck.length === 0) {
      output(`There are no more cards in the deck. ${playerWon} won!`);
    } else { player2Click(); }
  });

  // initialize game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

gameInit();
