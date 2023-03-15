const gameButton = document.querySelector('.game-mode');
const menu = document.getElementById('menu');
const board = document.getElementById('board');

gameButton.addEventListener('click', () =>{
    menu.style.display = "none";
    board.style.display = "block";
})