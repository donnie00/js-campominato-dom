const playBtnEl = document.getElementById('playBtn');
const gameMode = document.getElementById('modeSelect');
let bombs;

playBtnEl.addEventListener('click', function () {
	bombs = generateBombs(10, gameMode.value);
	console.log(bombs);

	createGrid(+gameMode.value);
});

/**
 * creates a grid of n x n tiles
 * @param {number} totalTiles tiles that you want in each row
 */
function createGrid(totalTiles) {
	const boardEl = document.querySelector('.board');
	const tilesPerRow = Math.sqrt(totalTiles);
	const numberedTiles = totalTiles - bombs.length;
	console.log(numberedTiles);
	let numTilesClicked = 0;

	boardEl.innerHTML = '';

	const overlay = document.createElement('div');
	overlay.classList.add('restart-overlay', 'd-none');
	overlay.innerText = 'Game Over!';

	boardEl.append(overlay);

	for (let i = 0; i < totalTiles; i++) {
		const tile = document.createElement('div');

		tile.classList.add('tile');
		tile.style.flexBasis = `calc(100% / ${tilesPerRow})`;
		tile.dataset.tileNumber = i + 1;

		if (bombs.includes(+tile.dataset.tileNumber)) {
			tile.classList.add('bomb');
		}

		boardEl.append(tile);

		tile.addEventListener('click', function () {
			if (!this.classList.contains('clicked')) {
				this.classList.add('clicked');

				if (
					this.classList.contains('bomb') ||
					numTilesClicked === numberedTiles - 1
				) {
					gameEnd();
				} else {
					numTilesClicked++;
				}
			}
		});
	}
}

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
 * generates a random number between min and max both included
 * @param {Number} min min number
 * @param {Number} max max number
 * @returns {Number} random number generated
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * ends the game, showing all the tiles and an ending screen;
 */
function gameEnd() {
	const allTiles = document.querySelectorAll('.tile');

	for (let i = 0; i < allTiles.length; i++) {
		allTiles[i].classList.add('clicked');
	}

	const overlay = document.querySelector('.restart-overlay');

	overlay.classList.remove('d-none');
}
