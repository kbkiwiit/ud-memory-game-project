//create list to hold all cards
const allCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bomb", "fa fa-bomb", "fa fa-bicycle", "fa fa-bicycle"]

//get the deck for adding cards
const grabDeck = document.querySelector(".deck");
var clickedCards = [];
var matchedCards = [];

//Create the cards to start the game
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

/* TO DO: fix issue where if you click fast you can open multiple cards*/
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

/* TO DO: create a pop-up when the game is over */
//Notify player that game is over when all cards are matched
function gameOver() {
    if(matchedCards.length === allCards.length) {
        alert("Game Over!");
    }
}

//count the moves a player makes
const numMoves = document.querySelector(".moves");
numMoves.innerHTML = 0;
let moves = 0;
function countMoves() {
    moves++;
    numMoves.innerHTML = moves;
}

//Enable the reset button
const resetGame = document.querySelector(".restart");
resetGame.addEventListener("click", function() {
    //delete all cards
    grabDeck.innerHTML = "";

    //restart the game
    startGame();

    //clear out all matched cards
    matchedCards = [];
    moves = 0;
    numMoves.innerHTML = moves;
});
/*
* TO DO: Finish this part. Need to add rating to moves function.
*/
//change the star rating based on number of clicks
// const rating = document.querySelector(".stars");
// function starRating("click", function() {
//     stars = 0;
//     if (moves > 3) {
//         rating.innerHTML.remove
//     }
// });

//Start the game
startGame();

// // Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }