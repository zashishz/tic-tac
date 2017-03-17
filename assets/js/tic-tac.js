/**
 * Important fields
 * @type {string}
 */

let gameMode = 'onePlayer';
//Contains all the Symbols
let symbols = ['X', 'O'];

let startSymbol = 'X';

let currentSymbol = startSymbol;
let computerSymbol = 'O';

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
        // startSymbol = this.childNodes[1].innerHTML;
        this.childNodes[1].innerHTML = startSymbol;
        currentSymbol = startSymbol;
        startSymbol = toggleSymbol();
        console.log(this.id);

        let applyCheck = false;

        for(let move in moves) {
            let id1 = moves[move][0];
            let id2 = moves[move][1];
            let id3 = moves[move][2];
            if(computerSymbol != currentSymbol) {
                computerMoves(id1, id2, id3);
            }
            applyCheck = checkTriplets(id1, id2, id3);
            if(applyCheck) {
                // alert(startSymbol + " Won!!");
                document.querySelector('#message').innerHTML = "Congrats " + startSymbol + " Won!!";
                break;
            }
        }
    })
})

function toggleSymbol() {
    return (startSymbol == symbols[0])?symbols[1]:symbols[0];
}

function checkTriplets(id1, id2, id3) {
    // if
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

//Computer Moves
function computerMoves(id1, id2, id3) {
    let text1 = getInnerText(id1);
    let text2 = getInnerText(id2);
    let text3 = getInnerText(id3);
    console.log("computerMoves",text1, text2, text3);
    if((text1 == text2) && (text3 == null) && (text1 == computerSymbol)) {
        console.log("Opportunity", id3);
        document.querySelector('#'+id3+' p').innerHTML = computerSymbol;
    } else if((text2 == text3) && (text1 == null) && (text2 == computerSymbol)) {
        console.log("Opportunity", id1);
        document.querySelector('#'+id1+' p').innerHTML = computerSymbol;
    }  else if((text1 == text3) && (text2 == null) && (text3 == computerSymbol)) {
        console.log("Opportunity", id2);
        document.querySelector('#'+id2+' p').innerHTML = computerSymbol;
    }  else {
        console.log("Default");
    }
}