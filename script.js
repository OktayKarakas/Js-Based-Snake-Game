const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const scoreboard = document.getElementById('scoreboard')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 20
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
scoreboard.textContent = 'Score = ' + score
function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}
createGrid()

currentSnake.forEach((index) => squares[index].classList.add('snake'))
function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  scoreboard.textContent = 'Score = ' + score
  direction = 1
  intervalTime = 1000
  generateApples()
  move()
  currentSnake.forEach((index) => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    scoreboard.textContent =
      'You are Out of The GAME ! ' + 'Your Score is =' + ' ' + score
    return clearInterval(timerId)
  }

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    generateApples()
    score++
    scoreboard.textContent = 'Score = ' + score
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }

  squares[currentSnake[0]].classList.add('snake')
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}

generateApples()

function control(event) {
  if (event.keyCode === 39) {
    direction = 1
  } else if (event.keyCode === 38) {
    direction = -width
  } else if (event.keyCode === 37) {
    direction = -1
  } else if (event.keyCode === 40) {
    direction = +width
  }
}
document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)
