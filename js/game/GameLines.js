function GameLines() {

    this.boardLines = new BoardLines();
    this.pawnsLinesTemp = [];
    this.count = [];
    this.pawnsLines = [];
    
    this.build();
    
}

GameLines.prototype.build = function() {

    this.setPawnsLinesTemp();
    this.countLines();
    this.setPawnsLines();

    this.boardLines.log();

};

GameLines.prototype.setPawnsLinesTemp = function() {

    // Init all pawns lines to null
    for (var i=0; i<5; i++) {
        this.pawnsLinesTemp[i] = [];
        for (var j=0; j<5; j++) {
            this.pawnsLinesTemp[i][j] = [];
            for (var k=0; k<4; k++) {
                this.pawnsLinesTemp[i][j][k] = {
                    x : [], y : [], z : [],
                    xy : [], xmy : [], xz : [], xmz : [], yz : [], ymz : [],
                    xyz : [], xymz : [], xmyz : [], xmymz : []
                };
                for (var l=0; l<4; l++) {

                    this.pawnsLinesTemp[i][j][k].x[l]        = null;
                    this.pawnsLinesTemp[i][j][k].y[l]        = null;
                    this.pawnsLinesTemp[i][j][k].z[l]        = null;
                    this.pawnsLinesTemp[i][j][k].xy[l]       = null;
                    this.pawnsLinesTemp[i][j][k].xmy[l]      = null;
                    this.pawnsLinesTemp[i][j][k].xz[l]       = null;
                    this.pawnsLinesTemp[i][j][k].xmz[l]      = null;
                    this.pawnsLinesTemp[i][j][k].yz[l]       = null;
                    this.pawnsLinesTemp[i][j][k].ymz[l]      = null;
                    this.pawnsLinesTemp[i][j][k].xyz[l]      = null;
                    this.pawnsLinesTemp[i][j][k].xymz[l]     = null;
                    this.pawnsLinesTemp[i][j][k].xmyz[l]     = null;
                    this.pawnsLinesTemp[i][j][k].xmymz[l]    = null;

                }
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

GameLines.prototype.log = function() {

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                console.log("count[%i][%i][%i] : %i", i, j, k, this.count[i][j][k]);
            }
        }
    }

};

GameLines.prototype.logBoardLines = function() {

    // Log x board lines
    for (var i=0; i<5; i++) {
        for (var j=0; j<2; j++) {
            console.log("boardLines.x[%d][%d][0] = %d, [%d][%d][1] = %d, [%d][%d][2] = %d, [%d][%d][3] = %d\n", i, j, this.boardLines.x[i][j][0], i, j, this.boardLines.x[i][j][1], i, j, this.boardLines.x[i][j][2], i, j, this.boardLines.x[i][j][3]);
        }
    }

    // Log y board lines
    for (var i=0; i<2; i++) {
        for (var j=0; j<5; j++) {
            console.log("boardLines.y[%d][%d][0] = %d, [%d][%d][1] = %d, [%d][%d][2] = %d, [%d][%d][3] = %d\n", i, j, this.boardLines.y[i][j][0], i, j, this.boardLines.y[i][j][1], i, j, this.boardLines.y[i][j][2], i, j, this.boardLines.y[i][j][3]);
        }
    }

    // Log z board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.z[0][%d] = %d, [1][%d] = %d, [2][%d] = %d, [3][%d] = %d, [4][%d] = %d\n", j, this.boardLines.z[0][j], j, this.boardLines.z[1][j], j, this.boardLines.z[2][j], j, this.boardLines.z[3][j], j, this.boardLines.z[4][j]);
    }

    // Log xy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xy[%d][0] = %d, [%d][1] = %d, [%d][2] = %d, [%d][3] = %d\n", k, this.boardLines.xy[k][0], k, this.boardLines.xy[k][1], k, this.boardLines.xy[k][2], k, this.boardLines.xy[k][3]);
    }

    // Log xmy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xmy[%d][0] = %d, [%d][1] = %d, [%d][2] = %d, [%d][3] = %d\n", k, this.boardLines.xmy[k][0], k, this.boardLines.xmy[k][1], k, this.boardLines.xmy[k][2], k, this.boardLines.xmy[k][3]);
    }

    // Log xz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xz[0][%d] = %d, [1][%d] = %d\n", j, this.boardLines.xz[0][j], j, this.boardLines.xz[1][j]);
    }

    // Log xmz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xmz[0][%d] = %d, [1][%d] = %d\n", j, this.boardLines.xmz[0][j], j, this.boardLines.xmz[1][j]);
    }

    // Log yz board lines
    for (var i=0; i<5; i++) {
        console.log("boardLines.yz[%d][0] = %d, [%d][1] = %d\n", i, this.boardLines.yz[i][0], i, this.boardLines.yz[i][1]);
    }

    // Log ymz board lines
    for (var i=0; i<5; i++) {
        console.log("boardLines.ymz[%d][0] = %d, [%d][1] = %d\n", i, this.boardLines.ymz[i][0], i, this.boardLines.ymz[i][1]);
    }

    // Log xyz board lines
    console.log("boardLines.xyz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.boardLines.xyz[0], this.boardLines.xyz[1], this.boardLines.xyz[2], this.boardLines.xyz[3]);

    // Log xymz board lines
    console.log("boardLines.xymz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.boardLines.xymz[0], this.boardLines.xymz[1], this.boardLines.xymz[2], this.boardLines.xymz[3]);

    // Log xmyz board lines
    console.log("boardLines.xmyz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.boardLines.xmyz[0], this.boardLines.xmyz[1], this.boardLines.xmyz[2], this.boardLines.xmyz[3]);

    // Log xmymz board lines
    console.log("boardLines.xmymz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.boardLines.xmymz[0], this.boardLines.xmymz[1], this.boardLines.xmymz[2], this.boardLines.xmymz[3]);

};