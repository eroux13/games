/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

EXTRA:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, dice, previousRoll, gamePlaying;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//Rules for when the roll dice btn is clicked
document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
	 	document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
	 	document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
	 	//double check to make sure the numbers match the correct die
	 	console.log(dice);
	 	/*
	 	//If a player rolls (2) 6's in a row
		if (dice === 6 && previousRoll === 6){
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}
		//3. Update the round score IF the rolled number was NOT a 1
		*/
		if (dice1 !== 1 && dice2 !== 1){
			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else {
			//Next player
			nextPlayer();
		}
		previousRoll = dice;
	};
});

//Rules for when the hold btn is clicked
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//Add current score to global score
		scores[activePlayer] += roundScore;
		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//Read custom points needed to win
		var input = document.querySelector('.final-score').value;
		var winningScore;
		console.log(input);
		//undefined, 0, null, or "" are COERCED to false anything else is COERCED to true
		if(input){
			winningScore = input;
		}
		else{
			winningScore = 100;
		}
		//Check if player won the game
		if(scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else{
			nextPlayer();
		}
	};
});

//Rules for when the new game btn is clicked
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
	//if activePlayer is 0 then activePlayer should be 1 else activePlayer is 0
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	//Display Rules of the game
	alert('Game Rules:\nIn each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score\nBUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn\nThe player can choose to \'Hold\', which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn\nBy default the first player to reach 100 points on GLOBAL score wins the game unless a new score is entered below in the \'Final Score\' box!');

	//Hide the dice when the game loads
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	//Initialize global and current score for both players to 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	//remove the active class from bother players and then set it back to player 1 
	document.querySelector('.player-0-panel').classList.add('active');
}






































