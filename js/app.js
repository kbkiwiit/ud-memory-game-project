//create list to hold all cards.
const allCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bomb", "fa fa-bomb", "fa fa-bicycle", "fa fa-bicycle"]

//Adding cards to the deck and starting the game.
const grabDeck = document.querySelector(".deck");
var clickedCards = [];
var matchedCards = [];

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

// Function called when you click on a card to flip it.

function flip(card) {
        //Open cards and save to array
        card.addEventListener("click", function() {

            const firstCard = this;
            const secondCard = clickedCards[0];
    
            if(clickedCards.length === 1) {
    
                card.classList.add("open", "show", "noclick");
                clickedCards.push(this);

                //card matching
                checkMatch(firstCard, secondCard);
            } 
            
            else {
                card.classList.add("open", "show", "noclick");
                clickedCards.push(this);
            }
        });
}

//check if cards match
function checkMatch(firstCard, secondCard) {
        if(firstCard.innerHTML === secondCard.innerHTML) {
        
            firstCard.classList.add("match");
            secondCard.classList.add("match");

            matchedCards.push(firstCard, secondCard);
            clickedCards = [];

            gameOver();

        } 
        //remove card if it doesn't match
        else {

            //show umatched cards then timeout after 1000ms
            setTimeout(function() {
            firstCard.classList.remove("open", "show", "noclick");
            secondCard.classList.remove("open", "show", "noclick");
            }, 1000); 

            clickedCards = [];

            countMoves();

        }
    }

//count the moves a player makes
const numMoves = document.querySelector(".moves");
numMoves.innerHTML = 0;
let moves = 0;
function countMoves() {
    moves++;
    numMoves.innerHTML = moves;
    
    starRating();
}

// //Run timer when game starts
const timerOutput = document.querySelector(".timer");

// Start timer on first click
document.querySelector(".deck").addEventListener("click", startTimer);

/* THIS SEEMS TO WORK FOR STOPPING THE TIMER AT THE MOMENT */
document.querySelector(".restart").addEventListener("click", stopTimer);

// document.querySelector(".reset-timer").addEventListener("click", () => {
//   stopTimer();
//   timerOutput.innerHTML = "00:00";
// });

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
timeStopped = `0${min}m and ${sec}s`
sec++;

  if (sec < 10) {
    sec = `0${sec}`;
  }

  if (sec >= 60) {
    min++;
    sec = "00";
  }

  // display time
timerOutput.innerHTML = "Timer: " + "0" + min + ":" + sec;
}

/* TRY TO GET THE PLAY AGAIN BUTTON TO RESET THE GAME */
//Enable the reset button
function reset() {
    document.getElementById("restart").addEventListener("click", function() {

        //delete all cards
        grabDeck.innerHTML = "";

        //reset score
        score.innerHTML = '';
        timer.innerHTML = '';

        //restart the game
        startGame();

        //reset all variables
        matchedCards = [];
        moves = 0;
        numMoves.innerHTML = moves;
        rating.innerHTML = star + star + star;

    });
/* NEED TO TRY TO RESET THE GAME AND THE TIMER AT THE SAME TIME */
    // document.querySelector(".restart").addEventListener("click", stopTimer);
    // stopTimer();
    // timerOutput.innerHTML = "00:00";
}

//change the star rating based on number of clicks
const rating = document.querySelector(".stars");
const star = '<li><i class="fa fa-star"></i></li>';
rating.innerHTML = star + star + star;
let finalRating = 3;
function starRating() {

    if (moves < 5) {
        rating.innerHTML = star + star + star;
    } else if(moves < 10) {
        rating.innerHTML = star + star;
        finalRating--;
    } else {
        rating.innerHTML = star;
        finalRating = 1;
    }
};

//Start the game and shuffle the card order
startGame(shuffle(allCards));

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Notify player that game is over when all cards are matched
function gameOver() {
    // Get the modal
    const modal = document.getElementById("resultModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    //Get the play again button
 

    //Create paragraphs for score and time to complete
    var score = document.getElementById("score")
    var timed = document.getElementById("timeTaken")

    var scoreText = document.createTextNode(`Your score is ${finalRating} out of 3 stars!`);
    var timedText = document.createTextNode(`It took you ${timeStopped} to complete the game!`);

    //End game
    if(matchedCards.length === allCards.length) {
        score.appendChild(scoreText);
        timed.appendChild(timedText);
        modal.style.display = "block";
        }

        // //Add in play again button
        document.getElementById("playAgain").onclick = function() {
            modal.style.display = "none";
            reset();
        }

        // When the user clicks on x, close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }