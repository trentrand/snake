/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('canvas');
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;
var GRID_SIZE = 25;

var DIRECTION = {
    Up: 38,
    Down: 40,
    Left: 37,
    Right: 39
};

var CONFIG = {
    length: 4,
    direction: DIRECTION.Right,
    speed: 10,
    snakeColor: "black",
    fruitColor: "red"
};

var GameObject = function () {
    function GameObject(x, y) {
        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
    }

    _createClass(GameObject, [{
        key: "collides",
        value: function collides(x, y) {
            return this.x === x && this.y === y;
        }
    }, {
        key: "outOfBounds",
        value: function outOfBounds() {
            return this.x < 0 || this.x > CANVAS_WIDTH || this.y < 0 || this.y > CANVAS_HEIGHT;
        }
    }]);

    return GameObject;
}();

var Snake = function (_GameObject) {
    _inherits(Snake, _GameObject);

    function Snake(x, y) {
        _classCallCheck(this, Snake);

        var _this = _possibleConstructorReturn(this, (Snake.__proto__ || Object.getPrototypeOf(Snake)).call(this, x, y));

        _this.bodySegments = [];
        _this.keepTail = false;
        _this.currentDirection = CONFIG.direction;

        for (var i = 0; i < CONFIG.length; i++) {
            var newSegment = new GameObject(x, y);
            _this.bodySegments.push(newSegment);
        }
        return _this;
    }

    _createClass(Snake, [{
        key: "getHead",
        value: function getHead() {
            return this.bodySegments[0];
        }
    }, {
        key: "moveHead",
        value: function moveHead() {
            var head = this.getHead();

            var newSegment = void 0;
            switch (this.currentDirection) {
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
    }, {
        key: "eat",
        value: function eat() {
            fruit = new Fruit();
            this.keepTail = true;
        }
    }, {
        key: "draw",
        value: function draw() {
            context.fillStyle = CONFIG.snakeColor;
            for (var i = 0; i < this.bodySegments.length; i++) {
                context.fillRect(this.bodySegments[i].x, this.bodySegments[i].y, GRID_SIZE, GRID_SIZE);
            }
        }
    }, {
        key: "outOfBounds",
        value: function outOfBounds() {
            var head = this.getHead();

            return head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT;
        }
    }, {
        key: "collidesWithSelf",
        value: function collidesWithSelf() {
            var _bodySegments = _toArray(this.bodySegments),
                head = _bodySegments[0],
                tailSegments = _bodySegments.slice(1);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = tailSegments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var segment = _step.value;

                    if (head.collides(segment.x, segment.y)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        }
    }, {
        key: "direction",
        get: function get() {
            return this.currentDirection;
        },
        set: function set(direction) {
            this.currentDirection = direction;
        }
    }]);

    return Snake;
}(GameObject);

var Fruit = function (_GameObject2) {
    _inherits(Fruit, _GameObject2);

    function Fruit() {
        _classCallCheck(this, Fruit);

        var x = getRandomCoordinate('x');
        var y = getRandomCoordinate('y');
        return _possibleConstructorReturn(this, (Fruit.__proto__ || Object.getPrototypeOf(Fruit)).call(this, x, y));
    }

    _createClass(Fruit, [{
        key: "draw",
        value: function draw() {
            context.fillStyle = CONFIG.fruitColor;
            context.fillRect(this.x, this.y, GRID_SIZE, GRID_SIZE);
        }
    }]);

    return Fruit;
}(GameObject);

var getRandomCoordinate = function getRandomCoordinate(axis) {
    if (axis.toLowerCase() === 'x') {
        var max = CANVAS_WIDTH / GRID_SIZE;
        return Math.floor(Math.random() * max) * GRID_SIZE;
    } else if (axis.toLowerCase() === 'y') {
        var _max = CANVAS_HEIGHT / GRID_SIZE;
        return Math.floor(Math.random() * _max) * GRID_SIZE;
    }

    console.error("Please specify an axis ('x' or 'y')");
};

var drawGrid = function drawGrid() {
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

var endGame = function endGame() {
    context.font = "64px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    var score = snake.bodySegments.length - CONFIG.length;
    context.font = "32px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Score: " + score, CANVAS_WIDTH / 2, 2 * CANVAS_HEIGHT / 3);
};

var handleController = function handleController(event) {
    var direction = event.keyCode;

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

var gameLoop = function gameLoop() {
    if (gameOver) {
        endGame();
        return;
    }

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
var gameOver = false;

/* Game Objects */
var snake = void 0;
var fruit = void 0;

/* Intialize Game */
if (_typeof(canvas.getContext) !== undefined) {
    var context = canvas.getContext('2d');
    window.addEventListener('keydown', handleController, false);

    snake = new Snake(GRID_SIZE, GRID_SIZE);
    fruit = new Fruit();

    gameLoop();
} else {
    console.error("\n        This browser does not support HTML5 Canvas.\n        Please try loading this page with a newer browser.\n    ");
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map