//Contains all the Symbols
let symbols = ['X', 'O'];

let startSymbol = 'X';

let blocks = document.querySelectorAll(".block");

blocks.forEach(function (block) {
    block.addEventListener('click', function (event) {
        // startSymbol = this.childNodes[1].innerHTML;
        startSymbol = toggleSymbol();
        this.childNodes[1].innerHTML = startSymbol;
        console.log(this.id);
        let firstCheck = checkTriplets('block1', 'block2', 'block3');
        let secondCheck = checkTriplets('block1', 'block4', 'block7');
        let thirdCheck = checkTriplets('block1', 'block5', 'block9');
        let fourthCheck = checkTriplets('block7', 'block8', 'block9');
        let fifthCheck = checkTriplets('block7', 'block5', 'block3');
        let sixthCheck = checkTriplets('block9', 'block6', 'block3');
        let seventhCheck = checkTriplets('block4', 'block5', 'block6');
        let eirthCheck = checkTriplets('block2', 'block6', 'block8');
        console.log(firstCheck, secondCheck, thirdCheck, fourthCheck, fifthCheck, sixthCheck, seventhCheck, eirthCheck);
        if(firstCheck || secondCheck || thirdCheck || fourthCheck || fifthCheck || sixthCheck || seventhCheck || eirthCheck) {
            // alert(startSymbol + " Won!!");
            document.querySelector('#message').innerHTML = "Congrats " + startSymbol + " Won!!";
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
    console.log(text1, text2, text3);
    if(((text1 == text2) && (text2 == text3)) && (text1 == "X" || text1 == "O")) {
        highlight(id1, id2, id3);
        return true;
    }
    return false;
}

function getInnerText(id) {
    let text = document.querySelector('#'+id+' p').innerHTML;
    return  text == "" ? null: text;
}

function highlight(id1, id2, id3) {
    document.querySelector("#"+id1).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#"+id2).setAttribute('style', "background-color: #ccc;");
    document.querySelector("#"+id3).setAttribute('style', "background-color: #ccc;");
}