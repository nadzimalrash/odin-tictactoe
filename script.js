const players = []

const Player = function (name, mark) {
    this.name = name;
    this.mark = mark
}
const btnStart = document.querySelector("#btn-start")
btnStart.addEventListener("click", () => {
    players[0] = new Player(document.getElementById("#player1name").value, "X");
    players[1] = new Player(document.getElementById("#player2name").value, "O");
})


// IIFE to start the game
// const startGame = (function () {
    let Gameboard = ["", "", "", "", "", "", "", "", ""]
    let currentMark = "X"
    let winner = "none"
    let turns = 1

    const currentBoard = document.querySelector("#board")
    const gameStatus = document.querySelector("#status")
    const btnRestart = document.querySelector("#btn-restart")


    const handleCellClick = function (e) {
        Gameboard[e.currentTarget.dataset.index] = currentMark
        e.currentTarget.classList.add(currentMark)
        checkWin();
    }

    const cells = document.querySelectorAll(".cell")
    const applyCellClick = function () {
        cells.forEach((cell) => {
            cell.addEventListener("click", handleCellClick, {once: true})
        });
    }
    applyCellClick();


    const checkWin = function() {
        const WINNING_COMBINATIONS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        WINNING_COMBINATIONS.forEach((combination) => {
            if (Gameboard[combination[0]] === currentMark && Gameboard[combination[1]] === currentMark && Gameboard[combination[2]] === currentMark) {
                winner = currentMark
                gameStatus.textContent = `${winner} Player wins!`
            } 
        })
        if (winner === "none") {
            switchPlayer()
        } else {
            endGame()
        }
    }

    const switchPlayer = function () {
        if (currentMark === "X") {
            currentMark = "O"
        } else {
            currentMark = "X";
        }
        if (turns === Gameboard.length) {
            gameStatus.textContent = `It's a draw!`
            endGame();
        } else {
            gameStatus.textContent = `It is Player ${currentMark}'s turn`
            turns++;
        }
    }

    const endGame = function () {
        cells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick)
        });
    }

    const handleRestart = function () {
        endGame()
        Gameboard = ["", "", "", "", "", "", "", "", ""]
        currentMark = "X";
        winner = "none";
        turns = 1;
        gameStatus.textContent = `It is Player ${currentMark}'s turn`
        cells.forEach((cell) => {
            cell.classList.remove("X", "O")
        });
        applyCellClick();
    }
    btnRestart.addEventListener("click", handleRestart)


// })();