import {TTTboard} from './TTTboard.js';
import { CFBoard } from './CFBoard.js';

const TTTButtons = document.querySelectorAll('.game-square');
const CFButtons = document.querySelectorAll('.CF-square');
const TTTrestartButton = document.getElementById('restart-button');
const CFrestartButton =  document.getElementById('cf-restart');
const backButtons = document.querySelectorAll('.back');
const TTTArray = [new Array(3).fill(0),new Array(3).fill(0),new Array(3).fill(0)];
const CFArray = new Array(6).fill(0).map(() => new Array(7).fill(0))
let rowArray = new Array(7).fill(5);
const tictactoe = new TTTboard(TTTArray, '.game-square', "player-heading", "restart-button")
const connectFour = new CFBoard(CFArray, '.CF-square', "cf-player-heading", "cf-restart");

TTTButtons.forEach((item, index) => {
    item.addEventListener('click', () => {
        let row = Math.floor(index/3);
        let col = index%3;
        tictactoe.playersMove(item, row, col);
       })
    })

TTTrestartButton.addEventListener('click', () => tictactoe.restartGame());
backButtons[0].addEventListener('click', () => {
    tictactoe.restartGame();
    document.getElementById('board').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
})

CFButtons.forEach((item, index, arr) => {
    item.addEventListener('click', () => {
        let col = index%7;
        let row = rowArray[col]
        rowArray[col]--;
        connectFour.playersMove(arr[(row)*7+col], row, col);
       })
    })

CFrestartButton.addEventListener('click', () => {
    connectFour.restartGame();
    rowArray = new Array(7).fill(5);
})

backButtons[1].addEventListener('click', () => {
    connectFour.restartGame();
    rowArray = new Array(7).fill(5);
    document.getElementById('cf-page').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
})
