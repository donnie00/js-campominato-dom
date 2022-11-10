const playBtnEl = document.getElementById('playBtn');
const gameMode = document.getElementById('modeSelect');
let bombs;

playBtnEl.addEventListener('click', function () {
	bombs = generateBombs(16, gameMode.value);
	console.log(bombs);

	createGrid(+gameMode.value);
});

/**
 * generates an array of random numbers
 * @param {Number} bombsNumber length of the array
 * @return {Array} bombs
 */

function generateBombs(bombsNumber, gameMode) {
	const bombs = [];

	while (bombs.length < bombsNumber) {
		const bombIndex = randomNumber(1, gameMode);

		if (!bombs.includes(bombIndex)) {
			bombs.push(bombIndex);
		}
	}

	return bombs;
}

/**
 * creates a grid of n x n tiles
 * @param {number} totalTiles tiles that you want in each row
 */

function createGrid(totalTiles) {
	const boardEl = document.querySelector('.board');
	const tilesPerRow = Math.sqrt(totalTiles);

	boardEl.innerHTML = '';

	for (let i = 0; i < totalTiles; i++) {
		const tile = document.createElement('div');
		tile.classList = 'tile';
		tile.style.flexBasis = `calc(100% / ${tilesPerRow})`;
		tile.dataset.tileNumber = i + 1;

		boardEl.append(tile);

		tile.addEventListener('click', function () {
			console.log('cliccato il numero ' + this.dataset.tileNumber);
			if (bombs.includes(+this.dataset.tileNumber)) {
				this.classList.add('bomb');
			} else {
				this.classList.add('clicked');
			}
		});
	}
}

/**
 * generates a random number between min and max both included
 * @param {Number} min min number
 * @param {Number} max max number
 * @returns {Number} random number generated
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
