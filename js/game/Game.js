function Game() {

    this.id = null;

    this.pawns = [];
    this.h = [];
    this.win = [];
    this.play = [];

    this.newGame();

}

Game.prototype.newGame = function() {

    var matrice = [

                            //  ------------------>
                            //  0   1   2   3   4

                        [
                            [   0,  0,  0,  0,  0   ],
                            [   0,  0,  0,  0,  0   ],
                            [   0,  0,  0,  0,  0   ],
                            [   0,  0,  0,  0,  0   ]   //      y = 0           0   5   10  15  20
                        ], [
                        [   0,  0,  0,  0,  0   ],
                        [   0,  0,  0,  0,  0   ],
                        [   0,  0,  0,  0,  0   ],
                        [   0,  0,  0,  0,  0   ]   //      y = 1           1   6   11  16  21
                    ], [
                    [   0,  0,  0,  0,  0   ],
                    [   0,  0,  0,  0,  0   ],
                    [   0,  0,  0,  0,  0   ],
                    [   0,  0,  0,  0,  0   ]   //      y = 2           2   7   12  17  22
                ], [
                [   0,  0,  0,  0,  0   ],
                [   0,  0,  0,  0,  0   ],
                [   0,  0,  0,  0,  0   ],
                [   0,  0,  0,  0,  0   ]   //      y = 3           3   8   13  18  23
            ], [
            [   0,  0,  0,  0,  0   ],
            [   0,  0,  0,  0,  0   ],
            [   0,  0,  0,  0,  0   ],
            [   0,  0,  0,  0,  0   ]   //      y = 4           4   9   14  19  24
        ]

    ];

    for (var i=0; i<5; i++) {
        this.pawns[i] = [];
        for (var j=0; j<5; j++) {
            this.pawns[i][j] = [];
            for (var k=0; k<4; k++) {
                this.pawns[i][j][k] = matrice[j][3-k][i];
            }
        }
    }

    this.initWithPawns(this.pawns);

};

Game.prototype.initWithPawns = function(matrix)
{
    this.gameLines = new GameLines();

    this.finOrdi = false; this.end = false; this.continuer = true; this.firstPlayer = true;
    this.curs_x = 5; this.curs_y = 5;
    this.totalcoups = 5;
    this.counter = 0;

    for (var i=0; i<5; i++) {
        this.h[i] = [];
        this.win[i] = [];
        this.play[i] = [];
        for (var j=0; j<5; j++) {

            this.h[i][j] = 0;
            this.win[i][j] = [];
            this.play[i][j] = [];

            for (var k=0; k<4; k++) {

                this.win[i][j][k] = false;
                this.play[i][j][k] = false;

                this.pawns[i][j][k] = matrix[i][j][k];

                if (this.pawns[i][j][k] != 0) {

                    // Update game lines
                    for (var l=0; l<this.gameLines.count[i][j][k]; l++) {
                        this.gameLines.pawnsLines[i][j][k][l] += this.pawns[i][j][k];
                    }

                    // Update game state
                    this.play[i][j][k] = true;
                    this.h[i][j]++;
                    this.counter++;

                }

            }

        }
    }

};

Game.prototype.putPawnAt = function(x, y, player) {

    var winner = false;

    this.pawns[x][y][this.h[x][y]] = player;

    for (var l=0; l<this.gameLines.count[x][y][this.h[x][y]]; l++) {
        this.gameLines.pawnsLines[x][y][this.h[x][y]][l] += player;
        if (this.gameLines.pawnsLines[x][y][this.h[x][y]][l] == 4 * player) {
            winner = true;
        }
    }

    return winner;

};

Game.prototype.removePawnAt = function(x, y) {

    for (var l=0; l<this.gameLines.count[x][y][this.h[x][y]]; l++) {
        this.gameLines.pawnsLines[x][y][this.h[x][y]][l] -= this.pawns[x][y][this.h[x][y]];
    }

    this.pawns[x][y][this.h[x][y]] = 0;

};

Game.prototype.playPawnAt = function(x, y, player) {

    // Si la colonne est disponible
    if (this.h[x][y] < 4) {

        // Pose le pion et teste le gain
        if (this.putPawnAt(x, y, player)) {
            console.log("C'est gagné !");
        }

        this.h[x][y]++;
        this.counter++;

        if (this.counter == 100) {
            this.end = true;
        }

    }

};