var Mode = {

    TWOPLAYERSOFFLINE : 0,
    ONEPLAYERONLINE : 1,
    TWOPLAYERSONLINE : 2

};

var PLAYERS = {

    PLAYER1 : 1,
    PLAYER2 : -1,

    PLAYER : 1,
    COMPUTER : -1

};

function Menu() {

    this.setMode(Mode.ONEPLAYERONLINE);

}

Menu.prototype.setMode = function(mode) {

    this.mode = mode;

    switch(mode) {
        case Mode.TWOPLAYERSOFFLINE :
            this.first = PLAYERS.PLAYER1;
            break;
        case Mode.ONEPLAYERONLINE :
            this.first = PLAYERS.COMPUTER;
            break;
        case Mode.TWOPLAYERSONLINE :
            break;
    }

    this.player = this.first;

};