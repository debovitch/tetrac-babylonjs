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

    this.currentScene = new BABYLON.Scene(this.engine);

    // Adding the light to the scene
    this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-20, 50, 0), this.currentScene);

    // Adding an Arc Rotate Camera
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 30, new BABYLON.Vector3.Zero(), this.currentScene);

    this.currentScene.activeCamera.attachControl(this.canvas);

    //BABYLON.SceneLoader.Load("", "cuberouge.babylon", this.engine, function(newScene) {
    //BABYLON.SceneLoader.ImportMesh("bounds", "/assets/", "bounds.babylon", this.currentScene, function(newMeshes, particleSystems) {
        BABYLON.SceneLoader.ImportMesh(
            "redCube", "/assets/", "redCube.babylon",
            that.currentScene,
            function(newMeshes, particleSystems) {
                that.engine.runRenderLoop(function() {
                    that.currentScene.render();
                });
            }, function (progress) {
                // To do: give progress feedback to user
            }
        );
    //}, function (progress) {
        // To do: give progress feedback to user
    //});

    /*
    // Once the scene is loaded, just register a render loop to render it
    this.engine.runRenderLoop(
        function() {
            app.world.currentScene.render();
        }
    );
*/

    /*
    // When click event is raised
    window.addEventListener(
        'click',
        function(evt) {
            var pickResult = app.world.currentScene.pick(evt.clientX, evt.clientY);
            if (pickResult.pickedPoint) {
                var dir = pickResult.pickedPoint.subtract(app.world.currentScene.activeCamera.position);
                dir.normalize();
                pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
            }
        }
    );
    */

    // Resize
    window.addEventListener(
        'resize',
        function () {
            app.world.engine.resize();
        }
    );

}