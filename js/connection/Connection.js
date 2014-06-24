function Connection() {

    this.baseUrl = 'ws://localhost:8080/new';

    this.websocket = new WebSocket(this.baseUrl);

    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onerror = this.onError;

}

Connection.prototype.send = function(message) {

    console.log('Message sent to server : ' + message);
    this.websocket.send(message);

};

Connection.prototype.onOpen = function() {

    console.log('CONNECTED');

};

Connection.prototype.onClose = function() {

    console.log('DISCONNECTED');

};

Connection.prototype.onMessage = function(event) {

    var scene = app.world.currentScene;

    try {
        var response = JSON.parse(event.data);
    } catch (e) {
        console.error("Error trying to parse json response from server : " + event.data);
        return;
    }

    if ('session' in response) {
        console.log("Session : " + response.session);
        scene.readyToPlay();
        var scope = angular.element($('body')).scope();
        scope.message = "let me think";
        scope.color = "yellow";
    } else if ('game' in response && 'x' in response && 'y' in response) {
        scene.ghostPawn.isVisible = false;
        scene.game.id = response.game;
        var scope = angular.element($('body')).scope();
        scope.toggle();
        scene.play(response.x, response.y, -1);
    } else if ('progress' in response) {
        if (response.progress == 0) {
            scene.ghostPawn.isVisible = true;
        }
        var i = Math.floor(response.progress / 5);
        var j = response.progress % 5;
        scene.ghostPawn.position.x = i * (scene.pawnSize + scene.xyGap);
        scene.ghostPawn.position.y = 2 * scene.squareHeight + scene.game.h[i][j] * (scene.pawnSize + scene.zGap);
        scene.ghostPawn.position.z = j * (scene.pawnSize + scene.xyGap);
    } else {
        console.error("Unknown response from server : " + event.data);
    }

};

Connection.prototype.onError = function(event) {

    console.log('ERROR : ' + event.data);

};