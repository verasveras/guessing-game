/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var playersGuess;
var winningNumber = generateWinningNumber();
var guesses = [];
var guessesNum = 0;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random()) * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){

	if ($('input').val() == '') {
		alert("You did not input a guess!");
	}
	else {
		playersGuess = +$('input').val();
		$('input').val('');
		checkGuess();
	}

	
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess > winningNumber){
		return "higher";
	} 
	else {
		return "lower";
	}
}

// Create the message to display when the players guess is wrong.
function guessMessage(){

	var digits = Math.abs(winningNumber - playersGuess);
	digits = Math.ceil(digits / 10) * 10;

	if (digits == 0)
		digits = 5

	var msg = "Your guess is " + lowerOrHigher() + " than and within " + digits + " digits of the winning number. \n You have " + (5-guessesNum) + " guesses left."

	return msg;
}

// Check if the Player's Guess is the winning number 
function checkGuess(){

	if (playersGuess == winningNumber){
		guessesNum++;
		if (guessesNum > 5){
			endGame("loser");
		}

		$('.alerts').find('p').html("You won! It took you " + guessesNum + " attempts." );
		$('.alerts').show();
		// $('#play-button').text('Play Again!');
		endGame("winner");
	}
	else {
			if (!(guesses.indexOf(playersGuess) > -1)){
				guesses.push(playersGuess);
				guessesNum++;
				if (guessesNum > 4) {
					endGame("loser");
				}
				else {
					$('.alerts').find('p').text(guessMessage);
					$('.alerts').show();
				}
			}
			
			else {
				$('.alerts').find('p').text("You already guessed that.");
				$('.alerts').show();
			}

	}

}

// Create a provide hint button that provides additional clues
function provideHint(){
	var msg = "One of these numbers is the correct one: " + generateArray(3).toString() + "."; 
    $('.alerts').find('p').text(msg);
    $('.alerts').show();

}


// shuffle an array
function shuffleArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// generate random array to show as hint
function generateArray(x){

	var array = [];
	for (var i = 0; i < x - 1; i++){
		array.push(generateWinningNumber());
	}

	array.push(winningNumber);

	return shuffleArray(array);
}


// Allow the "Player" to Play Again
function playAgain(){

	winningNumber = generateWinningNumber();
    guesses = [];
    guessesNum = 0;
    $('#play-button').text('Reset Game');
    $('.alerts').hide();
}

function endGame(state){
	if (state == "winner"){
		$('#play-button').text('Play Again!');
	}

	else if (state == "loser"){

	}
}

/* **** Event Listeners/Handlers ****  */
$('#submit-button').on('click', playersGuessSubmission);
$('#hint-button').on('click', provideHint);
$('#play-button').on('click', playAgain);

