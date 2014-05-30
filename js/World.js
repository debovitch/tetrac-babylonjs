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
    //var testScene = new TestScene(this.engine);
    //var physicsScene = new PhysicsScene(this.engine);
    //var blenderScene = new BlenderScene(this.engine);
    var tetradScene = new TetradScene(
        this.engine,
        function() {
            that.engine.runRenderLoop(
                function() {
                    that.currentScene.render();
                }
            );
        }
    );

    this.currentScene = tetradScene;
    this.currentScene.activeCamera.attachControl(this.canvas);

    // Resize
    window.addEventListener(
        'resize',
        function () {
            app.world.engine.resize();
        }
    );

}