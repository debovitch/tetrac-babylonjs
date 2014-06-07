function TetradScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.callback = callback;

    this.clearColor = new BABYLON.Vector3(0.2, 0.2, 0.2);

    this.createMaterials();
    this.createLights();
    this.createCameras();
    this.createObjects();
    this.createSkybox();

    //this.registerBeforeRender(this.update);

}

$.extend(TetradScene.prototype, BABYLON.Scene.prototype);

TetradScene.prototype.createLights = function() {

    this.omniLight1 = new BABYLON.PointLight("omniLight1", new BABYLON.Vector3(0, 20, 0), this);
    this.omniLight1.diffuse = new BABYLON.Color3(0, 0, 1);
    this.omniLight1.specular = new BABYLON.Color3(0, 0, 1);

    this.hemisphericLight1 = new BABYLON.HemisphericLight("hemisphericLight1", new BABYLON.Vector3(0, 1, 0), this);
    this.hemisphericLight1.intensity = 0.9;

    var lightDirection = new BABYLON.Vector3(30, -20, -10);
    this.dirLight1 = new BABYLON.DirectionalLight("dirLight1", lightDirection, this);
    this.dirLight1.position = lightDirection.negate();
    this.dirLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.specular = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.intensity = 0.8;

    this.shadowGenerator1 = new BABYLON.ShadowGenerator(4096, this.dirLight1);
    this.shadowGenerator1.useVarianceShadowMap = false;
    this.shadowGenerator1.setDarkness(0.5);

};

TetradScene.prototype.createCameras = function() {

    this.camera1 = new BABYLON.ArcRotateCamera("camera1", Math.PI/6, Math.PI/2.7, 50, new BABYLON.Vector3(0, 3.25, 0), this);

};

TetradScene.prototype.createMaterials = function() {

    this.brownMaterial = new BABYLON.StandardMaterial("brownMat", this);
    this.brownMaterial.diffuseColor = new BABYLON.Color3(0.0872, 0.0372, 0.0147);
    this.brownMaterial.specularColor = new BABYLON.Color3(1.0000, 1.0000, 1.0000);
    this.brownMaterial.specularPower = 500;

    this.blackMaterial = new BABYLON.StandardMaterial("blackMat", this);
    this.blackMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    this.blackMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    this.blackMaterial.specularPower = 1;

    this.whiteMaterial = new BABYLON.StandardMaterial("whiteMat", this);
    this.whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.whiteMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.whiteMaterial.specularPower = 500;

    this.yellowMaterial = new BABYLON.StandardMaterial("yellowMat", this);
    this.yellowMaterial.ambientColor = new BABYLON.Color3(0.2, 0.1, 0);
    this.yellowMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    this.yellowMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.yellowMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.yellowMaterial.specularPower = 500;

    this.redMaterial = new BABYLON.StandardMaterial("redMat", this);
    this.redMaterial.ambientColor = new BABYLON.Color3(0.2, 0, 0);
    this.redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.redMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.redMaterial.specularPower = 500;
    //this.redMaterial.wireframe = true;

    this.mirrorMaterial = new BABYLON.StandardMaterial("mirrorMat", this);
    this.mirrorMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    this.mirrorMaterial.diffuseColor = new BABYLON.Color3(0.0697, 0.0297, 0.0117);
    this.mirrorMaterial.specularColor = new BABYLON.Color3(0.3, 0.2, 0.4);
    this.mirrorMaterial.specularPower = 500;
    this.mirrorMaterial.backFaceCulling = true;
    this.mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this, true);
    this.mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.95);
    this.mirrorMaterial.reflectionTexture.level = 0.1;

    this.groundMaterial = new BABYLON.StandardMaterial("groundMat", this);
    this.groundMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/ground.jpg", this);
    this.groundMaterial.diffuseTexture.uScale = 50.0;
    this.groundMaterial.diffuseTexture.vScale = 50.0;
    this.groundMaterial.specularColor = new BABYLON.Color3(0.0000, 0.0000, 0.0000);
    this.groundMaterial.specularPower = 1;
    this.groundMaterial.backFaceCulling = true;

    this.boundsMaterial = new BABYLON.StandardMaterial("boundsMat", this);
    this.boundsMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    this.boundsMaterial.diffuseColor = new BABYLON.Color3(0.5878, 0.4243, 0.1882);
    this.boundsMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    this.boundsMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.boundsMaterial.specularPower = 1000;

};

