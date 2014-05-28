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
    this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(50, 50, 0), this.currentScene);

    // Adding an Arc Rotate Camera
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3.Zero(), this.currentScene);

    this.currentScene.activeCamera.attachControl(this.canvas);

    BABYLON.SceneLoader.ImportMesh(
        "redCube", "/assets/", "redCube.babylon",
        that.currentScene,
        function(newMeshes, particleSystems) {

            var yellowMat = new BABYLON.StandardMaterial("yellowMat", that.currentScene);
            yellowMat.diffuseColor = new BABYLON.Color3(0.9451, 0.9216, 0.1137);

            for (var i=0; i<5; i++) {
                for (var j=0; j<4; j++) {
                    for (var k=0; k<5; k++) {
                        var yellowCube = newMeshes[0].clone("yellowCube" + i + j);
                        yellowCube.position = new BABYLON.Vector3(4*i, 3*j, 4*k);
                        if ((i+j+k)%2) {
                            yellowCube.material = yellowMat;
                        }
                    }
                }
            }

            that.engine.runRenderLoop(
                function() {
                    that.currentScene.render();
                }
            );

        }
    );


    // Resize
    window.addEventListener(
        'resize',
        function () {
            app.world.engine.resize();
        }
    );

}