//initial data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
};

let player = '';
let namePlayer = '';
let alert = '';
let playing = false;
let won = '';
let scoreboardX = 0;
let scoreboardO = 0;
let draw = 0;
let winner = '';
let pArray = [];
let hasWon = [];
let iaOn = false;

//events
document.querySelector('#start-button').addEventListener('click', ()=>{start();popSound()});
document.querySelector('#player-button').addEventListener('click', ()=>{mode();popSound()});
document.querySelector('#play-button').addEventListener('click', ()=>{play();popSound()});
document.querySelector('#donation-button-footer').addEventListener('click', openDonation);
document.querySelector('#donation-button').addEventListener('click', openDonation2);
document.querySelector('#back-button').addEventListener('click', closeDonation);
document.querySelector('#back-button-2').addEventListener('click', closeDonation2);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
});
document.querySelector('#more-match-button').addEventListener('click', reset);
document.querySelector('#end-button').addEventListener('click', account);
document.querySelector('#reset-button').addEventListener('click', resetAll);
document.querySelector('#iA-button').addEventListener('click', ()=>{iaActive(); popSound()})

//functions

function iaActive() {
  iaOn = true
  document.querySelector('.popUp-game-Mode').style.display = 'none'
  document.querySelector('.popUp-prize-draw').style.display = 'flex'
  
  prizeDraw ()
}
function iaActiveOff() {
  iaOn = false
}


function start() {
  setTimeout (()=> {document.querySelector('.popUp-welcome').style.display = 'none';
  document.querySelector('.popUp-game-Mode').style.display = 'flex';},250)
  toggleState();
}
function popSound() {
  document.querySelector('#pop-sound-Effect').play()
}
function mode() {
  document.querySelector('.popUp-game-Mode').style.display = 'none';
  document.querySelector('.popUp-prize-draw').style.display = 'flex';
  prizeDraw();
}

function play() {
  playing = true;
  document.querySelector('.popUp-prize-draw').style.display = 'none';
  document.querySelector('.alerts').style.display = 'none';
  updateScoreboard();

  if (iaOn === true && player === 'O') {
    // A vez da IA começar o jogo
      makeAIMove();
      nextPlayer();
}
}

function prizeDraw() {
  const random = Math.floor(Math.random() * 2);
  if (random === 0) {
    player = 'X';
    document.querySelector('#next-player').src = 'assets/images/cao.png';
    document.querySelector('.popDescription-prize').innerHTML = '<p>Coragem</p> <img id="imgPrize" src="assets/images/cao.png">';
  } else {
    player = 'O';
    document.querySelector('#next-player').src = 'assets/images/eustacio.png';
    document.querySelector('.popDescription-prize').innerHTML = '<p>Eustácio</p> <img id="imgPrize" src="assets/images/eustacio.png">';
  }
}

function toggleState() {
  let button = document.querySelector(".toggle-button");
  let slider = document.querySelector(".slider");
  let audioElement = document.querySelector('#background-music');
  

  if (audioElement.paused) {
    button.classList.add("ligado");
    slider.style.left = "20px"; // Posição do slider para "ligado"
    audioElement.play();
  } else {
    button.classList.remove("ligado");
    slider.style.left = "1px"; // Posição do slider para "desligado"
    audioElement.pause();
  }
  audioElement.addEventListener('ended', function() {
    // Quando a música terminar, reinicie a reprodução
    audioElement.currentTime = 0; // Volta para o início da música
    audioElement.play();
  });
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function drawChengercolorsOn() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.style.backgroundColor = 'rgba(255, 145, 2, 0.4)';
  }
}
function drawChengercolorsOff() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.style.backgroundColor = '';
  }
}

function nextPlayer() {
  if (player === 'X') {
    player = 'O';
    document.querySelector('#next-player').src = 'assets/images/eustacio.png';
  } else if (player === 'O') {
    player = 'X';
    document.querySelector('#next-player').src = 'assets/images/cao.png';
  }
}

