const pongCanvas = document.querySelector('#pong-container');
const pongC = pongCanvas.getContext('2d');

let pongMaxWidth = 800;
let pongMaxHeight = 400;

pongCanvas.height = pongMaxHeight;
pongCanvas.width = pongMaxWidth;

pongC.fillStyle = "whitesmoke";
pongC.strokeStyle = "whitesmoke";

class Game {
    constructor() {
        this.movement = [];
    }
}

class Player {
    constructor(playerNumber) {
        this.height = 50;
        this.width = 10;
        this.velocity = 2;
        this.xCord = playerNumber === 1 ? 2 : 788;
        this.yCord = 0;
    }

    moveUp() {
        if (this.yCord <= 0) {
            return
        }
        this.yCord = this.yCord - this.velocity;
    }

    moveDown() {
        if (this.yCord > pongMaxHeight - 50) {
            return
        }

        this.yCord = this.yCord + this.velocity;
    }

    draw() {
        pongC.beginPath();
        pongC.rect(this.xCord, this.yCord, this.width, this.height);
        pongC.fill();   
        pongC.stroke();
    }
}
const game = new Game();
const playerOne = new Player(1);
const playerTwo = new Player(2);

const allowedMoves = [87, 83, 38, 40];

function runGame() {
    pongC.clearRect(0, 0, pongMaxWidth, pongMaxHeight);
    playerOne.draw();
    playerTwo.draw();
    game.movement.map(move => playersMove(move))

    requestAnimationFrame(function() {
        runGame();
    });
}

function playersMove(keyCode) {
    switch(keyCode) {
        case(87): {
            playerOne.moveUp();
            break;
        }
        case(83): {
            playerOne.moveDown();
            break;
        }
        case(38): {
            playerTwo.moveUp();
            break;
        }
        case(40): {
            playerTwo.moveDown();
            break;
        }
        default: {
            return
        }
    }
}

document.addEventListener('keydown', (e) => {
    if(!allowedMoves.includes(e.keyCode) || game.movement.includes(e.keyCode)) {
        return;
    }
    game.movement.push(e.keyCode);
});

document.addEventListener('keyup', (e) => {
    if(!allowedMoves.includes(e.keyCode)) {
        return;
    }
    game.movement = game.movement.filter(move => move !== e.keyCode);
});

runGame();
