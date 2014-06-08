var Helper = {};

Helper.sendRequest = function(requestString, callback) {

    var url = "http://localhost:8080/" + requestString;

    $.ajax(
        {
            method : 'GET',
            url : url
        }
    ).done(
        function(response) {
            callback(Helper.decodeResponse(response));
        }
    ).fail(
        function(response) {
            console.error("Request failed %s", response);
        }
    );

};

Helper.decodeResponse = function(response) {

    var responseArray = response.split('\n');

    if (responseArray.length > 1) {

        var params =  responseArray[1];
        var paramsArray = params.split('&');

        // Get game id
        var gameIdKeyValue = paramsArray[0];
        var gameIdArray = gameIdKeyValue.split('=');

        if (gameIdArray.length != 2) {
            console.error("Error reading game id : %s", gameIdKeyValue);
            return null;
        } else {
            var gameId = parseInt(gameIdArray[1]);
        }

        // Get computer move
        var moveKeyValue = paramsArray[1];
        var moveArray = moveKeyValue.split('=');

        if (moveArray.length != 2) {
            console.error("Error reading computer move : %s", moveKeyValue);
            return null;
        } else {
            var move = parseInt(moveArray[1]);
            var x = Math.floor(move / 10);
            var y = move % 10;
        }

        return {
            gameId : gameId,
            x : x,
            y : y
        };

    } else {
        console.error("Bad response from server : %s", response);
        return null;
    }

};

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

Helper.log = function(message, obj) {

    console.log(message);
    if (obj) {
        console.log(JSON.stringify(obj, null, '\t'));
    }

};

Helper.logVector = function(vector) {

    for (var i=0; i<vector.length; i++) {
        console.log("%f", vector[i]);
    }

};