function nextPlayerAfterWin() {
  if (won === 'X') {
    player = 'O';
  } else if (won === 'O') {
    player = 'X';
  } else if (won === 'empate') {
    if (player === 'X') {
      player = 'O';
      document.querySelector('#next-player').src = 'assets/images/eustacio.png';
    } else if (player === 'O') {
      player = 'X';
      document.querySelector('#next-player').src = 'assets/images/cao.png';
    }
  }
}

function reset() {
  for (let i in square) {
    square[i] = '';
  }
  playing = true;
  document.querySelector('.popUp-match-result').style.display = 'none';
  document.querySelector('.alerts').style.display = 'none';
  

  if (iaOn === true && player === 'O') {
      makeAIMove();
      nextPlayer();
  }
  changeColorOff();
  drawChengercolorsOff();
  renderSquare();
}

function resetAll() {
  player = '';
  namePlayer = '';
  playing = false;
  won = '';
  scoreboardX = 0;
  scoreboardO = 0;
  draw = 0;
  reset();
  updateScoreboard();
  iaActiveOff()
  document.querySelector('.popUp-end-game').style.display = 'none';
  openWindowsInitial();
}

function openDonation() {
  document.querySelector('.alerts').style.display = 'block';
  document.querySelector('.popUp-donation').style.display = 'flex';
}

function closeDonation() {
  document.querySelector('.popUp-donation').style.display = 'none';
  document.querySelector('.alerts').style.display = 'none';
}

function openDonation2() {
  document.querySelector('.popUp-donation-2').style.display = 'flex';
}

function closeDonation2() {
  document.querySelector('.popUp-donation-2').style.display = 'none';
}

function itemClick(event) {
  let item = event.target.getAttribute('data-item')
  if(iaOn == false && playing && square[item] === '') {
    square[item] = player
    renderSquare()
    if (hasWon == true ){ nextPlayerAfterWin(), nextPlayer()
    } else {
      nextPlayer()
    }
  } 
  
  if (iaOn == true && playing && square[item] === '') {
    square[item] = player
    renderSquare()
    if (hasWon == true ){ iaOn = false, nextPlayerAfterWin(), nextPlayer()
    } else {
      nextPlayer()
    }

    if (isfull() === true) {
      iaOn = false
      setTimeout(()=>{
        iaOn = true
      },500)
    } else {
      setTimeout(() => {
        makeAIMove();
        iaOn = true
      }, 500);
      renderSquare()
      nextPlayer()
    } 
  }
}
function checkGame() {
  if (checkWinnerFor('X')) {
    won = 'X';
    playing = false;
    matchResult();
    checkWon(won);
    changeColorOn();
    console.log(won)
  } else if (checkWinnerFor('O')) {
    won = 'O';
    playing = false;
    matchResult();
    checkWon(won);
    changeColorOn();
    console.log(won)
  } else if (isfull()=== true) {
    won = 'empate';
    playing = false;
    matchResult();
    checkWon(won);
    drawChengercolorsOn();
    console.log(won)
  }
}

function matchResult() {
  setTimeout(() => {
    document.querySelector('.alerts').style.display = 'block';
    document.querySelector('.popUp-match-result').style.display = 'flex';
    updateScoreboard();

    if (won === 'X') {
      document.querySelector('.popTitle-match-result').innerHTML = 'Ganhador da rodada:';
      document.querySelector('.popDescription-match-result').innerHTML = '<p>WIN Coragem ☆</p><img class="imgMatch" src="assets/images/cao.png"><p>gostaria de jogar mais uma, ou finalizar a partida?</p>';
    } else if (won === 'O') {
      document.querySelector('.popTitle-match-result').innerHTML = 'Ganhador da rodada:';
      document.querySelector('.popDescription-match-result').innerHTML = '<p>WIN Eustácio ☆</p><img class="imgMatch" src="assets/images/eustacio.png"><p>gostaria de jogar mais uma, ou finalizar a partida?</p>';
    } else if (won === 'empate') {
      document.querySelector('.popTitle-match-result').innerHTML = 'ih, Empatou!!!';
      document.querySelector('.popDescription-match-result').innerHTML = '<p>Deu Velha...</p><img class="imgMatch" src="assets/images/muriel.png"><p>gostaria de jogar mais uma, ou finalizar a partida?</p>';
    }
  }, 1300);
}

