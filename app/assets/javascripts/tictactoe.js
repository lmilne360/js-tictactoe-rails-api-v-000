$(function() {
    attachListeners();
});

var turn = 0;
var winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function attachListeners() {
    $('td').click(function(event) {
        doTurn(event);
    });

    $('#previous').click(function(event) {
        listGames();
    });

    $('#save').click(function(event) {
        save();
    });

    $('#previous').click(function(event) {
        getAllGames();
    });
}

function doTurn(event) {

    updateState(event);
    checkWinner();
    turn++;
}

function player() {
    return (turn % 2 === 0) ? "X" : "O";
}

function updateState(event) {
    $(event.target).html(player());
}

function checkWinner() {
    var board = selections();

    if (checkTie()) {
        resetGame();
        message("Tie game");
        return false;
    }

    for (var i = 0; i < winning.length; i++) {
        if ((board[winning[i][0]] === "X") && (board[winning[i][1]] === "X") && (board[winning[i][2]] === "X")) {
            console.log("Player 1 wins");
            message(`Player ${player()} Won!`);
            resetGame();
            return true;
        } else if ((board[winning[i][0]] === "O") && (board[winning[i][1]] === "O") && (board[winning[i][2]] === "O")) {
            console.log("Player 2 wins");
            message(`Player ${player()} Won!`);
            resetGame();
            return true;
        }
    }
    return false; //for end
} //checkwinner end

//get all the inputs
function selections() {
    var board = [];
    $('td').each(function() {
        board.push($(this).text());
    });
    return board;
}

function message(str) {
    $('#message').text(str);
}

function resetGame() {
    $('td').empty();
    turn = -1;

}

function checkTie() {
    return turn === 8 ? true : false;
}

function listGames() {
  var html = '';
  $.getJSON('/games', function (data) {
    data.forEach(function(game){
      html += `<li class ="game" data-id="${game.id}" data-state="${game.state}">${game.id}</li>`;



    })
  })
}
