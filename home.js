let home = document.getElementById('home');
let gamePage = document.getElementById('game-page');
let buttonPlay = document.getElementById('play');

buttonPlay.addEventListener("click", () => {
    if(getComputedStyle(gamePage).display != "none"){
        gamePage.style.display = "none";
    } else {
        game.style.display = "block";
    }
}

function buttonPlay(){
    if(getComputedStyle(gamePage)).display != "none"){
      gamePage.style.display = "none";
    } else {
      gamePage.style.display = "block";
    }
  };
  buttonPlay.onclick = gamePage;