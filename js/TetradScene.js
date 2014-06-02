function TetradScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.callback = callback;

    this.clearColor = new BABYLON.Vector3(0.2, 0.2, 0.2);

    this.createLights();
    this.createCameras();
    this.createMaterials();
    this.createObjects();
    this.createSkybox();

}

$.extend(TetradScene.prototype, BABYLON.Scene.prototype);

TetradScene.prototype.createLights = function() {

    //this.omniLight1 = new BABYLON.PointLight("omniLight1", new BABYLON.Vector3(0, 20, 0), this.currentScene);
    this.hemisphericLight1 = new BABYLON.HemisphericLight("hemisphericLight1", new BABYLON.Vector3(0, 1, 0), this);
    //this.spotLight1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, 20, 0), new BABYLON.Vector3(0, -1, 0), Math.PI/2, 1, this.currentScene);
    /*
     this.directionalLight1 = new BABYLON.DirectionalLight("directionalLight1", new BABYLON.Vector3(-1, -1, 1), this.currentScene);
     this.directionalLight1.position = new BABYLON.Vector3(20, 40, -20);

     this.shadowGenerator = new BABYLON.ShadowGenerator(4096, this.directionalLight1);
     this.shadowGenerator.useVarianceShadowMap = false;
     */

};

TetradScene.prototype.createCameras = function() {

    this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/6, Math.PI/3, 50, new BABYLON.Vector3.Zero(), this);

};

TetradScene.prototype.createMaterials = function() {

    this.brownMaterial = new BABYLON.StandardMaterial("brownMat", this);
    this.brownMaterial.diffuseColor = new BABYLON.Color3(0.4730, 0.8170, 0.2710);
    this.brownMaterial.specularColor = new BABYLON.Color3(1.0000, 1.0000, 1.0000);
    this.brownMaterial.specularPower = 500;

};

TetradScene.prototype.createObjects = function() {

    // Create plate
    this.topPlate = BABYLON.Mesh.CreatePlane("topPlate", 40.0, this);
    this.topPlate.receiveShadows = false;
    this.topPlate.material = this.brownMaterial;
    this.topPlate.rotation.x = Math.PI/2;
    this.topPlate.position.y = -2;

    this.bottomPlate = this.topPlate.clone("bottomPlate");
    this.bottomPlate.receiveShadows = false;
    this.bottomPlate.rotation.x = -Math.PI/2;
    this.bottomPlate.position.y = -2.1;

    var that = this;

    BABYLON.SceneLoader.ImportMesh(
        "", "/assets/", "tetrad.babylon",
        that,
        function(newMeshes, particleSystems) {

            var yellowMat = new BABYLON.StandardMaterial("yellowMat", that);
            yellowMat.diffuseColor = new BABYLON.Color3(1.0000, 0.7000, 0.1000);

            var board = BABYLON.Mesh.CreateBox("board", 2.5 * 5, that);
            var wireMaterial = new BABYLON.StandardMaterial("wire", that);
            wireMaterial.wireframe = true;
            board.material = wireMaterial;
            board.isVisible = false;

            newMeshes[0].parent = board;

            for (var i=0; i<5; i++) {
                for (var j=0; j<4; j++) {
                    for (var k=0; k<5; k++) {
                        if (i+j+k) {
                            var pawn = newMeshes[0].clone("pawn" + i + j + k);
                            pawn.position = new BABYLON.Vector3(7*i, 2.5*j, 7*k);
                            if ((i+j+k)%2) {
                                pawn.material = yellowMat;
                            }
                            pawn.parent = board;
                            //that.shadowGenerator.getShadowMap().renderList.push(pawn);
                        }
                    }
                }
            }

            board.locallyTranslate(new BABYLON.Vector3(-14, -0.7, -14));

            app.world.callback();

        }
    );

};

TetradScene.prototype.createSkybox = function() {

    var skybox = BABYLON.Mesh.CreateBox("skybox", 400.0, this);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", this);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/moon/moon", this);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.material = skyboxMaterial;

};