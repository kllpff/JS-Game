const
			$start = document.querySelector('#start'),
			$game  = document.querySelector('#game'),
			$result = document.querySelector('#result'),
			$resultHeader = document.querySelector('#result-header'),
			$timeHeader = document.querySelector('#time-header'),
			gameSize = $game.getBoundingClientRect();

let score = 0,
		isGameStarted = false,
		gameTime = document.querySelector('#game-time'),
		timer = document.querySelector('#time'),
		$box = document.createElement('div');

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function startGame() {
	score = 0;
	setGameTime();
	gameTime.setAttribute('disabled', 'true');
	show($timeHeader);
	hide($resultHeader);
	isGameStarted = true;
	hide($start);
	$game.style.backgroundColor = '#fff';

	let interval = setInterval(function() {
		let time = parseFloat(timer.textContent);

		if(time <= 0) {
			clearInterval(interval);
			endGame();
		} else {
			timer.textContent = (time - 0.1).toFixed(1);
		}
	}, 100);

	renderBox();
}

function endGame() {
	isGameStarted = false;
	$game.innerHTML = '';
	$game.style.backgroundColor = '#ccc';
	show($start);
	hide($timeHeader);
	gameTime.removeAttribute('disabled');
	setGameScore();
	show($resultHeader);
}

function handleBoxClick(event) {
	if(!isGameStarted) {
		return;
	}

	if(event.target.dataset.box) {
		score++;
		renderBox();
	}
}

function renderBox() {
	let boxSize = getRandom(30, 100),
			maxTop = gameSize.height - boxSize,
			maxLeft = gameSize.width - boxSize;

	$game.innerHTML = '';

	$box.style.height = $box.style.width = boxSize + 'px';
	$box.style.position = 'absolute';
	$box.style.backgroundColor = getRandomColor();
	$box.style.top = getRandom(0, maxTop) + 'px';
	$box.style.left = getRandom(0, maxLeft) + 'px';
	$box.style.cursor = 'pointer';
	$box.setAttribute('data-box', 'true');

	$game.insertAdjacentElement('afterbegin', $box);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
	let letters = '0123456789ABCDEF',
			color = '#';

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}

function setGameScore() {
	$result.textContent = score.toString();
}

function setGameTime() {
	let time = parseInt(gameTime.value);
	timer.textContent = time.toFixed(1);
	show($timeHeader)
	hide($resultHeader)
}

function show($el) {
	$el.classList.remove('hide');
}

function hide($el) {
	$el.classList.add('hide');
}