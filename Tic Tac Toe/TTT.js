
const playerHeader = document.getElementById("player-heading");
const squareButton = document.querySelectorAll('.game-square');
const restartButton = document.getElementById("restart-button");
const backButton = document.getElementById('back');
let currentPlayer = 1;
let dataset = generateBoard();
let winningSquares = [];

squareButton.forEach((item, index) => {
    item.addEventListener('click', () => {
        let row = Math.floor(index/3);
        let col = index%3;
        playersMove(item, row, col);
       })
    })
    
function playersMove(square, row, col){
    if (currentPlayer === 1){
        square.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px red, 0 0 40px red, 0 0 50px red, 0 0 60px red, 0 0 70px red";
        square.textContent = 'X';
    }
    else{
        square.style.textShadow= "0 0 10px #fff, 0 0 20px #fff, 0 0 30px blue, 0 0 40px blue, 0 0 50px blue, 0 0 60px blue, 0 0 70px blue";
        square.textContent = 'O';
    }
    square.disabled = true;
    dataset[row][col] = currentPlayer;
    if (playerWon(dataset, row, col)){
        playerHeader.textContent = `Player ${currentPlayer} Wins!`
        endgame()
    }
    else if(dataset.every(value => !value.includes(0))){
        playerHeader.textContent = "Tie Game!";
        endgame();
    }

    else{
        changeHeading();
    }
}

function playerWon(gameSquares, row, col){

    const vertical = gameSquares[0][col] === gameSquares[1][col] && gameSquares[1][col] === gameSquares[2][col];
    const horizontal = gameSquares[row][0] === gameSquares[row][1] && gameSquares[row][1] === gameSquares[row][2];
    const TopLeftDiagonal = gameSquares[0][0] === currentPlayer && 
                            gameSquares[1][1] === currentPlayer &&
                            gameSquares[2][2] === currentPlayer;
    const TopRightDiagonal =  gameSquares[0][2] === currentPlayer &&
                            gameSquares[1][1] === currentPlayer &&
                            gameSquares[2][0] === currentPlayer;
    
    if (vertical) winningSquares.push(col, col+3, col +6);
    else if(horizontal) winningSquares.push(row*3, row*3+1, row*3 + 2);
    else if(TopRightDiagonal) winningSquares.push(2,4,6);
    else if(TopLeftDiagonal) winningSquares.push(0,4,8)
    
    return vertical || horizontal || TopLeftDiagonal || TopRightDiagonal;
}

function setPlayerHeading(){
    playerHeader.textContent = "Player 1's Turn";
}

function changeHeading(){
    playerHeader.textContent = currentPlayer == 1 ? "Player 2's Turn" : "Player 1's Turn";
    currentPlayer = currentPlayer == 1 ? 2 : 1;
}

restartButton.addEventListener('click', restartgame);
backButton.addEventListener('click', restartgame);
backButton.addEventListener('click', () => {
    document.getElementById('board').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
})

function endgame(){
    squareButton.forEach((item, index) => {
        item.disabled = true;
        if (winningSquares.includes(index)){
            item.classList.add('transition');
        }
    })
    restartButton.disabled = false;
}

function restartgame(){
    squareButton.forEach(item => {
        item.textContent = '';
        item.disabled = false;
        item.classList.remove('transition');
    })
    setPlayerHeading();
    currentPlayer = 1;
    dataset = generateBoard();
    winningSquares = []
    restartButton.disabled = true;
}

function generateBoard(){
    return [new Array(3).fill(0),new Array(3).fill(0),new Array(3).fill(0)];
}