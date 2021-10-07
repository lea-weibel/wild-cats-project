function Player(name, time) {
  this.name = name;
  this.time = time;
}

let time = [];

/***** GAME CONSTANTS *****/
const cardGame = document.querySelectorAll('.cards');
const playBtn = document.getElementById('play-btn');
const homeDiv = document.getElementById('home-page');
const timerDiv = document.getElementById('timer-container');
const gameDiv = document.getElementById('game-page');
const scoreDiv = document.getElementById('score-page');
const playAgainBtn = document.getElementById('play-again-btn');

/***** TIMER CONSTANTS *****/
let minuts = 0;
let seconds = 0;
let tens = 0;
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

/* retrieve player name */
let newPlayer;
nameBtn.onclick = function () {
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

    /************** GAME END *****************/
    if (allCards.length === 12) {
      // stop timer
      clearInterval(myIntervalVar);

      // retrieve time and store into object
      newPlayer.time = `${appendMinuts.innerHTML}:${appendSeconds.innerHTML}:${appendTens.innerHTML}`;

      // retrieve previous players from LS if exist
      let players;
      if (localStorage.getItem('players') === null) players = [];
      else players = JSON.parse(localStorage.getItem('players'));
      console.log(players);

      // push new object into array containing all other players
      players.push(newPlayer);

      //reinitialize object for next one
      newPlayer = '';

      // store updated players array in LS -- contains new player object
      localStorage.setItem('players', JSON.stringify(players));

      // put all players time into a separate array and sort them
      for (let player of players) {
        time.push(player.time);
        time.sort();
      }

      // create div to be displayed on score board for the fifth best
      for (let i = 0; i < 5; i++) {
        console.log(time[i], i);

        const newScore = document.createElement('div');
        newScore.classList.add('player-score');

        const scoreNumber = document.createElement('h3');
        scoreNumber.classList.add('score-number');
        scoreNumber.innerHTML = i + 1;

        const scoreName = document.createElement('h3');
        scoreName.classList.add('score-name');
        for (let player of players) {
          if (player.time === time[i]) {
            scoreName.innerHTML = player.name;
            break;
          }
        }

        const scoreTime = document.createElement('h3');
        scoreTime.classList.add('score-time');
        if (time[i] !== undefined) scoreTime.innerHTML = time[i];

        newScore.append(scoreNumber, scoreName, scoreTime);
        scoreList.appendChild(newScore);
      }

      // change page display
      gameDiv.style.display = 'none';
      scoreDiv.style.display = 'block';
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

// function createScoreDiv(player) {
//   const newScore = document.createElement('div');
//   newScore.classList.add('player-score');

//   const scoreNumber = document.createElement('h3');
//   scoreNumber.classList.add('score-number');
//   scoreNumber.innerHTML = player.index;

//   const scoreName = document.createElement('h3');
//   scoreName.classList.add('score-name');
//   scoreName.innerHTML = player.name;

// const scoreTime = document.createElement('h3');
// scoreTime.classList.add('score-time');
// scoreTime.innerHTML = player.time;

// newScore.append(scoreNumber, scoreName, scoreTime);
// scoreList.appendChild(newScore);
// }
