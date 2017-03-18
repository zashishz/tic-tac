/**
 * Important fields
 * @type {string}
 */

let gameMode = 'onePlayer';
//Contains all the Symbols
let symbols = ['X', 'O'];

let startSymbol = 'X';
let computerSymbol = 'O';
let humanSymbol = 'X';
let overallHumanMoves = 0;
let overallComputerMoves = 0;
let humanNulls = [];
let computerNulls = [];
let humanMovesCount = 0;
let computerMovesCount = 0;

let currentSymbol = startSymbol;
let isActioned = false;

//list of all possible Moves for winning
let moves = {
        move1:['block1', 'block2', 'block3'],
        move2:['block4', 'block5', 'block6'],
        move3:['block7', 'block8', 'block9'],
        move4:['block1', 'block4', 'block7'],
        move5:['block2', 'block5', 'block8'],
        move6:['block3', 'block6', 'block9'],
        move7:['block1', 'block5', 'block9'],
        move8:['block7', 'block5', 'block3']
    };


let blocks = document.querySelectorAll(".block");
blocks.forEach(function (block) {
    block.addEventListener('click', function (event) {
        this.childNodes[1].innerHTML = startSymbol;
        currentSymbol = startSymbol;
        startSymbol = toggleSymbol();
        console.log("clicked ", this.id);

        // check if someone Won the game
        let applyCheck = false;
        let id1,id2,i3;
        isActioned = false;
        for(let move in moves) {
            id1 = moves[move][0];
            id2 = moves[move][1];
            id3 = moves[move][2];

            humanMovesCount = selectMove(id1, id2, id3, humanSymbol);
            computerMovesCount = selectMove(id1, id2, id3, computerSymbol);
        }
        console.log('Total humanMovesCount', overallHumanMoves);
        console.log('Total computerMovesCount', overallComputerMoves);
        console.log('Null Opportunity for stopping human', humanNulls);
        console.log('Null Opportunity for winning Computer', computerNulls);

        //Trigger only when user played his turn
        if(computerSymbol != currentSymbol && !isActioned) {
            // computerMoves(id1, id2, id3);
            //Check if computer can win
            if(overallComputerMoves == 2) {
                let id = computerNulls[0];
                document.querySelector('#'+id+' p').innerHTML = computerSymbol;
                startSymbol = toggleSymbol();
            }
            //Check if User can be stopped from winning
            else if(overallHumanMoves == 2) {
                //use humanNulls Here
                let id = humanNulls[0];
                document.querySelector('#'+id+' p').innerHTML = computerSymbol;
                startSymbol = toggleSymbol();
                overallHumanMoves = 0;
                overallComputerMoves = 0;
                computerNulls = [];
                humanNulls = [];
            } else if( overallComputerMoves <= 1) {
                let id = computerNulls[0];
                if(id) document.querySelector('#'+id+' p').innerHTML = computerSymbol;
                startSymbol = toggleSymbol();
                overallHumanMoves = 0;
                overallComputerMoves = 0;
                computerNulls = [];
                humanNulls = [];
            }
        }

        applyCheck = checkTriplets(id1, id2, id3);

    })
})

function toggleSymbol() {
    return (startSymbol == symbols[0])?symbols[1]:symbols[0];
}

//Check if consecutive 3 symbols are made and highlight
function checkTriplets(id1, id2, id3) {
    let text1 = getInnerText(id1);
    let text2 = getInnerText(id2);
    let text3 = getInnerText(id3);

    if(((text1 == text2) && (text2 == text3)) && (text1 == "X" || text1 == "O")) {
        highlight(id1, id2, id3);
        return true;
    }
    return false;
}

function getInnerText(id) {
    return (document.querySelector('#'+id+' p').innerHTML == "") ? null: document.querySelector('#'+id+' p').innerHTML;
}

function highlight(id1, id2, id3) {
    document.querySelector("#"+id1).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#"+id2).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#"+id3).setAttribute('style', "background-color: #ccc;");
}

//first Move: check 3nulls in moves and add any one randomly
function selectMove(id1, id2, id3, symbol) {
    //select which Move to apply

    arguments = Array.from(arguments).splice(0,3);
    // console.log(arguments);
    let nullCount = 0;
    let symbolCount = 0;
    let nulls = [];
    for (i = 0; i < arguments.length; i++) {
        let id = 'id'+i;
        if(getInnerText(arguments[i]) == null) {
            nullCount++;
            nulls.push(arguments[i]);
        } else if(getInnerText(arguments[i]) == symbol) {
            symbolCount++;
        }
    }
    console.log('symbol', symbol);
    if (symbol == humanSymbol) {
        if((symbolCount >= overallHumanMoves) && (symbolCount+nullCount == 3)) {
            overallHumanMoves = symbolCount;
            humanNulls = nulls;
        }
    } else if (symbol == computerSymbol) {
        if((symbolCount >= overallComputerMoves) && (symbolCount+nullCount == 3)) {
            overallComputerMoves = symbolCount;
            computerNulls = nulls;
        }
    }
    return;
}