TetradScene.prototype.createObjects = function() {

    this.setDimensions();

    var that = this;

    //this.createGround();

    BABYLON.SceneLoader.ImportMesh(
        "", "/assets/tetrad/", "tetrad.json",
        that,
        function(meshes) {

            that.createBounds(meshes[0]);
            that.createBoard(meshes[1]);
            that.createPlate();

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
    this.plateZ = -1.95;
    this.squareHeight = 0.2;

};

TetradScene.prototype.createBounds = function(mesh) {

    mesh.rotation.x = -Math.PI / 2;

};

TetradScene.prototype.createBoard = function(mesh) {

    // Create board
    this.board = BABYLON.Mesh.CreateBox("board", 2.5 * 5, this);
    this.board.material = this.wireMaterial;
    this.board.locallyTranslate(new BABYLON.Vector3(this.originXY, this.originZ, this.originXY));
    this.board.isVisible = false;

    // Create pawn
    this.pawn = mesh;
    this.pawn.isVisible = false;
    this.pawn.parent = this.board;
    this.mirrorMaterial.reflectionTexture.renderList.push(this.pawn);

    // Create squares
    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            var square = this.pawn.clone("square" + i + j);
            square.scaling = new BABYLON.Vector3(0.12, this.squareHeight / 10, 0.12);
            square.position.x = i * (this.pawnSize + this.xyGap);
            square.position.y = -1.1;
            square.position.z = j * (this.pawnSize + this.xyGap);
            square.material = this.whiteMaterial;
            square.parent = this.board;
            square.isVisible = true;
            this.shadowGenerator1.getShadowMap().renderList.push(square);
        }
    }
/*
    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                var pawn = this.pawn.clone("pawn" + i + j + k);
                pawn.position.x = i * (this.pawnSize + this.xyGap);
                pawn.position.y = 2 * this.squareHeight + k * (this.pawnSize + this.zGap);
                pawn.position.z = j * (this.pawnSize + this.xyGap);
                if ((i+j+k)%2) {
                    pawn.material = app.world.tetradScene.yellowMaterial;
                } else {
                    pawn.material = app.world.tetradScene.redMaterial;
                }
                pawn.parent = this.board;
                pawn.isVisible = true;
                this.shadowGenerator1.getShadowMap().renderList.push(pawn);
                this.mirrorMaterial.reflectionTexture.renderList.push(pawn);
            }
        }
    }
*/

};



TetradScene.prototype.createPlate = function() {

    this.plate = BABYLON.Mesh.CreateGround("mirror", 40, 40, 1, this, false);
    this.plate.locallyTranslate(new BABYLON.Vector3(0, this.plateZ, 0));
    this.plate.receiveShadows = true;
    this.plate.material = this.mirrorMaterial;

};

TetradScene.prototype.createGround = function() {

    this.ground = BABYLON.Mesh.CreateGround("ground", 600, 600, 1, this, false);
    this.ground.locallyTranslate(new BABYLON.Vector3(0, -4, 0));
    this.ground.receiveShadows = true;
    this.ground.material = this.groundMaterial;

};

TetradScene.prototype.createSkybox = function() {

    var skybox = BABYLON.Mesh.CreateBox("skybox", 300.0, this);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", this);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var extensions = ['_right.png', '_up.png', '_back.png', '_left.png', '_down.png', '_front.png'];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/fullMoon/full_moon", this, extensions);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.material = skyboxMaterial;

    /*
    var sphereLight = BABYLON.Mesh.CreateSphere("lightSphere", 10, 2, this);
    sphereLight.position = this.dirLight1.position;
    sphereLight.material = this.yellowMaterial;
    */

};

TetradScene.prototype.update = function() {

    var that = app.world.currentScene;
    if (that.camera1.beta < 0.1) {
        that.camera1.beta = 0.1;
    } else if (that.camera1.beta > (Math.PI / 2) * 0.99) {
        that.camera1.beta = (Math.PI / 2) * 0.99;
    }

    if (that.camera1.radius > 140) {
        that.camera1.radius = 140;
    } else if (that.camera1.radius < 10) {
        that.camera1.radius = 10;
    }

};