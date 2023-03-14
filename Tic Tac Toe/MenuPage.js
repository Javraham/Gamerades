const gameButton = document.querySelector('.game-mode');
const menu = document.getElementById('menu');
const board = document.getElementById('board');

gameButton.addEventListener('click', event =>{
    console.log(event.target);
    menu.style.display = "none";
    board.style.display = "block";
})