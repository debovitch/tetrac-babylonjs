function World() {

    var that = this;

    // Get canvas element
    this.canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
        return;
    }

    // Babylon
    this.engine = new BABYLON.Engine(this.canvas, true);

    // Creating test scene
    var testScene = new TestScene(this.engine);
    testScene.activeCamera.attachControl(this.canvas);

    this.currentScene = testScene;

    // Once the scene is loaded, just register a render loop to render it
    this.engine.runRenderLoop(
        function() {
            that.currentScene.render();
        }
    );

    // Resize
    window.addEventListener(
        'resize',
        function () {
            that.engine.resize();
        }
    );

}