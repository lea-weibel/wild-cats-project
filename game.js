class Player {
  constructor(name, minutes, seconds, tenths) {
      this.name = name;
      this.minutes = minutes;
      this.seconds = seconds;
      this.tenths = tenths; 
  }
}

/***** GAME CONSTANTS *****/
const cardGame = document.querySelectorAll('.cards');
const playBtn = document.getElementById('play-btn');
const homeDiv = document.getElementById('home-page');
const timerDiv = document.getElementById('timer-container');
const gameDiv = document.getElementById('game-page');
const scoreDiv = document.getElementById('score-page');
const playAgainBtn = document.getElementById('play-again-btn');

/***** TIMER CONSTANTS *****/
let minuts = 00;
let seconds = 00;
let tens = 00;
// 1 ten = 0.01 second, 100 tens = 0.1 second
const appendSeconds = document.getElementById('seconds');
const appendMinuts = document.getElementById('minuts');
const appendTens = document.getElementById('tens');
const buttonStop = document.getElementById('stop');
const buttonReset = document.getElementById('reset');
let myIntervalVar;

/***** SCORE BOARD CONSTANTS *****/
const player = document.querySelector('#player-name');
const nameBtn = document.getElementById('name-btn');
const scoreList = document.getElementById('score-list');
let score;

/* retrieve player name */
let newPlayer;
nameBtn.onclick = function() {
  let playerName = player.value;
  newPlayer = new Player(playerName);
  console.log(newPlayer);
  player.value = '';
};

/* ****** HOME PLAY BUTTON MAKE GAME PAGE APPEAR ****** */
playBtn.onclick = function () {
  homeDiv.style.display = 'none';
  timerDiv.style.display = 'flex';
  gameDiv.style.display = 'block';
  myIntervalVar = setInterval(startTimer, 10);
};

/* ********CREATE ARRAY WITH 12 KITTY IMAGES (6X2)*********** */
const kittyImg = [];
let n;
for (let i = 0; i < 12; i++) {
  if (i < 6) {
    n = i + 1;
  } else if (i >= 6) {
    n = i - 5;
  }
  kittyImg[i] = `images/kitty${n}.svg`;
}

// initiate varibales used in the the loop
let revealedImg = [];
let revealedCard = [];
let allCards = [];

/* ********* LOOP THOURGH THE CARDS AND ADD RANDOM KITTY IMAGE ********** */
for (let i = 0; i < cardGame.length; i++) {
  let card = cardGame[i];

  // generate random number
  let number = Math.floor(Math.random() * kittyImg.length);

  let newImg = document.createElement('img');
  // create a new array containing the random img name from the array
  newImg.src = kittyImg.splice(number, 1)[0];
  newImg.classList.add('front-img');
  newImg.style.display = 'none';

  card.appendChild(newImg);

  /* ****** ADD EVENT LISTENER ON CARD WITH GAME ACTIONS ****** */
  card.addEventListener('click', function () {
    // change the card image from back to kitty image
    card.firstElementChild.style.display = 'none';
    card.lastElementChild.style.display = 'block';

    revealedImg.push(card.lastElementChild);
    revealedCard.push(card);

    // TWO FUNCTIONS TO BE CALLED LATER USING SETTIMEOUT
    let unreveal = function () {
      revealedImg[0].style.display = 'none';
      revealedCard[0].firstElementChild.style.display = 'block';
      revealedImg[1].style.display = 'none';
      revealedCard[1].firstElementChild.style.display = 'block';
    };

    let reinitializeArray = function () {
      revealedImg = [];
      revealedCard = [];
    };

    if (revealedImg.length === 2) {
      if (
        revealedImg[0].attributes.src.value ===
        revealedImg[1].attributes.src.value
      ) {
        revealedCard[0].style.opacity = '50%';
        revealedCard[1].style.opacity = '50%';
        // push all cards to a variable for the final count
        allCards.push(revealedCard[0]);
        allCards.push(revealedCard[1]);
      } else {
        setTimeout(unreveal, 600);
      }
      setTimeout(reinitializeArray, 601);
    }

    if (allCards.length === 12) {
      gameDiv.style.display = 'none';
      scoreDiv.style.display = 'block';

      clearInterval(myIntervalVar);

      newPlayer.minutes = appendMinuts.innerHTML;
      newPlayer.seconds = appendSeconds.innerHTML;
      newPlayer.tenths = appendTens.innerHTML;

      console.log(newPlayer);
      // let score = document.createElement('p');
      // score.innerHTML = `${playerName} did it in ${appendMinuts.innerHTML}:${appendSeconds.innerHTML}:${appendTens.innerHTML}`;
      // scoreList.appendChild(score);
    }
  });
}

/* TIMER FUNCTION */
function startTimer() {
  tens++;
  if (tens <= 9) {
    appendTens.innerHTML = '0' + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    if (seconds <= 9) appendSeconds.innerHTML = '0' + seconds;
    else if (seconds > 9) appendSeconds.innerHTML = seconds;
    tens = 0;
    appendTens.innerHTML = '0' + 0;
  }

  if (seconds > 60) {
    minuts++;
    appendMinuts.innerHTML = '0' + minuts;
    seconds = 0;
    appendSeconds.innerHTML = '0' + 0;
  }

  if (minuts > 9) {
    appendMinuts.innerHTML = minuts;
  }
}

// playAgainBtn.onclick = function() {
//     scoreDiv.style.display = 'none';
//     gameDiv.style.display = 'block';
// }


