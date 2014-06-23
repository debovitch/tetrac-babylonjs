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

        if ('session' in response) {
            console.log("Session : " + response.session);
            scene.readyToPlay();
        } else if ('game' in response && 'x' in response && 'y' in response) {
            scene.game.id = response.game;
            scene.play(response.x, response.y, -1);
        } else if ('progress' in response) {
            console.log("Progress : " + response.progress);
            var scope = angular.element(document.getElementsByTagName('body')).scope();
            scope["active"+response.progress] = true;
            scope.$apply();
        } else {
            console.error("Unknown response from server : " + event.data);
        }
    } catch (e) {
        console.error("Error trying to parse json response from server : " + event.data);
    }


};

Connection.prototype.onError = function(event) {

    console.log('ERROR : ' + event.data);

};