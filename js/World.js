function World() {

    var that = this;

    // Get canvas element
    this.canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
        return;
    }

    // Attach canvas to Babylon engine
    this.engine = new BABYLON.Engine(this.canvas, true);

    // Create render loop when scene is loaded
    this.callback = function() {
        that.engine.runRenderLoop(
            function() {
                app.world.currentScene.render();
            }
        );
    };

    // Create scenes
    //var testScene = new TestScene(this.engine);
    //var physicsScene = new PhysicsScene(this.engine);
    //var blenderScene = new BlenderScene(this.engine);
    //var skyboxScene = new SkyboxScene(this.engine, this.callback);
    var tetradScene = new TetradScene(this.engine, this.callback);

    // Attach input events to active camera
    this.currentScene = tetradScene;
    this.currentScene.activeCamera.attachControl(this.canvas);

    // Set resize event callback
    window.addEventListener(
        'resize',
        function () {
            app.world.engine.resize();
        }
    );

}