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
    this.brownMaterial.diffuseColor = new BABYLON.Color3(0.3490, 0.1490, 0.0588);
    this.brownMaterial.specularColor = new BABYLON.Color3(1.0000, 1.0000, 1.0000);
    this.brownMaterial.specularPower = 500;
    this.backFaceCulling = false;
    this.brownMaterial.wireframe = false;

    this.yellowMaterial = new BABYLON.StandardMaterial("yellowMat", this);
    this.yellowMaterial.diffuseColor = new BABYLON.Color3(1.0000, 0.7000, 0.1000);

    this.wireMaterial = new BABYLON.StandardMaterial("wire", this);
    this.wireMaterial.wireframe = true;

    this.mirrorMaterial = new BABYLON.StandardMaterial("mirrorMat", this);
    this.mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this, true);
    this.mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, 1, 0, 1);
    this.mirrorMaterial.reflectionTexture.renderList = [];

};

TetradScene.prototype.createObjects = function() {

    //this.box = new BABYLON.Mesh.CreateBox("measure", 2.5, this);
    //this.box.position = new BABYLON.Vector3(0, 0, 0);

    this.setDimensions();

    var that = this;

    BABYLON.SceneLoader.ImportMesh(
        "", "/assets/tetrad/", "tetrad.babylon",
        that,
        function(meshes) {

            that.createPlate(meshes[1]);
            that.createPawns(meshes[2]);
            app.world.callback();

        }
    );

};

TetradScene.prototype.setDimensions = function() {

    this.pawnSize = 2.5;
    this.xyGap = 1.72 * this.pawnSize;
    this.zGap = 0;
    this.originXY = -2 * (this.pawnSize + this.xyGap);
    this.originZ =  -0.54;

};

TetradScene.prototype.createPlate = function(mesh) {

    mesh.material = this.brownMaterial;
    mesh.scaling.z = 0.2;
    mesh.rotation.x = -Math.PI / 2;
    mesh.locallyTranslate(new BABYLON.Vector3(0, -2, 0));

    /*this.plate = new BABYLON.Mesh.CreatePlane("plate2", 35.0, this);
    this.plate.rotation.x = Math.PI / 2;
    this.plate.position.y = -2.35;
    this.plate.material = this.mirrorMaterial;*/

};

TetradScene.prototype.createPawns = function(mesh) {

    var board = BABYLON.Mesh.CreateBox("board", 2.5 * 5, app.world.tetradScene);
    board.material = this.wireMaterial;
    board.isVisible = false;

    mesh.parent = board;

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                if (i+j+k) {
                    var pawn = mesh.clone("pawn" + i + j + k);
                    pawn.position.x = i * (this.pawnSize + this.xyGap);
                    pawn.position.y = k * (this.pawnSize + this.zGap);
                    pawn.position.z = j * (this.pawnSize + this.xyGap);
                    if ((i+j+k)%2) {
                        pawn.material = app.world.tetradScene.yellowMaterial;;
                    }
                    pawn.parent = board;
                    //that.shadowGenerator.getShadowMap().renderList.push(pawn);

                    this.mirrorMaterial.reflectionTexture.renderList.push(pawn);
                }
            }
        }
    }

    board.locallyTranslate(new BABYLON.Vector3(this.originXY, this.originZ, this.originXY));

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