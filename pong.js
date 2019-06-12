const canvas = document.querySelector('#particle-effect-container');
const c = canvas.getContext('2d');

let maxWidth = 800;
let maxHeight = 400;

canvas.height = maxHeight;
canvas.width = maxWidth;

c.fillStyle = "whitesmoke";
c.strokeStyle = "whitesmoke";

class Player {
    constructor(playerNumber) {
        this.height = 50;
        this.width = 10;
        this.velocity = 2;
        this.xCord = playerNumber === 1 ? 10 : 780;
        this.yCord = 0;
    }

    moveUp() {
        if (this.yCord <= 0) {
            return
        }

        this.yCord = this.yCord - this.velocity;
    }

    moveDown() {
        if (this.yCord > maxHeight) {
            return
        }

        this.yCord = this.yCord + this.velocity;
    }

    draw() {
        c.beginPath();
        c.rect(this.xCord, this.yCord, this.width, this.height);
        c.fill();   
        c.stroke();
    }
}

const playerOne = new Player(1);
const playerTwo = new Player(2);


function runGame() {
    c.clearRect(0, 0, maxWidth, maxHeight);
    playerOne.draw();
    playerTwo.draw();
    

    requestAnimationFrame(function() {
        runGame();
    });
}

runGame();
