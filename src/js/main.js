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
    length: 4,
    direction: DIRECTION.Right,
    speed: 10,
    snakeColor: "black",
    fruitColor: "red"
}

class GameObject {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    collides(x, y) {
        return this.x === x && this.y === y;
    }

    outOfBounds() {
        return this.x < 0 || this.x > CANVAS_WIDTH || this.y < 0 || this.y > CANVAS_HEIGHT;
    }
}

class Snake extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.bodySegments = [];
        this.keepTail = false;
        this.currentDirection = CONFIG.direction;

        for(let i = 0; i < CONFIG.length; i++) {
            const newSegment = new GameObject(x, y);
            this.bodySegments.push(newSegment);
        }
    }

    getHead() { return this.bodySegments[0]; }

    get direction() { return this.currentDirection; }
    set direction(direction) { this.currentDirection = direction; }

    moveHead() {
        const head = this.getHead();

        let newSegment;
        switch(this.currentDirection) {
            case DIRECTION.Up:
                newSegment = new GameObject(head.x, head.y -= GRID_SIZE);
                break;
            case DIRECTION.Down:
                newSegment = new GameObject(head.x, head.y += GRID_SIZE);
                break;
            case DIRECTION.Left:
                newSegment = new GameObject(head.x -= GRID_SIZE, head.y);
                break;
            case DIRECTION.Right:
                newSegment = new GameObject(head.x += GRID_SIZE, head.y);
                break;
            default:
                break;
        }
        
        if (snake.outOfBounds()) {
            gameOver = true;
        }
        
        if (snake.collidesWithSelf()) {
            gameOver = true;
        }
        
        if (fruit.collides(head.x, head.y)) {
            snake.eat();
        }
        
        if (!this.keepTail) {
            this.bodySegments.pop();
        } else this.keepTail = false;
        
        this.bodySegments.unshift(newSegment);
    }
    
    eat() {
        fruit = new Fruit();
        this.keepTail = true;
    }

    draw() {
        context.fillStyle = CONFIG.snakeColor;
        for (let i = 0; i < this.bodySegments.length; i++) {
            context.fillRect(this.bodySegments[i].x, this.bodySegments[i].y, GRID_SIZE, GRID_SIZE);
        }
    }

    outOfBounds() {
        const head = this.getHead();

        return head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT;
    }

    collidesWithSelf() {
        let [head, ...tailSegments] = this.bodySegments;

        for(let segment of tailSegments) {
            if (head.collides(segment.x, segment.y)) {
                return true;
            }
        }
        return false;
    }
}

class Fruit extends GameObject {
    constructor() {
        const x = getRandomCoordinate('x');
        const y = getRandomCoordinate('y');
        super(x, y);
    }

    draw() {
        context.fillStyle = CONFIG.fruitColor;
        context.fillRect(this.x, this.y, GRID_SIZE, GRID_SIZE);
    }
}

let getRandomCoordinate = (axis) => {
    if (axis.toLowerCase() === 'x') {
        const max = CANVAS_WIDTH / GRID_SIZE;
        return (Math.floor(Math.random() * max)) * GRID_SIZE;
        
    } else if (axis.toLowerCase() === 'y') {
        const max = CANVAS_HEIGHT / GRID_SIZE;
        return (Math.floor(Math.random() * max)) * GRID_SIZE;
    }

    console.error("Please specify an axis ('x' or 'y')");
};

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
};

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
};

let gameLoop = () => {
    if (gameOver) {
        return;
    } 
    
    context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawGrid();

    snake.moveHead();
    snake.draw();

    fruit.draw();
    
    // Loop game at `CONFIG.speed` FPS
    setTimeout(function () {
        gameLoop();
    }, 1000 / CONFIG.speed);
};

/* Game State */
let gameOver = false;

/* Game Objects */
let snake;
let fruit;

/* Intialize Game */
if (typeof (canvas.getContext) !== undefined) {
    var context = canvas.getContext('2d');
    window.addEventListener('keydown', handleController, false);

    snake = new Snake(GRID_SIZE, GRID_SIZE);
    fruit = new Fruit();

    gameLoop();

} else {
    console.error(`
        This browser does not support HTML5 Canvas.
        Please try loading this page with a newer browser.
    `);
}