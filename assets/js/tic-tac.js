let gameMode = 'twoPlayer';
//Contains all the Symbols
let symbols = ['X', 'O'];

let computerSymbol = 'X';
let humanSymbol = 'O';
let currentSymbol = computerSymbol;
let overallHumanMoves = 0;
let overallComputerMoves = 0;
let humanNulls = [];
let computerNulls = [];
let humanWinningBlocks = [];
let computerWinningBlocks = [];
let gameOver = false;
let id1, id2, id3;

//list of all possible Moves for winning
let moves = {
    move3: ['block1', 'block5', 'block9'],
    move4: ['block7', 'block5', 'block3'],
    move1: ['block4', 'block5', 'block6'],
    move2: ['block2', 'block5', 'block8'],
    move5: ['block1', 'block2', 'block3'],
    move6: ['block7', 'block8', 'block9'],
    move7: ['block1', 'block4', 'block7'],
    move8: ['block3', 'block6', 'block9']
};


let blocks = document.querySelectorAll(".notClicked");
blocks.forEach(function (block) {
    block.addEventListener('click', playGame);
})

document.getElementById('reset').addEventListener('click', reload)

function setGameMode() {
    gameMode = document.getElementById("player");
    gameMode= gameMode[gameMode.selectedIndex].value;
    console.log('gameMode',gameMode);
}

function reload(){
    window.location.reload();
}

// document.addEventListener('onchange',setGameMode);
setGameMode();
if(currentSymbol == computerSymbol && gameMode=='onePlayer') {
    computerMove();
    currentSymbol = toggleSymbol();
}

function playGame() {
    if (this.className.includes('notClicked')) {
        this.className = "block clicked";
        this.childNodes[1].innerHTML = currentSymbol;
        //change the symbol
        currentSymbol = toggleSymbol();

        // check if someone Won the game
        for (let move in moves) {
            id1 = moves[move][0];
            id2 = moves[move][1];
            id3 = moves[move][2];

            selectMove(id1, id2, id3, humanSymbol);
            selectMove(id1, id2, id3, computerSymbol);
        }

        //Trigger only when user played his turn
        if (computerSymbol == currentSymbol && gameMode == 'onePlayer') {

            //Trigger only when User has won the game
            if (overallHumanMoves == 3) {
                gameOver = checkTriplets(humanWinningBlocks[0], humanWinningBlocks[1], humanWinningBlocks[2]);
            }
            //else Check if computer can win
            else if (overallComputerMoves == 2) {
                let id = computerNulls[0];
                updateData(id);
                gameOver = checkTriplets(computerWinningBlocks[0], computerWinningBlocks[1], computerWinningBlocks[2]);
            }
            //else Check if User can be stopped from winning
            else if (overallHumanMoves == 2) {
                //use humanNulls Here
                let id = humanNulls[0];
                updateData(id);
            }
            //else Decide next move based on user's Move
            else if (overallHumanMoves == 1) {
                //use humanNulls Here
                let id = getInnerText('block5') == null ? 'block5' : computerNulls[0];
                id = (id == null) ? humanNulls[0] : id;
                updateData(id);
            }
            //If this is first move by computer or second move
            else if (overallComputerMoves <= 1) {
                let id;
                for (let i = 0; i < computerNulls.length; i++) {
                    if (computerNulls[i] == 'block5') {
                        id = 'block5';
                        break;
                    }
                    id = computerNulls[0];
                }
                if (computerNulls.length > 0) {
                    updateData(id);
                } else {
                    if (document.querySelectorAll('.notClicked>p')[0])
                        document.querySelectorAll('.notClicked>p')[0].innerHTML = computerSymbol;
                }
            }
        } else {
            //This Block checks if any player won the game
            gameOver = checkTriplets(humanWinningBlocks[0], humanWinningBlocks[1], humanWinningBlocks[2]);
            if (!gameOver)
                gameOver = checkTriplets(computerWinningBlocks[0], computerWinningBlocks[1], computerWinningBlocks[2]);
        }
    }
    //Remove Click Handlers once game is Over.
    if (gameOver) {
        var elems = document.querySelectorAll(".block");
        [].forEach.call(elems, function (el) {
            el.classList.remove("notClicked");
        });
    }
}

// Initial Move by Computer in onePlayer MODE
function computerMove() {
    let blocks = Array.from(document.querySelectorAll('.block'));
    let randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
    document.querySelector('#' + randomBlock.id + ' p').innerHTML = computerSymbol;
    document.querySelector('#' + randomBlock.id).className = 'block clicked';
    // overallComputerMoves = 1;
}

//Toggle the Game Symbols
function toggleSymbol() {
    return (currentSymbol == symbols[0]) ? symbols[1] : symbols[0];
}

//Check if consecutive 3 symbols are formed and then highlight
function checkTriplets(id1, id2, id3) {
    let text1 = getInnerText(id1);
    let text2 = getInnerText(id2);
    let text3 = getInnerText(id3);

    if (((text1 == text2) && (text2 == text3)) && (text1 == "X" || text1 == "O")) {
        highlight(id1, id2, id3);
        return true;
    }
    return false;
}

function getInnerText(id) {
    return (document.querySelector('#' + id + ' p').innerHTML == "") ? null : document.querySelector('#' + id + ' p').innerHTML;
}

//highlight Styling
function highlight(id1, id2, id3) {
    document.querySelector("#" + id1).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#" + id2).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#" + id3).setAttribute('style', "background-color: #ccc;");
}

//Decides which move to be performed Next by the computer
function selectMove(id1, id2, id3, symbol) {

    arguments = Array.from(arguments).splice(0, 3);
    // console.log(arguments);
    let nullCount = 0;
    let symbolCount = 0;
    let nulls = [];
    for (i = 0; i < arguments.length; i++) {
        let id = 'id' + i;
        if (getInnerText(arguments[i]) == null) {
            nullCount++;
            nulls.push(arguments[i]);
        } else if (getInnerText(arguments[i]) == symbol) {
            symbolCount++;
        }
    }
    if (symbol == humanSymbol) {
        if ((symbolCount >= overallHumanMoves) && (symbolCount + nullCount == 3)) {
            overallHumanMoves = symbolCount;
            humanNulls = nulls;
            humanWinningBlocks = [id1, id2, id3];
        }
    } else if (symbol == computerSymbol) {
        if ((symbolCount >= overallComputerMoves) && (symbolCount + nullCount == 3)) {
            overallComputerMoves = symbolCount;
            computerNulls = nulls;
            computerWinningBlocks = [id1, id2, id3];
        }
    }
    return;
}

function updateData(id) {
    document.querySelector('#' + id + ' p').innerHTML = computerSymbol;
    document.getElementById(id).className = "block clicked";
    currentSymbol = toggleSymbol();
    overallHumanMoves = 0;
    overallComputerMoves = 0;
    computerNulls = [];
    humanNulls = [];
    console.log('called', updateData);
}