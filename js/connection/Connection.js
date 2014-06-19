function Connection() {

    this.baseUrl = 'ws://localhost:8080/new';

    this.websocket = new WebSocket(this.baseUrl);

    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onerror = this.onError;

}

Connection.prototype.send = function(message) {

    this.websocket.send(message);

};

Connection.prototype.onOpen = function() {

    console.log('CONNECTED');

};

Connection.prototype.onClose = function() {

    console.log('DISCONNECTED');

};

Connection.prototype.onMessage = function(event) {

    console.log('RESPONSE : ' + event.data);

    var scene = app.world.currentScene;

    if (event.data == 'ready') {

        scene.readyToPlay();

    } else {

        var response = scene.connection.decodeResponse(event.data);
        scene.game.id = response.gameId;
        scene.play(response.x, response.y, -1);

    }

};

Connection.prototype.onError = function(event) {

    console.log('ERROR : ' + event.data);

};

Connection.prototype.decodeResponse = function(response) {

    var paramsArray = response.split('&');

    if (paramsArray.length > 1) {

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