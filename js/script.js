var largeCells = document.getElementsByClassName('lg-cell');

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
 * Append click events to all the buttons
 * The main part of the program takes place here
 *
 */
function appendEventListeners(cells) {

	var currentPlayer= 'X';

	// contains the number of the large cell which a player should make his step in
	// -1 when it's the first step and a player can make his step wherever he/she wants
	var correctStep = -1;

	var lastLargeCellNumber;
	// appending this function to every single button
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			cells[i][j].addEventListener('click', function()
			{
				// make sure that a player has made his move in the right large cell
				if (i == correctStep || correctStep == -1) {
					// if this cell is clear, a player can make his move here
					if (cells[i][j].textContent == '') {
						// highlightning the right large cell for the next move
						largeCells[j].style.backgroundColor = "rgb(160, 231, 244)";
						// resetting the previous highlightning except if the previous one is the same as the present one
						if (correctStep != -1 && correctStep != j) largeCells[correctStep].style.backgroundColor = "rgb(203, 247, 255)";
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
						correctStep = j;	 // set the correct large cell for the next move
					}
				}
			});
		}
	}
}

appendEventListeners(getCells());
