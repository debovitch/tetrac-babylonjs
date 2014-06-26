function World() {

    var that = this;

    BABYLON.Engine.ShadersRepository = "/lib/babylonjs/src/Shaders/";

    // Get canvas element
    this.canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
        return;
    }

    // Attach canvas to Babylon engine
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.engine.runEvenInBackground = false;

    // Create render loop when scene is loaded
    this.callback = function() {
        that.engine.runRenderLoop(
            function() {
                that.currentScene.render();
            }
        );
        that.currentScene.connection = new Connection();
        // Listen to keydown events
        $(document).keydown(
            function(event) {
                if (event.which == 82 || event.which == 114) {
                    that.currentScene.reset();
                }
            }
        );

    };

    // Create scenes
    /*this.testScene = new TestScene(this.engine, this.callback);
    var physicsScene = new PhysicsScene(this.engine);
    var blenderScene = new BlenderScene(this.engine);
    var skyboxScene = new SkyboxScene(this.engine, this.callback);*/
    this.tetradScene = new TetradScene(this.engine, this.callback);

    // Attach input events to active camera
    this.currentScene = this.tetradScene;
    this.currentScene.activeCamera.attachControl(this.canvas);

    // Set click listener
    window.addEventListener(
        'dblclick',
        function(event) {
            var pickResult = that.currentScene.pick(event.clientX, event.clientY);
            if (pickResult.hit) {
                that.currentScene.meshHit(pickResult.pickedMesh);
            }
        }
    );

    // Set resize event callback
    window.addEventListener(
        'resize',
        function () {
            app.world.engine.resize();
        }
    );

}