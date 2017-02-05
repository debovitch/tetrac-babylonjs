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
    this.onSceneLoaded = function() {
        that.engine.runRenderLoop(function() {
            that.currentScene.scene.render();
        });
        // Listen to keydown events
        $(document).keydown(function(event) {
            if (event.which == 82 || event.which == 114) {
                that.currentScene.reset();
            }
        });
        // Attach input events to active camera
        that.currentScene.scene.activeCamera.attachControl(that.canvas);
        that.currentScene.connection = new Connection();
    };

    // Create scenes
    //this.currentScene = new TestScene(this.engine, this.callback);
    //this.currentScene = new PhysicsScene(this.engine);
    //this.currentScene = new BlenderScene(this.engine);
    //this.currentScene = new SkyboxScene(this.engine, this.callback);
    this.currentScene = new TetradScene(this.engine);

    // Set click listener
    var selectColumnHandler = function(x, y) {
        var pickResult = that.currentScene.scene.pick(x, y);
        if (pickResult.hit) {
            that.currentScene.meshHit(pickResult.pickedMesh);
        }
    };

    $(window).on('dblclick', function(event) {
        selectColumnHandler(event.clientX, event.clientY);
    });

    var hammer = new Hammer(this.canvas);
    hammer.on("doubletap", function(event) {
        selectColumnHandler(event.center.x, event.center.y);
    });

    // Set resize event callback
    $(window).on('resize', function () {
        app.world.engine.resize();
    });

}