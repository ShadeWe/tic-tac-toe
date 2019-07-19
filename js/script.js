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
	largeCells[largeCell_id].setAttribute('clear', 'false');
	fieldsWon[largeCell_id] = true;
}

/*
 * Takes the number of a large cell which a player has made a move in
 * and checks if a player has won a large cell
 * if it's true, mark it with a big 'O' or 'X' sign
 * largeCell - the cell's id which is being checked for being won
 */
 function checkForWin(grid, largeCell, gamewincheck = false)
 {

	 // checking for a field with a draw (since there's a field with a draw, we cannot move there)
	 if (gamewincheck == false) {
		 var counter = 0;
		 for (let i = 0; i < 8; i++) {
			 if (grid[largeCell][i].getAttribute('clear') == 'false')
				 counter++;
		 }
		 if (counter == 8)
			 fieldsWon[largeCell] = true;
	 }


    // checking for winning horizontaly
    for (let i = 0; i < 8; i = i + 3) {
        if (grid[largeCell][i].getAttribute('clear') == 'false' && grid[largeCell][i + 1].getAttribute('clear') == 'false' && grid[largeCell][i + 2].getAttribute('clear') == 'false') {
            if (grid[largeCell][i].textContent == grid[largeCell][i + 1].textContent && grid[largeCell][i + 1].textContent == grid[largeCell][i + 2].textContent) {
                if (gamewincheck == false) return markFieldAsWon(largeCell, grid[largeCell][i].textContent); // passing largeCell id and the sign which has just won the field
				else return GameOver(grid[largeCell][i].textContent);
			}
        }
    }

    // checking for winning vertically
    for (let i = 0; i < 3; i++) {
        if (grid[largeCell][i].getAttribute('clear') == 'false' && grid[largeCell][i + 3].getAttribute('clear') == 'false' && grid[largeCell][i + 6].getAttribute('clear') == 'false') {
            if (grid[largeCell][i].textContent == grid[largeCell][i + 3].textContent && grid[largeCell][i + 3].textContent == grid[largeCell][i + 6].textContent) {
				if (gamewincheck == false) return markFieldAsWon(largeCell, grid[largeCell][i].textContent); // passing largeCell id and the sign which has just won the field
				else return GameOver(grid[largeCell][i].textContent);
            }
        }
    }
    // checking for winning diagonally from the left top corner to the right bottom one
    if (grid[largeCell][0].getAttribute('clear') == 'false' && grid[largeCell][4].getAttribute('clear') == 'false' && grid[largeCell][8].getAttribute('clear') == 'false') {
        if (grid[largeCell][0].textContent == grid[largeCell][4].textContent && grid[largeCell][4].textContent == grid[largeCell][8].textContent) {
			if (gamewincheck == false) return markFieldAsWon(largeCell, grid[largeCell][0].textContent); // passing largeCell id and the sign which has just won the field
			else return GameOver(grid[largeCell][0].textContent);
        }
    }
    // checking for winning diagonally from the right top corner to the left bottom one
    if (grid[largeCell][2].getAttribute('clear') == 'false' && grid[largeCell][4].getAttribute('clear') == 'false' && grid[largeCell][6].getAttribute('clear') == 'false') {
        if (grid[largeCell][2].textContent == grid[largeCell][4].textContent && grid[largeCell][4].textContent == grid[largeCell][6].textContent) {
			if (gamewincheck == false) return markFieldAsWon(largeCell, grid[largeCell][2].textContent); // passing largeCell id and the sign which has just won the field
			else return GameOver(grid[largeCell][2].textContent);
        }
    }
 }

/*
 * 	Is called when a player won the game, and simply creates a window with a message that someone's has won the game and 'try-again' button
 * 	player - the player that's won the game
 *
 */
function GameOver(player)
{
	var messageWindow = document.getElementById('pop-up-message');
	var messageItself = document.getElementById('message');
	var background = document.getElementById('background');

	background.style.display = 'block';
	setTimeout(function(){
		background.style.opacity = '0.7';
	}, 100);

	messageItself.innerHTML = '<span>' + player + '</span><br \><p> HAS WON THIS GAME<p>';

	messageWindow.style.display = 'block';
	setTimeout(function(){
		messageWindow.style.opacity = '1';
	}, 100);
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
							cells[i][j].setAttribute('clear', 'false');
							currentPlayer = 'O'; // the next move is for 'O'
						}
						// the step was made by the 'O' player
						else if (currentPlayer == 'O') {
							cells[i][j].innerHTML = '<p>O</p>';
							cells[i][j].setAttribute('clear', 'false');
							currentPlayer = 'X'; // the next move is for 'X'
						}
						// if it's not the first move in the game, and if it's not a free move (-2)
						if (correctStep != -1 && correctStep != -2) checkForWin(cells, correctStep);	// checking if a player has won a large cell
						// if it's a free move, we still need to check for winning
						else if (correctStep == -2) checkForWin(cells, i);								// checking if a player has won a large cell

						// fieldsWon[j] contains the field for the opposite player to move, and if this field isn't won yet, highlight it and force the opposite player to move here.
						if (fieldsWon[j] == false) {
							largeCells[j].style.backgroundColor = "rgb(160, 231, 244)"; 	// highlightning the correct large cell for the next move
							correctStep = j;
						// if it turned out that the field the opposite player forced to move in is already won, he/she can make his move anywhere, according to the game rules.
						} else {
							// the move has been made in a small cell refering the opposite player to the field which is already won, letting him to move anywhere.
							largeCells[j].style.backgroundColor = "rgb(203, 247, 255)"; 	// resetting highlightning
							correctStep = -2;
						}

						// checking the whole game for being won
						checkForWin([largeCells], 0, true);

					}
				}
			});
		}
	}
}

cells = getCells();
appendEventListeners(cells);
