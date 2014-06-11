function PawnLines() {

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

PawnLines.prototype.set = function() {

    for (var l=0; l<4; l++) {

        this.x[l]        = null;
        this.y[l]        = null;
        this.z[l]        = null;
        this.xy[l]       = null;
        this.xmy[l]      = null;
        this.xz[l]       = null;
        this.xmz[l]      = null;
        this.yz[l]       = null;
        this.ymz[l]      = null;
        this.xyz[l]      = null;
        this.xymz[l]     = null;
        this.xmyz[l]     = null;
        this.xmymz[l]    = null;

    }

};

PawnLines.prototype.log = function() {

    // Log x board lines
    var x = "pawnLines.x";
    for (var l=0; l<4; l++) {
        x += "[" + l + "] = " + this.x[l] + ", ";
    }
    console.log(x);

    // Log y board lines
    var y = "pawnLines.y";
    for (var l=0; l<4; l++) {
        y += "[" + l + "] = " + this.y[l] + ", ";
    }
    console.log(y);

    // Log z board lines
    var z = "pawnLines.z";
    for (var l=0; l<4; l++) {
        z += "[" + l + "] = " + this.z[l] + ", ";
    }
    console.log(z);

    // Log xy board lines
    var xy = "pawnLines.xy";
    for (var l=0; l<4; l++) {
        xy += "[" + l + "] = " + this.xy[l] + ", ";
    }
    console.log(xy);

    // Log xmy board lines
    var xmy = "pawnLines.xmy";
    for (var l=0; l<4; l++) {
        xmy += "[" + l + "] = " + this.xmy[l] + ", ";
    }
    console.log(xmy);

    // Log xz board lines
    var xz = "pawnLines.xz";
    for (var l=0; l<4; l++) {
        xz += "[" + l + "] = " + this.xz[l] + ", ";
    }
    console.log(xz);

    // Log xmz board lines
    var xmz = "pawnLines.xmz";
    for (var l=0; l<4; l++) {
        xmz += "[" + l + "] = " + this.xmz[l] + ", ";
    }
    console.log(xmz);

    // Log yz board lines
    var yz = "pawnLines.yz";
    for (var l=0; l<4; l++) {
        yz += "[" + l + "] = " + this.yz[l] + ", ";
    }
    console.log(yz);

    // Log ymz board lines
    var ymz = "pawnLines.ymz";
    for (var l=0; l<4; l++) {
        ymz += "[" + l + "] = " + this.ymz[l] + ", ";
    }
    console.log(ymz);

    // Log xyz board lines
    var xyz = "pawnLines.xyz";
    for (var l=0; l<4; l++) {
        xyz += "[" + l + "] = " + this.xyz[l] + ", ";
    }
    console.log(xyz);

    // Log xymz board lines
    var xymz = "pawnLines.xymz";
    for (var l=0; l<4; l++) {
        xymz += "[" + l + "] = " + this.xymz[l] + ", ";
    }
    console.log(xymz);

    // Log xmyz board lines
    var xmyz = "pawnLines.xmyz";
    for (var l=0; l<4; l++) {
        xmyz += "[" + l + "] = " + this.xmyz[l] + ", ";
    }
    console.log(xmyz);

    // Log xmymz board lines
    var xmymz = "pawnLines.xmymz";
    for (var l=0; l<4; l++) {
        xmymz += "[" + l + "] = " + this.xmymz[l] + ", ";
    }
    console.log(xmymz);

};