function checkWinnerFor(player) {
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'c1,b2,a3'
  ];

  for (let w in pos) {
    pArray = pos[w].split(',');
    hasWon = pArray.every(option => square[option] === player);
    if (hasWon) {
      return true;
    }
  }

  return false;
}

function changeColorOn() {
  document.querySelector(`div[data-item="${pArray[0]}"]`).style.backgroundColor = "rgba(83, 156, 68, 0.6)";
  document.querySelector(`div[data-item="${pArray[1]}"]`).style.backgroundColor = "rgba(83, 156, 68, 0.6)";
  document.querySelector(`div[data-item="${pArray[2]}"]`).style.backgroundColor = "rgba(83, 156, 68, 0.6)";
}

function changeColorOff() {
  document.querySelector(`div[data-item="${pArray[0]}"]`).style.backgroundColor = "";
  document.querySelector(`div[data-item="${pArray[1]}"]`).style.backgroundColor = "";
  document.querySelector(`div[data-item="${pArray[2]}"]`).style.backgroundColor = "";
}

function isfull() {
  for (let i in square) {
    if (square[i] === '') {
      return false;
    }
  }

  return true;
}
function isfullA() {
  for (let i in square) {
    if (square[i] === '') {
      return false;
    }
  }

  return true;
}

function updateScoreboard() {
  document.querySelector('.scoreboard').innerHTML = `<img class="player1" src="assets/images/cao.png">
  <h1>${scoreboardX}</h1>
  <p>x</p>
  <h1>${scoreboardO}</h1>
  <img class="player2" src="assets/images/eustacio.png">`;
  document.querySelector('.draw').innerHTML = `<p>Empates: ${draw}</p>`;
}

function checkWon(won) {
  if (won === 'X') {
    scoreboardX++;
  } else if (won === 'O') {
    scoreboardO++;
  } else if (won === 'empate') {
    draw++;
  }
  updateScoreboard();
}



function account() {
  document.querySelector('.popUp-match-result').style.display = 'none';
  document.querySelector('.popUp-end-game').style.display = 'flex';

  if (scoreboardX > scoreboardO) {
    document.querySelector('.popDescription-end-game').innerHTML = `<p>Placar final ${scoreboardX}x${scoreboardO}!</p>
    <img class="imgWinner" src="assets/images/cao.png">
    <p>Coragem WINNER 🏆</p>`;
  } else if (scoreboardX < scoreboardO) {
    document.querySelector('.popDescription-end-game').innerHTML = `<p>Placar final ${scoreboardO}x${scoreboardX}!</p>
    <img class="imgWinner" src="assets/images/eustacio.png">
    <p>Eustácio WINNER 🏆</p>`;
  } else if (scoreboardX === scoreboardO) {
    document.querySelector('.popDescription-end-game').innerHTML = `<p>Placar final ${scoreboardX}x${scoreboardO}!</p>
    <img class="imgWinner" src="assets/images/muriel.png">
    <p>EMPATE, ninguém ganhou...🏆</p>`;
  }
}

function openWindowsInitial() {
  document.querySelector('.alerts').style.display = 'block';
  document.querySelector('.popUp-game-Mode').style.display = 'flex';
}

// Jogadas automáticas player vs IA(fake)/máquina chatGPT adaptado para o meu algoritmo 

function makeAIMove() {
  // Função que escolhe a melhor jogada para a IA usando o algoritmo Minimax
  let bestScore = -Infinity;
  let move;
  for (let i in square) {
    if (square[i] === '') {
      square[i] = 'O';
      let score = minimax(square, 0, false);
      square[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  square[move] = 'O'; // Realiza a jogada da IA na posição escolhida
  renderSquare()
}

function minimax(board, depth, isMaximizing) {
  let scores = {
    X: -1,
    O: 1,
    empate: 0
  };

  if (checkWinnerFor('X')) {
    return scores.X - depth;
  } else if (checkWinnerFor('O')) {
    return scores.O + depth;
  } else if (isfullA() === true ) {
    return scores.empate;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i in board) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i in board) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth +1 , true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

