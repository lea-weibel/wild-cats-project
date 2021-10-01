// Check out how to start on first img click & stop at win

window.onload = function () {
  var minuts = 00;
  var seconds = 00; /* 1 ten = 0.01 second, 100 tens = 0.1 second */
  var appendSeconds = document.getElementById("seconds");
  var appendMinuts = document.getElementById("minuts");
  var buttonStart = document.getElementById("start");
  console.log(buttonStart);
  var buttonStop = document.getElementById("stop");
  var buttonReset = document.getElementById("reset");
  var myIntervalVar;

  buttonStart.onclick = function () {
    myIntervalVar = setInterval(startTimer, 1000);
  };

  buttonStop.onclick = function () {
    clearInterval(myIntervalVar);
  };

  buttonReset.onclick = function () {
    clearInterval(myIntervalVar);
    seconds = "00";
    minuts = "00";
    appendSeconds.innerHTML = seconds;
    appendMinuts.innerHTML = minuts;
  };

  function startTimer() {
    seconds++;

    if (seconds <= 9) {
      appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }

    if (seconds > 60) {
      minuts++;
      appendMinuts.innerHTML = "0" + minuts;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
    }

    if (minuts > 9) {
      appendMinuts.innerHTML = minuts;
    }
  }
};

/* When Start is clicked, it triggers a built-in function (setInterval) that triggers a custom function (startTimer) again again at an interval of 10 milliseconds. 
setInterval MUST BE stored in a variable (here myIntervalVar) and that variable will be called when we use the clearInterval built-in function.
The custom function startTimer adds 1 tens of a second at each turn (so every 10 millisecond). Then it goes through a series of if statements that ensure the correct display of seconds and tens. 
The Stop button initiate the clearInterval function to stop the setInterval function which call the startTimer function every 10 millisecond (it stops the clock).
The Reset button does the same thing, but also reinitialize the seconds and tens variables and display to 00. 
  */
