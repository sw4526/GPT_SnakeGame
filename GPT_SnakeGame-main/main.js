const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 40;
    const tileCount = 13;
    const canvasSize = gridSize * tileCount;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const gameArea = document.getElementById('gameArea');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const restartButton = document.getElementById('restartButton');

    const snake = [{ x: 3, y: 7 }];
    let apple = { x: 11, y: 7 };
    let dx = gridSize;
    let dy = 0;
    let changingDirection = false;
    let gameStarted = false;
    let gameEnded = false;

    let score = 0;

    function getRandomPosition() {
      let newX, newY;
      do {
        newX = Math.floor(Math.random() * tileCount);
        newY = Math.floor(Math.random() * tileCount);
      } while (snake.some(segment => segment.x === newX && segment.y === newY));
      return { x: newX, y: newY };
    }

    function drawSnake() {
      snake.forEach(drawSnakeSegment);
    }

    function drawSnakeSegment(segment) {
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }

    function drawApple() {
      ctx.fillStyle = 'red';
      ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
    }

    function moveSnake() {
      const head = { x: snake[0].x + dx / gridSize, y: snake[0].y + dy / gridSize };
      snake.unshift(head);
      if (head.x === apple.x && head.y === apple.y) {
        apple = getRandomPosition();
      } else {
        snake.pop();
      }
    }

    function changeDirection(event) {
      if (!gameStarted) {
        gameStarted = true;
        main();
      }
      if (changingDirection || gameEnded) return;
      changingDirection = true;
      const keyPressed = event.key;
      switch (keyPressed) {
        case 'ArrowLeft':
          if (dx === 0) { dx = -gridSize; dy = 0; }
          break;
        case 'ArrowUp':
          if (dy === 0) { dx = 0; dy = -gridSize; }
          break;
        case 'ArrowRight':
          if (dx === 0) { dx = gridSize; dy = 0; }
          break;
        case 'ArrowDown':
          if (dy === 0) { dx = 0; dy = gridSize; }
          break;
      }
    }

    function main() {
      if (gameEnded) return;

      setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawApple();
        moveSnake();
        drawSnake();
        if (hasGameEnded()) {
          gameEnded = true;
          showGameOverScreen();
          return;
        }
        main();
      }, 150); // 속도 조정
    }

    function hasGameEnded() {
      const head = snake[0];
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true; // 벽과 첩촉한 경우
      }
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          return true; // 자신의 몸과 첩촉한 경우
        }
      }
      return false;
    }

    function clearCanvas() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'lightgray';
      for (let i = 0; i <= canvasSize; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasSize, i);
        ctx.stroke();
      }
    }

    function showGameOverScreen() {
      gameOverScreen.classList.add('show');
      gameArea.style.opacity = '0.5';
      
      // 게임 오버 시 죽었을 당시의 상태 지우기
      clearCanvas();
    }

    function restartGame() {
      gameStarted = false;
      gameEnded = false;
      snake.length = 1;
      snake[0] = { x: 3, y: 7 };
      dx = gridSize;
      dy = 0;
      apple = { x: 11, y: 7 };
      gameOverScreen.classList.remove('show');
      gameArea.style.opacity = '1';
      drawSnake();
      drawApple();
      score = 0;
    }

    restartButton.addEventListener('click', restartGame);
    document.addEventListener('keydown', changeDirection);

    // 초기 화면 표시
    drawSnake();
    drawApple();