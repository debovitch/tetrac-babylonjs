function GameLines() {

    this.boardLines = new BoardLines();
    this.pawnsLinesTemp = [];
    this.count = [];
    this.pawnsLines = [];
    
    this.build();

    console.log("PawnsLinesTemp[0][3][0] : ");
    this.pawnsLinesTemp[0][3][0].log();
    this.logPawnsLines(0, 3, 0);

}

GameLines.prototype.build = function() {

    this.setPawnsLinesTemp();
    this.countLines();
    this.setPawnsLines();

};

GameLines.prototype.setPawnsLinesTemp = function() {

    // Init all pawns lines to null
    for (var i=0; i<5; i++) {
        this.pawnsLinesTemp[i] = [];
        for (var j=0; j<5; j++) {
            this.pawnsLinesTemp[i][j] = [];
            for (var k=0; k<4; k++) {
                this.pawnsLinesTemp[i][j][k] = new PawnLines();
            }
        }
    }

    ////////////////////////////////////////////////////////////
    // Set x pawns lines
    ////////////////////////////////////////////////////////////

    // Set (x, 0, z) x pawn lines
    for (var i=0; i<5; i++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[i][0][k].x[3] = this.boardLines.x[i][0][k];
        }
    }

    // Set (x, 1, z) x pawn lines
    for (var i=0; i<5; i++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[i][1][k].x[2] = this.boardLines.x[i][0][k];
            this.pawnsLinesTemp[i][1][k].x[3] = this.boardLines.x[i][1][k];
        }
    }

    // Set (x, 2, z) x pawn lines
    for (var i=0; i<5; i++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[i][2][k].x[1] = this.boardLines.x[i][0][k];
            this.pawnsLinesTemp[i][2][k].x[2] = this.boardLines.x[i][1][k];
        }
    }

    // Set (x, 3, z) x pawn lines
    for (var i=0; i<5; i++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[i][3][k].x[0] = this.boardLines.x[i][0][k];
            this.pawnsLinesTemp[i][3][k].x[1] = this.boardLines.x[i][1][k];
        }
    }

    // Set (x, 4, z) x pawn lines
    for (var i=0; i<5; i++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[i][4][k].x[0] = this.boardLines.x[i][1][k];
        }
    }

    ////////////////////////////////////////////////////////////
    // Set y pawns lines
    ////////////////////////////////////////////////////////////

    // Set (0, y, z) y pawn lines
    for (var j=0; j<5; j++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[0][j][k].y[3] = this.boardLines.y[0][j][k];
        }
    }

    // Set (1, y, z) y pawn lines
    for (var j=0; j<5; j++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[1][j][k].y[2] = this.boardLines.y[0][j][k];
            this.pawnsLinesTemp[1][j][k].y[3] = this.boardLines.y[1][j][k];
        }
    }

    // Set (2, y, z) y pawn lines
    for (var j=0; j<5; j++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[2][j][k].y[1] = this.boardLines.y[0][j][k];
            this.pawnsLinesTemp[2][j][k].y[2] = this.boardLines.y[1][j][k];
        }
    }

    // Set (3, y, z) y pawn lines
    for (var j=0; j<5; j++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[3][j][k].y[0] = this.boardLines.y[0][j][k];
            this.pawnsLinesTemp[3][j][k].y[1] = this.boardLines.y[1][j][k];
        }
    }

    // Set (x, 4, z) y pawn lines
    for (var j=0; j<5; j++) {
        for (var k=0; k<4; k++) {
            this.pawnsLinesTemp[4][j][k].y[0] = this.boardLines.y[1][j][k];
        }
    }

    ////////////////////////////////////////////////////////////
    // Set z pawns lines
    ////////////////////////////////////////////////////////////

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            this.pawnsLinesTemp[i][j][0].z[3] = this.boardLines.z[i][j];
            this.pawnsLinesTemp[i][j][1].z[2] = this.boardLines.z[i][j];
            this.pawnsLinesTemp[i][j][2].z[1] = this.boardLines.z[i][j];
            this.pawnsLinesTemp[i][j][3].z[0] = this.boardLines.z[i][j];
        }
    }

    ////////////////////////////////////////////////////////////
    // Set xy pawns lines
    ////////////////////////////////////////////////////////////

    for (var k=0; k<4; k++) {
        for (var l=0; l<4; l++) {

            this.pawnsLinesTemp[l+1][l][k].xy[3-l]   = this.boardLines.xy[k][0];
            this.pawnsLinesTemp[l][l][k].xy[3-l]     = this.boardLines.xy[k][1];
            this.pawnsLinesTemp[l+1][l+1][k].xy[3-l] = this.boardLines.xy[k][2];
            this.pawnsLinesTemp[l][l+1][k].xy[3-l]   = this.boardLines.xy[k][3];

        }
    }

    ////////////////////////////////////////////////////////////
    // Set xmy pawns lines
    ////////////////////////////////////////////////////////////

    for (var k=0; k<4; k++) {
        for (var l=0; l<4; l++) {

            this.pawnsLinesTemp[l][3-l][k].xmy[3-l]      = this.boardLines.xmy[k][0];
            this.pawnsLinesTemp[l][4-l][k].xmy[3-l]      = this.boardLines.xmy[k][1];
            this.pawnsLinesTemp[l+1][3-l][k].xmy[3-l]    = this.boardLines.xmy[k][2];
            this.pawnsLinesTemp[l+1][4-l][k].xmy[3-l]    = this.boardLines.xmy[k][3];

        }
    }

    ////////////////////////////////////////////////////////////
    // Set xz pawns lines
    ////////////////////////////////////////////////////////////

    for (var i=0; i<2; i++) {
        for (var j=0; j<5; j++) {
            for (var l=0; l<4; l++) {
                this.pawnsLinesTemp[l+i][j][l].xz[3-l] = this.boardLines.xz[i][j];
            }
        }
    }

    ////////////////////////////////////////////////////////////
    // Set xmz pawns lines
    ////////////////////////////////////////////////////////////

    for (var i=0; i<2; i++) {
        for (var j=0; j<5; j++) {
            for (var l=0; l<4; l++) {
                this.pawnsLinesTemp[l+i][j][3-l].xmz[3-l] = this.boardLines.xmz[i][j];
            }
        }
    }

    ////////////////////////////////////////////////////////////
    // Set yz pawns lines
    ////////////////////////////////////////////////////////////

    for (var i=0; i<5; i++) {
        for (var j=0; j<2; j++) {
            for (var l=0; l<4; l++) {
                this.pawnsLinesTemp[i][l+j][l].yz[3-l] = this.boardLines.yz[i][j];
            }
        }
    }

    ////////////////////////////////////////////////////////////
    // Set ymz pawns lines
    ////////////////////////////////////////////////////////////

    for (var i=0; i<5; i++) {
        for (var j=0; j<2; j++) {
            for (var l=0; l<4; l++) {
                this.pawnsLinesTemp[i][l+j][3-l].ymz[3-l] = this.boardLines.ymz[i][j];
            }
        }
    }

    ////////////////////////////////////////////////////////////
    // Set xyz pawns lines
    ////////////////////////////////////////////////////////////

    for (var l=0; l<4; l++) {

        this.pawnsLinesTemp[l+1][l][l].xyz[3-l]   = this.boardLines.xyz[0];
        this.pawnsLinesTemp[l][l][l].xyz[3-l]     = this.boardLines.xyz[1];
        this.pawnsLinesTemp[l+1][l+1][l].xyz[3-l] = this.boardLines.xyz[2];
        this.pawnsLinesTemp[l][l+1][l].xyz[3-l]   = this.boardLines.xyz[3];

    }

    ////////////////////////////////////////////////////////////
    // Set xymz pawns lines
    ////////////////////////////////////////////////////////////

    for (var l=0; l<4; l++) {

        this.pawnsLinesTemp[l+1][l][3-l].xymz[3-l]   = this.boardLines.xymz[0];
        this.pawnsLinesTemp[l][l][3-l].xymz[3-l]     = this.boardLines.xymz[1];
        this.pawnsLinesTemp[l+1][l+1][3-l].xymz[3-l] = this.boardLines.xymz[2];
        this.pawnsLinesTemp[l][l+1][3-l].xymz[3-l]   = this.boardLines.xymz[3];

    }

    ////////////////////////////////////////////////////////////
    // Set xmyz pawns lines
    ////////////////////////////////////////////////////////////

    for (var l=0; l<4; l++) {

        this.pawnsLinesTemp[l][3-l][l].xmyz[3-l]      = this.boardLines.xmyz[0];
        this.pawnsLinesTemp[l][4-l][l].xmyz[3-l]      = this.boardLines.xmyz[1];
        this.pawnsLinesTemp[l+1][3-l][l].xmyz[3-l]    = this.boardLines.xmyz[2];
        this.pawnsLinesTemp[l+1][4-l][l].xmyz[3-l]    = this.boardLines.xmyz[3];

    }


    ////////////////////////////////////////////////////////////
    // Set xmymz pawns lines
    ////////////////////////////////////////////////////////////

    for (var l=0; l<4; l++) {

        this.pawnsLinesTemp[l][3-l][3-l].xmymz[3-l]      = this.boardLines.xmymz[0];
        this.pawnsLinesTemp[l][4-l][3-l].xmymz[3-l]      = this.boardLines.xmymz[1];
        this.pawnsLinesTemp[l+1][3-l][3-l].xmymz[3-l]    = this.boardLines.xmymz[2];
        this.pawnsLinesTemp[l+1][4-l][3-l].xmymz[3-l]    = this.boardLines.xmymz[3];

    }

};

