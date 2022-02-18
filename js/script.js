// Initials Data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: '',
}

let player = '';
let warning = ''
let playing = false

reset()

// Events

document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', itemClick)
})


// Functions


// Definindo se e o jogador X ou O
function itemClick(event) {

  let item = event.target.getAttribute('data-item')
  if(playing && square[item] === ''){
    square[item] = player
    renderSquare()
    togglePlayer()
  }

}


// Efetuando o reset ao clicar no botão, pra começar um novo jogo
function reset()  {
  warning = ''

  let random = Math.floor(Math.random() * 2)
  player = (random === 0) ? 'X' : 'O'

  for(let item in square) {
    square[item] = ''
  }

  playing = true

  renderSquare()
  renderInfo()

}

// Renderizando os dados no quadro
function renderSquare() {

  for(let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = square[i]
  }

  checkGame()

}

// Renderizando as info dos jogadores e ganhador

function renderInfo() {
  document.querySelector('.vez').innerHTML = player
  document.querySelector('.resultado').innerHTML = warning
}

// Alterando a vez do jogador
function togglePlayer() {
  player = (player === 'X') ? 'O' : 'X'
  renderInfo()
}

// Verificar o status atual do jogo
function checkGame() {
  if(checkWinnerFor('X')) {
    warning = "O 'X' Venceu"
    playing = false
  } else if (checkWinnerFor('O')) {
    warning = "O 'O' Venceu"
    playing = false
  } else if(isFull()) {
    warning = 'Deu Empate'
    playing = false
  } 
}

// Verificando o vencedor
function checkWinnerFor(player) {
  let possibilities = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1',
  ]

  for(let i in possibilities) {
    let splitArray = possibilities[i].split(',')
    let hasWon = splitArray.every((option) => square[option] === player)
    if(hasWon) {
      return true
    }
  }

  return false
}

// Verificando se deu empate
function isFull() {
  for(let i in square) {
    if(square[i] === '') {
      return false
    }
  }

  return true
}


