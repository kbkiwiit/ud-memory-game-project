/*
* GLOBAL VARIABLES 
*/

//create list to hold all cards.
const allCards = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-bicycle",
    "fa fa-bicycle"
  ];
  
  //Adding cards to the deck and starting the game.
  const grabDeck = document.querySelector(".deck");
  
  //Card arrays
  var clickedCards = [];
  var matchedCards = [];
  
  //Moves
  const numMoves = document.querySelector(".moves");
  numMoves.innerHTML = 0;
  let moves = 0;
  
  //Restart Button
  const restart = document.getElementById("restartBtn");
  
  //Star Rating
  const rating = document.querySelector(".stars");
  const star = '<li><i class="fa fa-star"></i></li>';
  
  //Timer
  const timerOutput = document.querySelector(".timer");
  let firstClick = true;
  
  //Modal
  var modal = document.getElementById("resultModal");
  var span = document.getElementsByClassName("close")[0];
  var buttonYes = document.getElementById("playAgain");
  var buttonNo = document.getElementById("playAgainNo");
  
  //Scoring
  var score = document.getElementById("score");
  var timed = document.getElementById("timeTaken");
  
  /*
  * START THE GAME, CREATE DECK
  */
  
  function startGame() {
    for (let i = 0; i < allCards.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<i class="${allCards[i]}"></i>`;
      grabDeck.appendChild(card);
      //Add eventlistener to each card
      flip(card);
    }
  }
  
  /*
  * FLIP CARDS
  */
  
  function flip(card) {
    //Open cards and save to array
    card.addEventListener("click", function() {
      //Check if this is the first click and start timer
      if (firstClick == true) {
        startTimer();
        firstClick = false;
      }
  
      const firstCard = this;
      const secondCard = clickedCards[0];
  
      if (clickedCards.length === 1) {
        card.classList.add("open", "show", "noclick");
        clickedCards.push(this);
  
        //card matching
        checkMatch(firstCard, secondCard);
      } else {
        card.classList.add("open", "show", "noclick");
        clickedCards.push(this);
      }
    });
  }
  
  /*
  * CHECK IF CARDS MATCH
  */
  //TO DO: Timer restarts whenever cards are matched.
  function checkMatch(firstCard, secondCard) {
    if (firstCard.innerHTML === secondCard.innerHTML) {
      firstCard.classList.add("match");
      secondCard.classList.add("match");
  
      matchedCards.push(firstCard, secondCard);
      clickedCards = [];
  
      gameOver();
    } else {
      //remove card if it doesn't match
      //show umatched cards then timeout after 1000ms
      setTimeout(function() {
        firstCard.classList.remove("open", "show", "noclick");
        secondCard.classList.remove("open", "show", "noclick");
      }, 1000);
  
      clickedCards = [];
  
      countMoves();
    }
  }
  
  /*
  * TIMER FUNCTION   
  */
  
  //Start timer
  // document.querySelector(".deck").addEventListener("click", startTimer);
  
  // Timer functions
  let sec = 0;
  let min = 0;
  let timer;
  let timeRunning = false;
  let timeStopped = 0;
  
  // start the timer
  function startTimer() {
    if (timeRunning == false) {
      timer = setInterval(insertTime, 1000);
      timeRunning = true;
    } else {
      return;
    }
  }
  
  // stop the timer
  function stopTimer() {
    clearInterval(timer);
    sec = 0;
    min = 0;
    timeRunning = false;
  }
  
  // insert time into time output html
  function insertTime() {
    sec++;
  
    if (sec < 10) {
      sec = `0${sec}`;
    }
  
    if (sec >= 60) {
      min++;
      sec = "00";
    }
  
    // Output time
    timerOutput.innerHTML = "Timer: 0" + min + ":" + sec;
    timeStopped = `0${min}m and ${sec}s`;
  }
  
  /**
   *  RESTART THE GAME
   */
  restart.addEventListener("click", function() {
    //stop the timer
    stopTimer();
  
    //reset all variables
    resetVars();
  
    //restart the game
    startGame();
  });
  
  /*
  * COUNT NUMBER OF MOVES
  */
  function countMoves() {
    moves++;
    numMoves.innerHTML = moves;
  
    starRating();
  }
  /**
   * STAR RATING
   */
  
  //change the star rating based on number of clicks
  rating.innerHTML = star + star + star;
  let finalRating = 3;
  function starRating() {
    if (moves <= 10) {
      rating.innerHTML = star + star + star;
    } else if (moves <= 20) {
      rating.innerHTML = star + star;
      finalRating = 2;
    } else {
      rating.innerHTML = star;
      finalRating = 1;
    }
  }
  
  /**
   * SHUFFLE FUNCTION
   */
  
  //Start the game and shuffle the card order
  startGame(shuffle(allCards));
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  /**
   * END THE GAME
   */
  
  //Notify player that game is over when all cards are matched
  function gameOver() {
    var scoreText = document.createTextNode(
      `Your score is ${finalRating} out of 3 stars!`
    );
    var timedText = document.createTextNode(
      `It took you ${timeStopped} to complete the game!`
    );
  
    //End game
    if (matchedCards.length === allCards.length) {
      score.appendChild(scoreText);
      timed.appendChild(timedText);
      modal.style.display = "block";
  
      stopTimer();
    }
  
    // When the user clicks on x, close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    //Yes button to play again
    buttonYes.addEventListener("click", function() {
      modal.style.display = "none";
      resetVars();
      startGame();
    });
  
    //Yes button to play again
    buttonNo.addEventListener("click", function() {
      modal.style.display = "none";
    });
  }
  
  //Clear Variables
  
  function resetVars() {
    //delete all cards
    grabDeck.innerHTML = "";
  
    //reset score
    score.innerHTML = "";
    timed.innerHTML = "";
  
    //reset all variables
    matchedCards = [];
    moves = 0;
    numMoves.innerHTML = moves;
    rating.innerHTML = star + star + star;
  
    timerOutput.innerHTML = "Timer: 00:00";
    firstClick = true;
  }
  