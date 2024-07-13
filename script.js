const board = document.getElementById("game-board");
const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo")
const crore = document.getElementById("score")
const highscoreText = document.getElementById("highscore")
const audio = document.getElementById("myAudio");
let gridSize = 30;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let wall = generateWall();
let direction = "right";
let isGameStarted = false;
let gameSpeedDeley = 200;
let highScore = 0;
let gameIntervalId;



function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    snakeScore();
    drawWall();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

// draw();

function drawFood() {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}

function drawWall() {
    let currentScore = snake.length - 1;
    if (currentScore >= 3) {
        let wallElement = creatElement("div", "wall");
        setPosition(wallElement, wall);
        board.appendChild(wallElement);
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeedDeley);
    }



}



function generateWall() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;


    return { x, y }

}




function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        drawWall();
        // inscreaseSpeed();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeedDeley);

    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeedDeley);
}

function hendleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame()
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
    if (head.x === wall.x && head.y === wall.y) {
        resetGame();
    }


}

function resetGame() {
    stopGame();
    snakeHighScore();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();

    direction = "right";
}

function stopGame() {
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block"
}

function snakeScore() {
    let currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0")
}

function snakeHighScore() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore

    }
    console.log(highScore);

    highscoreText.textContent = highScore.toString().padStart(3, "0");
    highscoreText.style.display = "block";
}

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function snakeSpeed(currentScore) {
    if (currentScore >= 5 && gameSpeed === 200) {
        gameSpeed < 10
    }
    if (currentScore >= 5 && gameSpeed === 190) {
        gameSpeed < 10
    }
    if (currentScore >= 5 && gameSpeed === 180) {
        gameSpeed < 10
    }
    if (currentScore >= 5 && gameSpeed === 170) {
        gameSpeed < 10
    }
    if (currentScore >= 5 && gameSpeed === 160) {
        gameSpeed < 10
    }
    if (currentScore >= 5 && gameSpeed === 150) {
        gameSpeed < 10
    }

}



document.addEventListener("keydown", hendleKeyPress)

