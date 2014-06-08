var Helper = {};

Helper.maxTab = function(tab) {

    var max = -1;

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] > max) {
                max = tab[i][j];
            }
        }
    }

    return max;

};

Helper.minTab = function(tab) {
    
    var min = 1;

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] < min) {
                min = tab[i][j];
            }
        }
    }

    return min;
    
}

Helper.argmaxX = function(tab) {
    
    var max = Helper.maxTab(tab);

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] == max) {
                return i;
            }
        }
    }

    console.log("Erreur dans argmaxX");
    
    return 0;
    
};

Helper.argmaxY = function(tab) {
    
    var max = Helper.maxTab(tab);

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] == max) {
                return j;
            }
        }
    }

    console.log("Erreur dans argmaxY");
    
    return 0;
    
};

Helper.argminX = function(tab) {
    
    var min = Helper.minTab(tab);

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] == min) {
                return i;
            }
        }
    }

    console.log("Erreur dans argminX");
    
    return 0;
    
};

Helper.argminY = function(tab) {
    
    var min = Helper.minTab(tab);

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (tab[i][j] == min) {
                return j;
            }
        }
    }

    console.log("Erreur dans argminY");
    
    return 0;
    
};

Helper.logVector = function(vector) {

    for (var i=0; i<vector.length; i++) {
        console.log("%f", vector[i]);
    }

};