var largeCells = document.getElementsByClassName('lg-cell');
var cells;	// contains a 3x3 array containing arrays of smallCells.

var fieldsWon = new Array(9);
for (let i = 0; i < 9; i++) fieldsWon[i] = false;

/*
 * Returnes an array containing a collection of cells
 * (DOM elements) for putting X or O in it
 *
 */
function getCells()
{
	var smallCells = document.getElementsByClassName('sm-cell');	// small cells

	var cells = [];
	for(let i = 0; i < 9; i++) {
	    cells[i] = new Array(9);
	}

	// auxiliary variables for extracting DOM elements
	var startPoint = 0;
	var endPoint = 9;
	var temp = 0;

	for (let i = 0; i < 9; i++) {
		for (let j = startPoint; j < endPoint; j++) {
				cells[i][temp] = smallCells[j];
				temp++;
		}
		temp = 0; startPoint += 9; endPoint += 9;
	}

	return cells;
}

/*
 * Make a large cell a big 'X' or 'O' sign which means this field is won by this sign.
 * largeCell_id - the id of the largeCell that's just been won
 * sign - a string containing an 'X' or 'O' character representing the winner of a largeCell
 */
function markFieldAsWon(largeCell_id, sign)
{
	largeCells[largeCell_id].innerHTML = "<p>" + sign + "</p>";
	largeCells[largeCell_id].className = 'lg-cell won-cell';
	fieldsWon[largeCell_id] = true;
}

/*
 * Takes the number of a large cell which a player has made a move in
 * and checks if a player has won a large cell
 * if it's true, mark it with a big 'O' or 'X' sign
 * largeCell - the cell which is being checked for being won
 */
function checkForWin(largeCell)
{
	// checking for winning horizontaly
	for (let i = 0; i < 8; i = i + 3) {
		if (cells[largeCell][i].textContent != '' && cells[largeCell][i + 1].textContent != '' && cells[largeCell][i + 2].textContent != '') {
			if (cells[largeCell][i].textContent == cells[largeCell][i + 1].textContent && cells[largeCell][i + 1].textContent == cells[largeCell][i + 2].textContent) {
				return markFieldAsWon(largeCell, cells[largeCell][i].textContent); // passing largeCell id and the sign which has just won the field
			}
		}
	}

	// checking for winning vertically
	for (let i = 0; i < 3; i++) {
		if (cells[largeCell][i].textContent != '' && cells[largeCell][i + 3].textContent != '' && cells[largeCell][i + 6].textContent != '') {
			if (cells[largeCell][i].textContent == cells[largeCell][i + 3].textContent && cells[largeCell][i + 3].textContent == cells[largeCell][i + 6].textContent) {
				return markFieldAsWon(largeCell, cells[largeCell][i].textContent); // passing largeCell id and the sign which has just won the field
			}
		}
	}
	// checking for winning diagonally from the left top corner to the right bottom one
	if (cells[largeCell][0].textContent != '' && cells[largeCell][4].textContent != '' && cells[largeCell][8].textContent != '') {
		if (cells[largeCell][0].textContent == cells[largeCell][4].textContent && cells[largeCell][4].textContent == cells[largeCell][8].textContent) {
			return markFieldAsWon(largeCell, cells[largeCell][0].textContent); // passing largeCell id and the sign which has just won the field
		}
	}
	// checking for winning diagonally from the right top corner to the left bottom one
	if (cells[largeCell][2].textContent != '' && cells[largeCell][4].textContent != '' && cells[largeCell][6].textContent != '') {
		if (cells[largeCell][2].textContent == cells[largeCell][4].textContent && cells[largeCell][4].textContent == cells[largeCell][6].textContent) {
			return markFieldAsWon(largeCell, cells[largeCell][2].textContent); // passing largeCell id and the sign which has just won the field
		}
	}
}

/*
 * Append click events to all the buttons
 * The main part of the program takes place here
 *
 */
function appendEventListeners(cells)
{
	var currentPlayer= 'X';

	// contains the number of the large cell which a player should make his step in
	// -1 when it's the first step and a player can make his step wherever he/she wants
	// -2 when a player make his move in a small cell which matches a large cell that's been won, letting the opponent to move anywhere.
	var correctStep = -1;

	// appending this function to every single button
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			cells[i][j].addEventListener('click', function()
			{
				// make sure that a player has made his move in the right large cell
				if (i == correctStep || correctStep == -1 || correctStep == -2) {
					// if this cell is clear, a player can make his move here
					if (cells[i][j].textContent == '') {
						// resetting the previous highlightning except if the previous one is the same as the present one
						if (correctStep != -1 && correctStep != j && correctStep != -2) largeCells[correctStep].style.backgroundColor = "rgb(203, 247, 255)";
						// the step was made by the 'X' player
						if (currentPlayer == 'X') {
							cells[i][j].innerHTML = '<p>X</p>';
							currentPlayer = 'O'; // the next move is for 'O'
						}
						// the step was made by the 'O' player
						else if (currentPlayer == 'O') {
							cells[i][j].innerHTML = '<p>O</p>';
							currentPlayer = 'X'; // the next move is for 'X'
						}

						// if it's not the first move in the game, and if it's not a free move for the opposite player (-2)
						if (correctStep != -1 && correctStep != -2) checkForWin(correctStep);	// checking if a player has won a large cell
						// if it's a free move, we still need to check for winning
						else if (correctStep == -2) checkForWin(i);								// checking if a player has won a large cell

						if (fieldsWon[j] != true) {
							largeCells[j].style.backgroundColor = "rgb(160, 231, 244)"; 	// highlightning the correct large cell for the next move
							correctStep = j;
						} else {
							// the move has been made in a small cell refering the opposite player to the field which is already won, letting him to move anywhere.
							largeCells[j].style.backgroundColor = "rgb(203, 247, 255)"; 	// resetting highlightning
							correctStep = -2;
						}
					}
				}
			});
		}
	}
}

cells = getCells();
appendEventListeners(cells);
