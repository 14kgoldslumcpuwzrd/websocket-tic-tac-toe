const winning_options = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const playerOneMarks = [];
const playerTwoMarks = [];




let markOptions = {
    one: "X",
    two: "O"
}

let currentTurn = markOptions.one;

let gameboard = document.getElementById('gameboard');
let boxes = document.getElementsByClassName('box');

function winCheck(playerSelection) {
    const WINNING_MATCHES = 3;
    winning_options.forEach( option => {
        let tmp = playerSelection;
        let currentMatches = 0;
        for(let i = 0; i < tmp.length; i++) {
            if (playerSelection.includes(tmp[i])) {
                currentMatches++;
            }
        }
        if (currentMatches === WINNING_MATCHES) {
            return true;
        }
    });
    return false;
}

gameboard.addEventListener('click', (e) => {
    console.log(e.target.dataset.index);
    if (currentTurn === markOptions.one) {
        e.target.innerHTML = markOptions.one;
        currentTurn = markOptions.two;
        playerOneMarks.push(e.target.dataset.index);
        winCheck(playerOneMarks)
    }
    if (currentTurn === markOptions.two) {
        e.target.innerHTML = markOptions.two;
        currentTurn = markOptions.one;
        playerTwoMarks.push(e.target.dataset.index);
        winCheck(playerTwoMarks)
    }
});

console.log([1,3,4].includes([1,4]))