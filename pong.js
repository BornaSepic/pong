const pongCanvas = document.querySelector('#pong-container');
const pongC = pongCanvas.getContext('2d');

let pongMaxWidth = 800;
let pongMaxHeight = 400;

pongCanvas.height = pongMaxHeight;
pongCanvas.width = pongMaxWidth;

pongC.fillStyle = "whitesmoke";
pongC.strokeStyle = "whitesmoke";

function collisionDetected() {
    const ballCordinates = {x: ball.xCord, y: ball.yCord};
    const playerCordinates = [{x: playerOne.xCord, y: playerOne.yCord}, {x: playerTwo.xCord, y: playerTwo.yCord}];

    if(ballCordinates.y > playerCordinates[1].y - 10 && ballCordinates.y < playerCordinates[1].y + 60 && ballCordinates.x > pongMaxWidth / 2) {
        return true
    }

    if(ballCordinates.y > playerCordinates[0].y - 10 && ballCordinates.y < playerCordinates[0].y + 60) {
        return true
    }

    return false;
}


class Game {
    constructor() {
        this.score = {playerOne: 0, playerTwo: 0}
        this.movement = [];
        this.gameActive = true;
    }

    stopGame() {
        this.gameActive = false;
    }
}

class Ball {
    constructor() {
        this.xCord = pongMaxWidth / 2;
        this.yCord = pongMaxHeight / 2;
        this.r = 15;
        this.xVel = 3;
        this.yVel = 3;
    }

    move() {
        if(this.xCord < 26 || this.xCord > 774) {
            if(!collisionDetected()) {
                game.stopGame();
                return;
            }
            this.xVel = this.xVel * -1;    
        }

        if(this.yCord <= this.r || this.yCord > pongMaxHeight - this.r) {
            this.yVel = this.yVel * -1;
        }

        this.xCord = this.xCord + this.xVel;
        this.yCord = this.yCord + this.yVel;
        
    }

    draw() {
        pongC.beginPath();
        pongC.arc(this.xCord, this.yCord, this.r, 0, 2 * Math.PI, false);
        pongC.fillStyle = "whitesmoke";
        pongC.fill();
        pongC.stroke();
    }
}

class Player {
    constructor(playerNumber) {
        this.height = 50;
        this.width = 10;
        this.velocity = 2;
        this.xCord = playerNumber === 1 ? 2 : 788;
        this.yCord = pongMaxHeight / 2 - 25;
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
const ball = new Ball();
const playerOne = new Player(1);
const playerTwo = new Player(2);

const allowedMoves = [87, 83, 38, 40];

function runGame() {
    if(!game.gameActive) {
        return;
    }

    pongC.clearRect(0, 0, pongMaxWidth, pongMaxHeight);
    ball.draw();
    playerOne.draw();
    playerTwo.draw();
    game.movement.map(move => playersMove(move));
    ball.move();

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
