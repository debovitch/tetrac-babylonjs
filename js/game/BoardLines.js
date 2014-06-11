function BoardLines() {

    this.x = [];
    this.y = [];
    this.z = [];
    this.xy = [];
    this.xmy = [];
    this.xz = [];
    this.xmz = [];
    this.yz = [];
    this.ymz = [];
    this.xyz = [];
    this.xymz = [];
    this.xmyz = [];
    this.xmymz = [];

    this.set();
    
}

BoardLines.prototype.set = function() {

    // Init x board lines
    for (var i=0; i<5; i++) {
        this.x[i] = [];
        for (var j=0; j<2; j++) {
            this.x[i][j] = [];
            for (var k=0; k<4; k++) {
                this.x[i][j][k] = 0;
            }
        }
    }

    // Init y board lines
    for (var i=0; i<2; i++) {
        this.y[i] = [];
        for (var j=0; j<5; j++) {
            this.y[i][j] = [];
            for (var k=0; k<4; k++) {
                this.y[i][j][k] = 0;
            }
        }
    }

    // Init z board lines
    for (var i=0; i<5; i++) {
        this.z[i] = [];
        for (var j=0; j<5; j++) {
            this.z[i][j] = 0;
        }
    }

    // Init xy, xmy board lines
    for (var k=0; k<4; k++) {
        this.xy[k] = [];
        this.xmy[k] = [];
        for (var l=0; l<4; l++) {
            this.xy[k][l] = 0;
            this.xmy[k][l] = 0;
        }
    }

    // Init xz, xmz board lines
    for (var i=0; i<2; i++) {
        this.xz[i] = [];
        this.xmz[i] = [];
        for (var j=0; j<5; j++) {
            this.xz[i][j] = 0;
            this.xmz[i][j] = 0;
        }
    }

    // Init yz, ymz board lines
    for (var i=0; i<5; i++) {
        this.yz[i] = [];
        this.ymz[i] = [];
        for (var j=0; j<2; j++) {
            this.yz[i][j] = 0;
            this.ymz[i][j] = 0;
        }
    }

    // Init xyz, xymz, xmyz, xmymz board lines
    for (var l=0; l<4; l++) {
        this.xyz[l] = 0;
        this.xymz[l] = 0;
        this.xmyz[l] = 0;
        this.xmymz[l] = 0;
    }

};

BoardLines.prototype.log = function() {

    // Log x board lines
    for (var i=0; i<5; i++) {
        for (var j=0; j<2; j++) {
            console.log("boardLines.x[%d][%d][0] = %d, [%d][%d][1] = %d, [%d][%d][2] = %d, [%d][%d][3] = %d\n", i, j, this.x[i][j][0], i, j, this.x[i][j][1], i, j, this.x[i][j][2], i, j, this.x[i][j][3]);
        }
    }

    // Log y board lines
    for (var i=0; i<2; i++) {
        for (var j=0; j<5; j++) {
            console.log("boardLines.y[%d][%d][0] = %d, [%d][%d][1] = %d, [%d][%d][2] = %d, [%d][%d][3] = %d\n", i, j, this.y[i][j][0], i, j, this.y[i][j][1], i, j, this.y[i][j][2], i, j, this.y[i][j][3]);
        }
    }

    // Log z board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.z[0][%d] = %d, [1][%d] = %d, [2][%d] = %d, [3][%d] = %d, [4][%d] = %d\n", j, this.z[0][j], j, this.z[1][j], j, this.z[2][j], j, this.z[3][j], j, this.z[4][j]);
    }

    // Log xy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xy[%d][0] = %d, [%d][1] = %d, [%d][2] = %d, [%d][3] = %d\n", k, this.xy[k][0], k, this.xy[k][1], k, this.xy[k][2], k, this.xy[k][3]);
    }

    // Log xmy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xmy[%d][0] = %d, [%d][1] = %d, [%d][2] = %d, [%d][3] = %d\n", k, this.xmy[k][0], k, this.xmy[k][1], k, this.xmy[k][2], k, this.xmy[k][3]);
    }

    // Log xz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xz[0][%d] = %d, [1][%d] = %d\n", j, this.xz[0][j], j, this.xz[1][j]);
    }

    // Log xmz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xmz[0][%d] = %d, [1][%d] = %d\n", j, this.xmz[0][j], j, this.xmz[1][j]);
    }

    // Log yz board lines
    for (var i=0; i<5; i++) {
        console.log("boardLines.yz[%d][0] = %d, [%d][1] = %d\n", i, this.yz[i][0], i, this.yz[i][1]);
    }

    // Log ymz board lines
    for (var i=0; i<5; i++) {
        console.log("this.ymz[%d][0] = %d, [%d][1] = %d\n", i, this.ymz[i][0], i, this.ymz[i][1]);
    }

    // Log xyz board lines
    console.log("boardLines.xyz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.xyz[0], this.xyz[1], this.xyz[2], this.xyz[3]);

    // Log xymz board lines
    console.log("boardLines.xymz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.xymz[0], this.xymz[1], this.xymz[2], this.xymz[3]);

    // Log xmyz board lines
    console.log("boardLines.xmyz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.xmyz[0], this.xmyz[1], this.xmyz[2], this.xmyz[3]);

    // Log xmymz board lines
    console.log("boardLines.xmymz[0] = %d, [1] = %d, [2] = %d, [3] = %d\n", this.xmymz[0], this.xmymz[1], this.xmymz[2], this.xmymz[3]);

};