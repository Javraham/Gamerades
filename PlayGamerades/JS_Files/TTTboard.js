export class TTTboard{
    constructor(gameArray, squares, playerHeaderID, restartID){
        this.gameArray = gameArray;
        this.winningSquares = [];
        this.currentPlayer = 1;
        this.playerHeader = document.getElementById(playerHeaderID);
        this.restart = document.getElementById(restartID);
        this.squares = document.querySelectorAll(squares);
    }

    playersMove(square, row, col){
        if (this.currentPlayer === 1){
            square.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px red, 0 0 40px red, 0 0 50px red, 0 0 60px red, 0 0 70px red";
            square.textContent = 'X';
        }
        else{
            square.style.textShadow= "0 0 10px #fff, 0 0 20px #fff, 0 0 30px blue, 0 0 40px blue, 0 0 50px blue, 0 0 60px blue, 0 0 70px blue";
            square.textContent = 'O';
        }
        square.disabled = true;
        this.gameArray[row][col] = this.currentPlayer;
        if (this.playerWon(this.gameArray, row, col)){
            this.playerHeader.textContent = `Player ${this.currentPlayer} Wins!`
            this.endgame()
        }
        else if(this.gameArray.every(value => !value.includes(0))){
            this.playerHeader.textContent = "Tie Game!";
            this.endgame();
        }
    
        else{
            this.changeHeading();
        }
    }

    playerWon(gameSquares, row, col){

        const vertical = gameSquares[0][col] === gameSquares[1][col] && gameSquares[1][col] === gameSquares[2][col];
        const horizontal = gameSquares[row][0] === gameSquares[row][1] && gameSquares[row][1] === gameSquares[row][2];
        const TopLeftDiagonal = gameSquares[0][0] === this.currentPlayer && 
                                gameSquares[1][1] === this.currentPlayer &&
                                gameSquares[2][2] === this.currentPlayer;
        const TopRightDiagonal =  gameSquares[0][2] === this.currentPlayer &&
                                gameSquares[1][1] === this.currentPlayer &&
                                gameSquares[2][0] === this.currentPlayer;
        
        if (vertical) this.winningSquares.push(col, col+3, col +6);
        else if(horizontal) this.winningSquares.push(row*3, row*3+1, row*3 + 2);
        else if(TopRightDiagonal) this.winningSquares.push(2,4,6);
        else if(TopLeftDiagonal) this.winningSquares.push(0,4,8)
        
        return vertical || horizontal || TopLeftDiagonal || TopRightDiagonal;
    }
    
    setPlayerHeading(){
        this.playerHeader.textContent = "Player 1's Turn";
        this.currentPlayer = 1;
    }
    
    changeHeading(){
        this.playerHeader.textContent = this.currentPlayer == 1 ? "Player 2's Turn" : "Player 1's Turn";
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
    }

    restartGame(){
        this.squares.forEach(item => {
            item.textContent = '';
            item.disabled = false;
            item.classList.remove('transition');
        })
        this.setPlayerHeading();
        this.gameArray = [new Array(3).fill(0),new Array(3).fill(0),new Array(3).fill(0)];
        this.winningSquares.length = 0;
        this.restart.disabled = true;
    }

    endgame(){
        this.squares.forEach((item, index) => {
            item.disabled = true;
            if(this.winningSquares.includes(index)){
                item.classList.add('transition');
            }
        })
        this.restart.disabled = false;
    }
}