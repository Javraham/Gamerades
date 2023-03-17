const CFPlayerHeader = document.getElementById('cf-player-heading');
const CFButtons = document.querySelectorAll('.CF-square');
const restartCF = document.getElementById('cf-restart');
const backButtons = document.querySelectorAll('.back');
const boardWidth = 7;
const boardHeight = 6;
let CFcurrentPlayer = 1;
let cfArray = generateCFBoard();
let rowArray = generateRowArray();
let winningSquaresCF = [];

CFButtons.forEach((item, index, arr) => {
    item.addEventListener('click', () => {
        let col = index%7;
        let row = rowArray[col]
        rowArray[col]--;
        makeMove(arr[(row)*7+col], row, col);
       })
    })

function makeMove(gameSquare, row, col){
    if(CFcurrentPlayer === 1){
        gameSquare.style.backgroundColor = 'red';
        CFButtons.forEach((square) => {
            square.classList.add('CF-square-2')
        })
    }
    else{
        gameSquare.style.backgroundColor = 'black';
        CFButtons.forEach((square) => {
            square.classList.remove('CF-square-2')
        })
    }
    gameSquare.disabled = true;
    cfArray[row][col] = CFcurrentPlayer;
    if(isAWin(row, col)){
        CFPlayerHeader.textContent = `Player ${CFcurrentPlayer} Wins!`
        endGame();
    }
    else if (cfArray.every((array) => !array.includes(0))){
        CFPlayerHeader.textContent = "Tie Game!";
        endGame();
    }
    else{
        changePlayerHeading();
    }
}

function setPlayerHeading(){
    CFPlayerHeader.textContent = "Player 1's Turn";
    currentPlayer = 1;
}

function changePlayerHeading(){
    CFPlayerHeader.textContent = CFcurrentPlayer === 1 ? "Player 2's Turn" : "Player 1's Turn";
    CFcurrentPlayer = CFcurrentPlayer === 1 ? 2 : 1;
}

function isAWin(row, col){
    // vertical check
    let count = 0;
    let rownum = boardHeight - row - 1
    for (let i = 0; i < boardHeight; i++) {
        if (cfArray[i][col] == CFcurrentPlayer){
            count++;
            if(count === 4){
                winningSquaresCF.push(i*7+col, (i-1)*7+col, (i-2)*7+col, (i-3)*7+col)
                console.log(winningSquaresCF);
                return true
            }
        }
        else{
            count = 0;
        }
    }
    count = 0;
    //horizontal check
    for (let i = 0; i < boardWidth; i++) {
        if (cfArray[row][i] == CFcurrentPlayer){
            count++;
            if(count === 4){
                winningSquaresCF.push(row*7+i, row*7+i-1, row*7+i-2, row*7+i-3);
                console.log(winningSquaresCF)
                return true;
            }
        }
        else{
            count = 0;
        }
    }
    count = 0;
    //up to the Right diagonal check
    if(rownum == 0){
        j = col;
        i = row;
    }
    else if (col > rownum){
        i = boardHeight - 1;
        j = col%rownum;
    }
    else{
        i = row + col;
        j = 0;
    }

    while (i >= 0 && j < boardWidth){
        if(cfArray[i][j] === CFcurrentPlayer){
            count++;
            if(count === 4){
                winningSquaresCF.push(i*7+j, (i+1)*7+j-1, (i+2)*7+j-2, (i+3)*7+j-3);
                console.log(winningSquaresCF);
                return true;
            }
        }
        else{
            count = 0;
        }
        i--;
        j++;
    }
    count = 0;
    //down to the Right diagonal check
    if(row == 0){
        i = row;
        j = col;
    }
    else if (col > row){
        i = 0;
        j = col%row;
    }
    else{
        i = row-col;
        j = 0;
    }

    while (i < boardHeight && j < boardWidth){
        if(cfArray[i][j] === CFcurrentPlayer){
            count++;
            if(count === 4){
                winningSquaresCF.push(i*7+j, (i-1)*7+j-1, (i-2)*7+j-2, (i-3)*7+j-3);
                console.log(winningSquaresCF);
                return true;
            }
        }
        else{
            count = 0;
        }
        j++;
        i++;
    }

    return false;
}

restartCF.addEventListener('click', restart);
backButtons[1].addEventListener('click', restart)
backButtons[1].addEventListener('click', () => {
    document.getElementById('cf-page').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
})

function restart(){
    CFButtons.forEach(item => {
        item.disabled = false;
        item.style.backgroundColor = "white";
        item.classList.remove('CF-square-2');
        item.classList.remove('winning-tran');
    })
    setPlayerHeading();
    cfArray = generateCFBoard();
    rowArray = generateRowArray();
    winningSquaresCF.length = 0;
    restartCF.disabled = true;
}


function endGame(){
    CFButtons.forEach((item, index) => {
        item.disabled = true;
        if(winningSquaresCF.includes(index)){
            item.classList.add('winning-tran');
        }
    })
    restartCF.disabled = false;
}

function generateCFBoard(){
    return new Array(boardHeight).fill(0).map(() => new Array(boardWidth).fill(0))
}

function generateRowArray(){
    return new Array(boardWidth).fill(boardHeight-1);
}
