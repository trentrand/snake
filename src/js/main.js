const canvas = document.getElementById('canvas');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const GRID_SIZE = 25;

const DIRECTION = {
    Up: 38,
    Down: 40,
    Left: 37,
    Right: 39
}

const CONFIG = {
    length: 5,
    direction: DIRECTION.Right,
    speed: 10,
    color: "orange"
}

class SnakeSegment {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor(x, y) {
        this.bodySegments = [];
        this.currentDirection = CONFIG.direction;

        // Setup body
        for(let i = 0; i < CONFIG.length; i++) {
            const newSegment = new SnakeSegment(x, y);
            this.bodySegments.push(newSegment);
        }
    }

    get head() { return this.bodySegments[0]; }

    get headX() { return this.bodySegments[0].x; }
    set headX(x) { this.bodySegments[0].x = x; }

    get headY() { return this.bodySegments[0].y; }
    set headY(y) { this.bodySegments[0].y = y; }

    get direction() { return this.currentDirection; }
    set direction(direction) { this.currentDirection = direction; }

    moveHead() {
        let newSegment;
        switch(this.currentDirection) {
            case DIRECTION.Up:
                this.bodySegments[0].y -= GRID_SIZE;
                break;
            case DIRECTION.Down:
                this.bodySegments[0].y += GRID_SIZE;
                break;
            case DIRECTION.Left:
                this.bodySegments[0].x -= GRID_SIZE;
                break;
            case DIRECTION.Right:
                this.bodySegments[0].x += GRID_SIZE;
                break;
            default:
                break;
        }
    }

    draw() {
        context.fillColor = CONFIG.color;
        context.fillRect(this.bodySegments[0].x, this.bodySegments[0].y, GRID_SIZE, GRID_SIZE);
    }
}

let drawGrid = () => {
    for (var x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
        context.moveTo(x, 0);
        context.lineTo(x, CANVAS_HEIGHT);
    }

    for (var y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
        context.moveTo(0, y);
        context.lineTo(CANVAS_HEIGHT, y);
    }

    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
}

let handleController = (event) => {
    const direction = event.keyCode;

    if (direction >= DIRECTION.Left && direction <= DIRECTION.Down) {
        if (direction === DIRECTION.Left && snake.direction === DIRECTION.Right) {
            return;
        }
        if (direction === DIRECTION.Right && snake.direction === DIRECTION.Left) {
            return;
        }
        if (direction === DIRECTION.Up && snake.direction === DIRECTION.Down) {
            return;
        }
        if (direction === DIRECTION.Down && snake.direction === DIRECTION.Up) {
            return;
        }
        snake.direction = direction;
    }
}

let gameLoop = () => {
    context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid();

    snake.moveHead();
    snake.draw();
    
    setTimeout(function () {
        gameLoop();
    }, 1000 / CONFIG.speed);
}

let snake;
let context;
if (typeof (canvas.getContext) !== undefined) {
    context = canvas.getContext('2d');
    context.scale(1,1);
    window.addEventListener('keydown', handleController, false);

    snake = new Snake(GRID_SIZE, GRID_SIZE)
    gameLoop();
} else {
    console.error(`
        This browser does not support HTML5 Canvas.
        Please try loading this page with a newer browser.
    `);
}