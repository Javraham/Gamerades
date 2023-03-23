import {TTTboard} from './TTTboard.js';

export class CFBoard extends TTTboard{
    constructor(gameArray, squares, playerHeaderID, restartID){
        super(gameArray, squares, playerHeaderID, restartID);
        this.boardWidth = 7;
        this.boardHeight = 6;
    }

    playersMove(gameSquare, row, col){
        if (this.currentPlayer === 1){
            gameSquare.style.backgroundColor = 'red';
            this.squares.forEach((square) => {
                square.classList.add('CF-square-2')
            })
        }
        else{
            gameSquare.style.backgroundColor = 'black';
            this.squares.forEach((square) => {
                square.classList.remove('CF-square-2')
            })
        }
        gameSquare.disabled = true;
        this.gameArray[row][col] = this.currentPlayer;
        if (this.playerWon(row, col)){
            this.playerHeader.textContent = `Player ${this.currentPlayer} Wins!`
            this.endGame()
        }
        else if(this.gameArray.every(value => !value.includes(0))){
            this.playerHeader.textContent = "Tie Game!";
            this.endGame();
        }
    
        else{
            this.changeHeading();
        }
    }

    playerWon(row, col){
        // vertical check
        let count = 0;
        let rownum = this.boardHeight - row - 1
        let i;
        let j;
        for (let i = 0; i < this.boardHeight; i++) {
            
            if (this.gameArray[i][col] == this.currentPlayer){
                count++;
                if(count === 4){
                    this.winningSquares.push(i*7+col, (i-1)*7+col, (i-2)*7+col, (i-3)*7+col)
                    return true
                }
            }
            else{
                count = 0;
            }
        }
        count = 0;
        //horizontal check
        for (let i = 0; i < this.boardWidth; i++) {
            if (this.gameArray[row][i] == this.currentPlayer){
                count++;
                if(count === 4){
                    this.winningSquares.push(row*7+i, row*7+i-1, row*7+i-2, row*7+i-3);
                    return true;
                }
            }
            else{
                count = 0;
            }
        }
        count = 0;
        //up to the Right diagonal check
        if(row == this.boardHeight-1){
            j = col;
            i = row;
        }
        else if (col > rownum){
            i = this.boardHeight - 1;
            j = col-(rownum%col);
        }
        else{
            i = row + col;
            j = 0;
        }
    
        while (i >= 0 && j < this.boardWidth){
            if(this.gameArray[i][j] === this.currentPlayer){
                count++;
                if(count === 4){
                    this.winningSquares.push(i*7+j, (i+1)*7+j-1, (i+2)*7+j-2, (i+3)*7+j-3);
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
            j = col-(row%col);
        }
        else{
            i = row-col;
            j = 0;
        }
    
        while (i < this.boardHeight && j < this.boardWidth){
            if(this.gameArray[i][j] === this.currentPlayer){
                count++;
                if(count === 4){
                    this.winningSquares.push(i*7+j, (i-1)*7+j-1, (i-2)*7+j-2, (i-3)*7+j-3);
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

    restartGame(){
        this.squares.forEach(item => {
            item.disabled = false;
            item.style.backgroundColor = "white";
            item.classList.remove('CF-square-2');
            item.classList.remove('winning-tran');
        })
        this.setPlayerHeading();
        this.gameArray = new Array(6).fill(0).map(() => new Array(7).fill(0))
        this.winningSquares.length = 0;
        this.restart.disabled = true;
    }
    
    
    endGame(){
        this.squares.forEach((item, index) => {
            item.disabled = true;
            if(this.winningSquares.includes(index)){
                item.classList.add('winning-tran');
            }
        })
        this.restart.disabled = false;
    }
}