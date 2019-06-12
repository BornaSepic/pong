const canvas = document.querySelector('#particle-effect-container');
const c = canvas.getContext('2d');

let maxWidth = 800;
let maxHeight = 400;

canvas.height = maxHeight;
canvas.width = maxWidth;

function runGame() {
    requestAnimationFrame(function() {
        runGame();
    });
}

runGame();
