body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    #gameArea {
      position: relative;
      width: 520px;
      height: 520px;
      background-color: white;
      border: 1px solid black;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
    }
    #gameOverScreen {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0, 0, 0, 0.5);
      color: red;
      font-size: 3em;
      font-family: Arial, sans-serif;
      opacity: 0;
      pointer-events: none;
    }
    #gameOverScreen.show {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      pointer-events: auto;
    }
    #restartButton {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      font-size: 1em;
      cursor: pointer;
      outline: none;
    }