GameLines.prototype.countLines = function() {

    for (var i=0; i<5; i++) {
        this.count[i] = [];
        for (var j=0; j<5; j++) {
            this.count[i][j] = [];
            for (var k=0; k<4; k++) {
                this.count[i][j][k] = 0;
                for (var l=0; l<4; l++) {

                    if (this.pawnsLinesTemp[i][j][k].x[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].y[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].z[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xy[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmy[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].yz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].ymz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xyz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xymz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmyz[l] != null) {
                        this.count[i][j][k]++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmymz[l] != null) {
                        this.count[i][j][k]++;
                    }

                }
            }
        }
    }

};

GameLines.prototype.setPawnsLines = function() {

    for (var i=0; i<5; i++) {
        this.pawnsLines[i] = [];
        for (var j=0; j<5; j++) {
            this.pawnsLines[i][j] = [];
            for (var k=0; k<4; k++) {
                this.pawnsLines[i][j][k] = [];
                var m = 0;
                for (var l=0; l<4; l++) {

                    if (this.pawnsLinesTemp[i][j][k].x[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].x[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].y[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].y[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].z[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].z[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xy[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xy[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmy[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xmy[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xmz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].yz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].yz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].ymz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].ymz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xyz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xyz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xymz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xymz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmyz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xmyz[l];
                        m++;
                    }
                    if (this.pawnsLinesTemp[i][j][k].xmymz[l] != null) {
                        this.pawnsLines[i][j][k][m] = this.pawnsLinesTemp[i][j][k].xmymz[l];
                        m++;
                    }

                }

            }
        }
    }

};

GameLines.prototype.logLinesCount = function() {

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                console.log("count[%i][%i][%i] : %i", i, j, k, this.count[i][j][k]);
            }
        }
    }

};

GameLines.prototype.logPawnsLines = function(x, y, z) {

    var log = "pawnsLines[" + x + "][" + y + "][" + z + "] : ";
    for (var l=0; l<this.count[x][y][z]; l++) {
        log += this.pawnsLines[x][y][z][l] + ",";
    }
    console.log(log.substring(0, log.length - 1));

};