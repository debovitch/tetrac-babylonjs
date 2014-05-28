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
    this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/6, Math.PI/3, 50, new BABYLON.Vector3.Zero(), this.currentScene);

    this.currentScene.activeCamera.attachControl(this.canvas);

    this.currentScene.clearColor = new BABYLON.Vector3(0.2, 0.2, 0.2);

    BABYLON.SceneLoader.ImportMesh(
        "", "/assets/", "tetrad.babylon",
        that.currentScene,
        function(newMeshes, particleSystems) {

            var yellowMat = new BABYLON.StandardMaterial("yellowMat", that.currentScene);
            yellowMat.diffuseColor = new BABYLON.Color3(1.0000, 0.7000, 0.1000);

            var board = BABYLON.Mesh.CreateBox("board", 2.5 * 5, that.currentScene);
            var wireMaterial = new BABYLON.StandardMaterial("wire", that.currentScene);
            wireMaterial.wireframe = true;
            board.material = wireMaterial;
            board.isVisible = false;

            for (var i=0; i<5; i++) {
                for (var j=0; j<4; j++) {
                    for (var k=0; k<5; k++) {
                        if (i+j+k) {
                            var pawn = newMeshes[0].clone("pawn" + i + j + k);
                            pawn.position = new BABYLON.Vector3(7*i, 3*j, 7*k);
                            if ((i+j+k)%2) {
                                pawn.material = yellowMat;
                            }
                            pawn.parent = board;
                        }
                    }
                }
            }

            board.locallyTranslate(new BABYLON.Vector3(-14, 0, -14));

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