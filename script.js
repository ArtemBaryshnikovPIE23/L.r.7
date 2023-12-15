function startGame(){
    matr = [[0, 0, 0], 
            [0, 0, 0],
            [0, 0, 0]]
    game = true

    whoseMove = true

    drawField()
}

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 5
    ctx.strokeStyle = "#000"
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.moveTo(0, 200)
    ctx.lineTo(600, 200)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 400)
    ctx.lineTo(600, 400)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(200, 0)
    ctx.lineTo(200, 600)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(400, 0)
    ctx.lineTo(400, 600)
    ctx.closePath()
    ctx.stroke()     
}

function makeMove(numCol, numRow) {
    ctx.lineWidth = 8
    ctx.strokeStyle = "#000000"
    if (matr[numRow][numCol] == 0) {
        if (whoseMove) {
            ctx.beginPath()
            ctx.strokeStyle = "#cf0010"
            ctx.moveTo(numCol * step + 50, numRow * step + 50)
            ctx.lineTo(numCol * step + step - 50, numRow * step +step - 50)
            ctx.moveTo(numCol * step + step - 50, numRow * step + 50)
            ctx.lineTo(numCol * step + 50, numRow * step + step - 50)
            ctx.closePath()
            ctx.stroke()
            
            matr[numRow][numCol] = 1
            whoseMove = false
        } else {
            ctx.beginPath()
            ctx.strokeStyle = "#000080"
            ctx.arc(numCol * step + step / 2, numRow * step + step / 2, step / 2 - 50, 2 * Math.PI, 0)
            ctx.closePath()
            ctx.stroke()

            matr[numRow][numCol] = 2
            whoseMove = true
        }

    }
    checkWinner()
}

function checkWinner() {
    ctx.lineWidth = 10
    ctx.strokeStyle = "#76ee00"
    for (let i = 0; i < winningCombinations.length; i++) {
        switch ([String(matr[winningCombinations[i][0][0]][winningCombinations[i][0][1]]), 
        String(matr[winningCombinations[i][1][0]][winningCombinations[i][1][1]]), 
        String(matr[winningCombinations[i][2][0]][winningCombinations[i][2][1]])].join("")) {
            case ("111"):
                ctx.beginPath()
                ctx.moveTo(winningCombinations[i][0][1] * step + step / 2, winningCombinations[i][0][0] * step + step / 2)
                ctx.lineTo(winningCombinations[i][2][1] * step + step - step / 2, winningCombinations[i][2][0] * step + step / 2)
                ctx.closePath()
                ctx.stroke()
                
                game = false
                break
                
            case ("222"):
                ctx.beginPath()
                ctx.moveTo(winningCombinations[i][0][1] * step + step / 2, winningCombinations[i][0][0] * step + step / 2)
                ctx.lineTo(winningCombinations[i][2][1] * step + step - step / 2, winningCombinations[i][2][0] * step + step / 2)
                ctx.closePath()
                ctx.stroke()
                
                game = false
                break
        }
    }
    countOpenCell = 0
    for (let i = 0; i < matr.length; i++) {
        for (let j = 0; j < matr[i].length; j++) {
            if (matr[i][j] == 0) {
                countOpenCell++
            }
        }
    }
    if (countOpenCell == 0) {
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = "60px serif"
        ctx.textAlign = "center"
        ctx.textBaseLine = "middle"
        ctx.fillStyle = "white"
        ctx.fillText("Ничья", canvas.width / 2, canvas.height / 2)

        game = false
    }
}
    
let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

let matr
let game = false
let whoseMove = true
let step = canvas.height / 3
let winningCombinations = [[[0,0], [0, 1], [0, 2]],
                            [[1,0], [1, 1], [1, 2]],
                            [[2,0], [2, 1], [2, 2]],
                            [[0,0], [1, 0], [2, 0]],
                            [[0,1], [1, 1], [2, 1]],
                            [[0,2], [1, 2], [2, 2]], 
                            [[0,0], [1, 1], [2, 2]], 
                            [[0,2], [1, 1], [2, 0]]]

let buttonStartGame = document.getElementById("buttonstartgame")

buttonStartGame.addEventListener("click", startGame)

canvas.addEventListener("click", function (event) {
    if (game) {
        let x = event.clientX - canvas.offsetLeft
        let y = event.clientY - canvas.offsetTop
        let numCol = Math.floor(x / step)
        let numRow = Math.floor(y / step)
        makeMove(numCol, numRow)
    }
})