/***** GAME CONSTANTS *****/
const cardGame = document.querySelectorAll('.cards');
const gameDiv = document.getElementById('game-page');
const scoreDiv = document.getElementById('score-page');
const playBtn = document.getElementById('play-btn');
console.log(playBtn);

/* ****** HOME PLAY BUTTON MAKE GAME PAGE APPEAR ****** */
window.open = function () {
  gameDiv.style.display = 'block';
};

/* ********CREATE ARRAY WITH 12 KITTY IMAGES (6X2)*********** */
const kittySounds = [];
let n;
for (let i = 0; i < 12; i++) {
  if (i < 6) {
    n = i + 1;
  } else if (i >= 6) {
    n = i - 5;
  }
  kittySounds[i] = new Audio(`/sounds/CatMeow${n}.mp3`);
  console.log(kittySounds);
  //kittySounds.play();
}

let tune = new Audio('sounds/CatMeow5.mp3');

playBtn.onclick = function () {
  if (kittySounds) {
    for (let sound of kittySounds) {
      sound.play();
      sound.pause();
      sound.currentTime = 0;
    }
  }
};

// initiate varibales used in the the loop
let revealedSounds = [];
let revealedCard = [];
let allCards = [];

/* ********* LOOP THOURGH THE CARDS AND ADD RANDOM KITTY IMAGE ********** */
for (let i = 0; i < cardGame.length; i++) {
  let card = cardGame[i];

  // generate random number
  //let number = Math.floor(Math.random() * kittySounds.length);

  // let newSoundDiv = document.createElement('audio');
  // let newSound = document.createElement('source');
  // newSound.src = `/sounds/CatMeow5.mp3`;
  // newSound.type = 'audio/mpeg';
  // newSoundDiv.appendChild(newSound);
  // card.appendChild(newSoundDiv);

  // card.appendChild(newSounds);

  /* ****** ADD EVENT LISTENER ON CARD WITH GAME ACTIONS ****** */
  card.addEventListener('click', function () {
    tune.play();
    // change the card image from back to kitty image
    // card.firstElementChild.style.display = 'none';
    // card.lastElementChild.style.display = 'block';
    //   revealedSounds.push(card.lastElementChild);
    //   revealedCard.push(card);
    //   // TWO FUNCTIONS TO BE CALLED LATER USING SETTIMEOUT
    //   let unreveal = function () {
    //     revealedSounds[0].style.display = 'none';
    //     revealedCard[0].firstElementChild.style.display = 'block';
    //     revealedSounds[1].style.display = 'none';
    //     revealedCard[1].firstElementChild.style.display = 'block';
    //   };
    //   let reinitializeArray = function () {
    //     revealedSounds = [];
    //     revealedCard = [];
    //   };
    //   if (revealedSounds.length === 2) {
    //     if (
    //       revealedSounds[0].attributes.src.value ===
    //       revealedSounds[1].attributes.src.value
    //     ) {
    //       revealedCard[0].style.opacity = '50%';
    //       revealedCard[1].style.opacity = '50%';
    //       // push all cards to a variable for the final count
    //       allCards.push(revealedCard[0]);
    //       allCards.push(revealedCard[1]);
    //     } else {
    //       setTimeout(unreveal, 600);
    //     }
    //     setTimeout(reinitializeArray, 601);
    //   }
    //   if (allCards.length === 12) {
    //     gameDiv.style.display = 'none';
    //     scoreDiv.style.display = 'block';
    //     clearInterval(myIntervalVar);
    //   }
  });
}
