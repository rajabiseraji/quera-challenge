var turn = 0; // player 1 - green
var diceRolled = false; // undefined
var die1_num = -1;
var die2_num = -1;
var operation = -1; //undefined
var player_1_place = 0;
var player_2_place = 0;
var gameBoard = [];
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
var winner = -1; //
var gameOver = false;


$(document).ready(function () {
	for (var i = 1; i <= 10; i++) {
		for (var j = 1; j <= 10; j++){
			$('#board').append('<div style="left: ' + (j * 10 - 10 + 1) + '%; top: ' + (i * 10 - 10 + 1) + 
				'%;"><span>' + (10 * i - 10 + j) + '</span><span class="pawn"></span></div>');
		} 
	}
	$("#roll").click(rollDice);
	$(".operator").click(selectOperation);
});

function rollDice () {
	if(diceRolled)
		return;

	roll_dice();
	die1_num = parseInt($("#first_die span").text());
	die2_num = parseInt($("#second_die span").text());
	diceRolled = true;
}

function selectOperation(e) {
	if(!diceRolled || operation !== -1)
		return;
	
	operation = $(e.target).text();
	switch (operation) {
		case '+':
			movePlayer(die1_num + die2_num);
			break;
		case '-':
			movePlayer(die1_num - die2_num);
			break;
		case '×':
			movePlayer(die1_num * die2_num);
			break;
		case '÷':
			movePlayer(Math.floor(die1_num / die2_num));
			break;
	
		default:
			break;
	}

	if(turn === 0)
		$("#panel").css("background-color", "red")
	else
		$("#panel").css("background-color", "green")
	turn++;
	turn %= 2;
	diceRolled = false;
	operation = -1;
}

function movePlayer(displacement) {
	var newPlace = (turn === 0) ? player_1_place + displacement : player_2_place + displacement;
	var validPlace = checkPlace(newPlace);
	if(turn == 0)
		player_1_place = validPlace;
	else	
		player_2_place = validPlace;
	checkWinner();
	showMove();
}

function checkWinner() {
	if (turn === 0) {
		if (player_2_place === player_1_place)
			player_2_place = 0;
		if (player_1_place === 100){
			winner = 0;
			showWinner();
		}
	}
	else {
		if (player_2_place === player_1_place)
			player_1_place = 0;
		if (player_2_place === 100) {
			winner = 1;
			showWinner();
		}
	}
}

function showWinner() {
	var el = $("#msg");
	if(winner === 0) {
		el.removeClass();
		el.addClass("winner_msg_1")
	} else if(winner === 1) {
		el.removeClass();
		el.addClass("winner_msg_2")
	}
	$("#msg span").text('Congratulations!');
	$("button").prop("disabled", true);
	$("#roll").off("click");
	$(".operator").off("click");
}

function showMove() {
	var player = turn + 1;
	$('#first_die span').text('?');
	$('#second_die span').text('?');
	showPlayerPlace(player); //moves the player on board and settles the scores
}

function showPlayerPlace(player) {
	var playerPlace = -1;
	if(player === 1)
		playerPlace = player_1_place;
	else
		playerPlace = player_2_place;

	var el = $("#start_player_"+player);
	var hasFilled = el.hasClass('filled');
	var hasEmpty = el.hasClass('empty');
	var adversary = (player === 2) ? 1 : 2;
	var adversaryPlace = (adversary === 1) ? player_1_place : player_2_place;
	var adversaryEl = $("#start_player_" + adversary);
	if (adversaryPlace === 0) { //restart adversary
		if (!adversaryEl.hasClass('filled'))
			adversaryEl.addClass('filled');
		if (adversaryEl.hasClass('empty'))
			adversaryEl.removeClass('empty');
		$("#start_player_" + adversary + " span").text('');
	}
	if (playerPlace === 0) { // if we need to restart
		if (!hasFilled)
			el.addClass('filled');
		if(hasEmpty)
			el.removeClass('empty');
		$("#start_player_"+player+" span").text('');
		clearBoard(player);
	} else {
		if (hasFilled)
			el.removeClass('filled');
		if(!hasEmpty)
			el.addClass('empty');
		$("#start_player_"+player+" span").text(playerPlace);
		var placeIndex = playerPlace - 1;
		clearBoard(player);
		var el = $("#board div:eq("+placeIndex+") span:eq(1)");
		el.removeClass();
		el.addClass('pawn player_'+player);
	}
}

function clearBoard(player) {
	for (var index = 0; index <= 100; index++) {
		var el = $("#board div:eq(" + index + ") span:eq(1)");
		if(el.hasClass('pawn player_'+player)){
			el.removeClass();
			el.addClass('pawn');
		}
	}
}

function checkPlace(placeNumber) {
	if(primes.includes(placeNumber) || placeNumber > 100 || placeNumber < 1 || !placeNumber)
		return 0;
	else 
		return placeNumber;
}
