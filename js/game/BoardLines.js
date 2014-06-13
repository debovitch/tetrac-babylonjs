function BoardLines(places) {

    this.places = places;

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
                this.x[i][j][k] = {
                    v : 0,
                    places : [
                        this.places[i][j][k],
                        this.places[i][j+1][k],
                        this.places[i][j+2][k],
                        this.places[i][j+3][k]
                    ]
                };
            }
        }
    }

    // Init y board lines
    for (var i=0; i<2; i++) {
        this.y[i] = [];
        for (var j=0; j<5; j++) {
            this.y[i][j] = [];
            for (var k=0; k<4; k++) {
                this.y[i][j][k] = {
                    v : 0,
                    places : [
                        this.places[i][j][k],
                        this.places[i+1][j][k],
                        this.places[i+2][j][k],
                        this.places[i+3][j][k]
                    ]
                };
            }
        }
    }

    // Init z board lines
    for (var i=0; i<5; i++) {
        this.z[i] = [];
        for (var j=0; j<5; j++) {
            this.z[i][j] = {
                v : 0,
                places : [
                    this.places[i][j][0],
                    this.places[i][j][1],
                    this.places[i][j][2],
                    this.places[i][j][3]
                ]
            };
        }
    }

    // Init xy, xmy board lines
    for (var k=0; k<4; k++) {
        this.xy[k] = [];
        this.xmy[k] = [];
        for (var l=0; l<4; l++) {
            this.xy[k][l] = { v : 0 };
            this.xmy[k][l] = { v : 0 };
        }
    }

    // Init xz, xmz board lines
    for (var i=0; i<2; i++) {
        this.xz[i] = [];
        this.xmz[i] = [];
        for (var j=0; j<5; j++) {
            this.xz[i][j] = { v : 0 };
            this.xmz[i][j] = { v : 0 };
        }
    }

    // Init yz, ymz board lines
    for (var i=0; i<5; i++) {
        this.yz[i] = [];
        this.ymz[i] = [];
        for (var j=0; j<2; j++) {
            this.yz[i][j] = { v : 0 };
            this.ymz[i][j] = { v : 0 };
        }
    }

    // Init xyz, xymz, xmyz, xmymz board lines
    for (var l=0; l<4; l++) {
        this.xyz[l] = { v : 0 };
        this.xymz[l] = { v : 0 };
        this.xmyz[l] = { v : 0 };
        this.xmymz[l] = { v : 0 };
    }

};

BoardLines.prototype.log = function() {

    // Log x board lines
    for (var i=0; i<5; i++) {
        for (var j=0; j<2; j++) {
            console.log("boardLines.x[%d][%d][0].v = %d, [%d][%d][1].v = %d, [%d][%d][2].v = %d, [%d][%d][3].v = %d\n", i, j, this.x[i][j][0].v, i, j, this.x[i][j][1].v, i, j, this.x[i][j][2].v, i, j, this.x[i][j][3].v);
        }
    }

    // Log y board lines
    for (var i=0; i<2; i++) {
        for (var j=0; j<5; j++) {
            console.log("boardLines.y[%d][%d][0].v = %d, [%d][%d][1].v = %d, [%d][%d][2].v = %d, [%d][%d][3].v = %d\n", i, j, this.y[i][j][0].v, i, j, this.y[i][j][1].v, i, j, this.y[i][j][2].v, i, j, this.y[i][j][3].v);
        }
    }

    // Log z board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.z[0][%d].v = %d, [1][%d].v = %d, [2][%d].v = %d, [3][%d].v = %d, [4][%d].v = %d\n", j, this.z[0][j].v, j, this.z[1][j].v, j, this.z[2][j].v, j, this.z[3][j].v, j, this.z[4][j].v);
    }

    // Log xy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xy[%d][0].v = %d, [%d][1].v = %d, [%d][2].v = %d, [%d][3].v = %d\n", k, this.xy[k][0].v, k, this.xy[k][1].v, k, this.xy[k][2].v, k, this.xy[k][3].v);
    }

    // Log xmy board lines
    for (var k=0; k<4; k++) {
        console.log("boardLines.xmy[%d][0].v = %d, [%d][1].v = %d, [%d][2].v = %d, [%d][3].v = %d\n", k, this.xmy[k][0].v, k, this.xmy[k][1].v, k, this.xmy[k][2].v, k, this.xmy[k][3].v);
    }

    // Log xz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xz[0][%d].v = %d, [1][%d].v = %d\n", j, this.xz[0][j].v, j, this.xz[1][j].v);
    }

    // Log xmz board lines
    for (var j=0; j<5; j++) {
        console.log("boardLines.xmz[0][%d].v = %d, [1][%d].v = %d\n", j, this.xmz[0][j].v, j, this.xmz[1][j].v);
    }

    // Log yz board lines
    for (var i=0; i<5; i++) {
        console.log("boardLines.yz[%d][0].v = %d, [%d][1].v = %d\n", i, this.yz[i][0].v, i, this.yz[i][1].v);
    }

    // Log ymz board lines
    for (var i=0; i<5; i++) {
        console.log("this.ymz[%d][0].v = %d, [%d][1].v = %d\n", i, this.ymz[i][0].v, i, this.ymz[i][1].v);
    }

    // Log xyz board lines
    console.log("boardLines.xyz[0].v = %d, [1].v = %d, [2].v = %d, [3].v = %d\n", this.xyz[0].v, this.xyz[1].v, this.xyz[2].v, this.xyz[3].v);

    // Log xymz board lines
    console.log("boardLines.xymz[0].v = %d, [1].v = %d, [2].v = %d, [3].v = %d\n", this.xymz[0].v, this.xymz[1].v, this.xymz[2].v, this.xymz[3].v);

    // Log xmyz board lines
    console.log("boardLines.xmyz[0].v = %d, [1].v = %d, [2].v = %d, [3].v = %d\n", this.xmyz[0].v, this.xmyz[1].v, this.xmyz[2].v, this.xmyz[3].v);

    // Log xmymz board lines
    console.log("boardLines.xmymz[0].v = %d, [1].v = %d, [2].v = %d, [3].v = %d\n", this.xmymz[0].v, this.xmymz[1].v, this.xmymz[2].v, this.xmymz[3].v);

};