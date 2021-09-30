const cardGame = document.querySelectorAll('.cards');

/*********CREATE ARRAY WITH 12 KITTY IMAGES (6X2)************/
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


//initiate varibales used in the the loop
let revealedImg = [];
let revealedCard = [];
let allCards = [];

/********** LOOP THOURGH THE CARDS AND ADD RANDOM KITTY IMAGE ***********/
for (let i = 0; i < cardGame.length; i++) {
    let card = cardGame[i];

    // generate random number
    let number = Math.floor(Math.random() * kittyImg.length);

    let newImg = document.createElement('img');
    // create a new array containing the random img name from the array
    newImg.src = kittyImg.splice(number, 1)[0];
    newImg.style.display = 'none';

    card.appendChild(newImg);

    /******* ADD EVENT LISTENER ON CARD WITH GAME ACTIONS *******/
    card.addEventListener('click', function() {
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
        }

        let reinitializeArray = function () {
            revealedImg = [];
            revealedCard = [];
        }

        if (revealedImg.length === 2) {
            if (revealedImg[0].attributes.src.value === revealedImg[1].attributes.src.value) {
                revealedCard[0].style.opacity = '50%';
                revealedCard[1].style.opacity = '50%';
                // push all cards to a variable for the final count
                allCards.push(revealedCard[0]);
                allCards.push(revealedCard[1])
            } else {
                setTimeout(unreveal, 600);
            }
            setTimeout(reinitializeArray, 601);
        }

        if (allCards.length === 12) {
           window.alert("YOU'RE A WINNER !");
        }
    })
}




