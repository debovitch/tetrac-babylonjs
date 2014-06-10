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

Game.prototype.initWithPawns = function(matrix) {

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

/*
 boardLines.x[0][0][0] = 0, [0][0][1] = 0, [0][0][2] = 0, [0][0][3] = 0
 892 boardLines.x[0][1][0] = 0, [0][1][1] = 0, [0][1][2] = 0, [0][1][3] = 0
 892 boardLines.x[1][0][0] = 0, [1][0][1] = 0, [1][0][2] = 0, [1][0][3] = 0
 893 boardLines.x[1][1][0] = 0, [1][1][1] = 0, [1][1][2] = 0, [1][1][3] = 0
 893 boardLines.x[2][0][0] = 0, [2][0][1] = 0, [2][0][2] = 0, [2][0][3] = 0
 894 boardLines.x[2][1][0] = 0, [2][1][1] = 0, [2][1][2] = 0, [2][1][3] = 0
 894 boardLines.x[3][0][0] = 0, [3][0][1] = 0, [3][0][2] = 0, [3][0][3] = 0
 895 boardLines.x[3][1][0] = 0, [3][1][1] = 0, [3][1][2] = 0, [3][1][3] = 0
 895 boardLines.x[4][0][0] = 0, [4][0][1] = 0, [4][0][2] = 0, [4][0][3] = 0
 896 boardLines.x[4][1][0] = 0, [4][1][1] = 0, [4][1][2] = 0, [4][1][3] = 0
 897 boardLines.y[0][0][0] = 0, [0][0][1] = 0, [0][0][2] = 0, [0][0][3] = 0
 897 boardLines.y[0][1][0] = 0, [0][1][1] = 0, [0][1][2] = 0, [0][1][3] = 0
 898 boardLines.y[1][0][0] = 0, [1][0][1] = 0, [1][0][2] = 0, [1][0][3] = 0
 899 boardLines.y[1][1][0] = 0, [1][1][1] = 0, [1][1][2] = 0, [1][1][3] = 0
 899 boardLines.y[2][0][0] = 0, [2][0][1] = 0, [2][0][2] = 0, [2][0][3] = 0
 900 boardLines.y[2][1][0] = 0, [2][1][1] = 0, [2][1][2] = 0, [2][1][3] = 0
 901 boardLines.y[3][0][0] = 0, [3][0][1] = 0, [3][0][2] = 0, [3][0][3] = 0
 901 boardLines.y[3][1][0] = 0, [3][1][1] = 0, [3][1][2] = 0, [3][1][3] = 0
 901 boardLines.y[4][0][0] = 0, [4][0][1] = 0, [4][0][2] = 0, [4][0][3] = 0
 902 boardLines.y[4][1][0] = 0, [4][1][1] = 0, [4][1][2] = 0, [4][1][3] = 0
 902 boardLines.z[0][0] = 0, [1][0] = 0, [2][0] = 0, [3][0] = 0, [4][0] = 0
 903 boardLines.z[0][1] = 0, [1][1] = 0, [2][1] = 0, [3][1] = 0, [4][1] = 0
 904 boardLines.z[0][2] = 0, [1][2] = 0, [2][2] = 0, [3][2] = 0, [4][2] = 0
 904 boardLines.z[0][3] = 0, [1][3] = 0, [2][3] = 0, [3][3] = 0, [4][3] = 0
 905 boardLines.z[0][4] = 0, [1][4] = 0, [2][4] = 0, [3][4] = 0, [4][4] = 0
 905 boardLines.xy[0][0] = 0, [0][1] = 0, [0][2] = 0, [0][3] = 0
 906 boardLines.xy[1][0] = 0, [1][1] = 0, [1][2] = 0, [1][3] = 0
 907 boardLines.xy[2][0] = 0, [2][1] = 0, [2][2] = 0, [2][3] = 0
 907 boardLines.xy[3][0] = 0, [3][1] = 0, [3][2] = 0, [3][3] = 0
 908 boardLines.xmy[0][0] = 0, [0][1] = 0, [0][2] = 0, [0][3] = 0
 908 boardLines.xmy[1][0] = 0, [1][1] = 0, [1][2] = 0, [1][3] = 0
 909 boardLines.xmy[2][0] = 0, [2][1] = 0, [2][2] = 0, [2][3] = 0
 909 boardLines.xmy[3][0] = 0, [3][1] = 0, [3][2] = 0, [3][3] = 0
 910 boardLines.xz[0][0] = 0, [1][0] = 0
 910 boardLines.xz[0][1] = 0, [1][1] = 0
 911 boardLines.xz[0][2] = 0, [1][2] = 0
 911 boardLines.xz[0][3] = 0, [1][3] = 0
 912 boardLines.xz[0][4] = 0, [1][4] = 0
 912 boardLines.xmz[0][0] = 0, [1][0] = 0
 913 boardLines.xmz[0][1] = 0, [1][1] = 0
 913 boardLines.xmz[0][2] = 0, [1][2] = 0
 914 boardLines.xmz[0][3] = 0, [1][3] = 0
 914 boardLines.xmz[0][4] = 0, [1][4] = 0
 915 boardLines.yz[0][0] = 0, [0][1] = 0
 915 boardLines.yz[1][0] = 0, [1][1] = 0
 916 boardLines.yz[2][0] = 0, [2][1] = 0
 916 boardLines.yz[3][0] = 0, [3][1] = 0
 917 boardLines.yz[4][0] = 0, [4][1] = 0
 918 boardLines.ymz[0][0] = 0, [0][1] = 0
 918 boardLines.ymz[1][0] = 0, [1][1] = 0
 919 boardLines.ymz[2][0] = 0, [2][1] = 0
 919 boardLines.ymz[3][0] = 0, [3][1] = 0
 920 boardLines.ymz[4][0] = 0, [4][1] = 0
 920 boardLines.xyz[0] = 0, [1] = 0, [2] = 0, [3] = 0
 921 boardLines.xymz[0] = 0, [1] = 0, [2] = 0, [3] = 0
 921 boardLines.xmyz[0] = 0, [1] = 0, [2] = 0, [3] = 0
 922 boardLines.xmymz[0] = 0, [1] = 0, [2] = 0, [3] = 0
 */