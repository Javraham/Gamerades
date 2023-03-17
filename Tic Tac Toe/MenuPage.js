const gameButtons = document.querySelectorAll('.game-mode');
const menu = document.getElementById('menu');
const board = document.getElementById('board');
const CFPage = document.getElementById("cf-page");

gameButtons[0].addEventListener('click', () => chooseGame(board));
gameButtons[1].addEventListener('click', () => chooseGame(CFPage));

function chooseGame(game) {
    menu.style.display = "none";
    game.style.display = "block";
}