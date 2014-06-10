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



};