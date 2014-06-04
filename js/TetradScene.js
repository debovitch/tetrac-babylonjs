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

    this.registerBeforeRender(this.update);

}

$.extend(TetradScene.prototype, BABYLON.Scene.prototype);

TetradScene.prototype.createLights = function() {

    this.omniLight1 = new BABYLON.PointLight("omniLight1", new BABYLON.Vector3(0, 20, 0), this);
    this.omniLight1.diffuse = new BABYLON.Color3(0, 0, 1);
    this.omniLight1.specular = new BABYLON.Color3(0, 0, 1);

    //this.hemisphericLight1 = new BABYLON.HemisphericLight("hemisphericLight1", new BABYLON.Vector3(0, 1, 0), this);

    /*
    this.spotLight1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, 40, 0), new BABYLON.Vector3(0, -1, 0), Math.PI/4, 1, this);
    this.spotLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    this.spotLight1.specular = new BABYLON.Color3(1, 1, 1);
    */

    /*
    this.spotLight2 = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(0, 20, 0), new BABYLON.Vector3(0, -1, 0), Math.PI/2, 2, this);
    this.spotLight2.diffuse = new BABYLON.Color3(1, 1, 1);
    this.spotLight2.specular = new BABYLON.Color3(1, 1, 1);
    */

    this.dirLight1 = new BABYLON.DirectionalLight("dirLight1", new BABYLON.Vector3(-5, -10, -5), this);
    this.dirLight1.position = new BABYLON.Vector3(20, 40, 20);
    this.dirLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.specular = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.intensity = 1;

    this.shadowGenerator1 = new BABYLON.ShadowGenerator(2048, this.dirLight1);
    this.shadowGenerator1.useVarianceShadowMap = false;

    this.dirLight1Sphere = new BABYLON.Mesh.CreateSphere("dirLight1Sphere", 10, 1, this);
    this.dirLight1Sphere.position = this.dirLight1.position;
    this.dirLight1Sphere.material = this.dirLightMat;

    this.dirLight2 = new BABYLON.DirectionalLight("dirLight2", new BABYLON.Vector3(5, -10, 5), this);
    this.dirLight2.position = new BABYLON.Vector3(-30, 40, -30);
    this.dirLight2.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight2.specular = new BABYLON.Color3(1, 1, 1);
    this.dirLight2.intensity = 1;

    this.shadowGenerator2 = new BABYLON.ShadowGenerator(2048, this.dirLight2);
    this.shadowGenerator2.useVarianceShadowMap = false;

    /*
    this.dirLight3 = new BABYLON.DirectionalLight("dirLight3", new BABYLON.Vector3(5, -10, -5), this);
    this.dirLight3.position = new BABYLON.Vector3(-30, 40, 30);
    this.dirLight3.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight3.specular = new BABYLON.Color3(1, 1, 1);

    this.shadowGenerator3 = new BABYLON.ShadowGenerator(2048, this.dirLight3);
    this.shadowGenerator3.useVarianceShadowMap = false;

    this.dirLight4 = new BABYLON.DirectionalLight("dirLight4", new BABYLON.Vector3(-5, -10, 5), this);
    this.dirLight4.position = new BABYLON.Vector3(30, 40, -30);
    this.dirLight4.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight4.specular = new BABYLON.Color3(1, 1, 1);

    this.shadowGenerator4 = new BABYLON.ShadowGenerator(2048, this.dirLight4);
    this.shadowGenerator4.useVarianceShadowMap = false;
    */

};

TetradScene.prototype.createCameras = function() {

    this.camera1 = new BABYLON.ArcRotateCamera("camera1", Math.PI/6, Math.PI/3, 50, new BABYLON.Vector3.Zero(), this);

    //this.currentCamera = this.camera1;

};

TetradScene.prototype.createMaterials = function() {

    this.brownMaterial = new BABYLON.StandardMaterial("brownMat", this);
    this.brownMaterial.diffuseColor = new BABYLON.Color3(0.0872, 0.0372, 0.0147);
    this.brownMaterial.specularColor = new BABYLON.Color3(1.0000, 1.0000, 1.0000);
    this.brownMaterial.specularPower = 500;

    this.blackMaterial = new BABYLON.StandardMaterial("blackMat", this);
    this.blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    this.blackMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.blackMaterial.specularPower = 500;

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
    //this.redMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.redMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.redMaterial.specularPower = 500;

    this.wireMaterial = new BABYLON.StandardMaterial("wire", this);
    this.wireMaterial.wireframe = true;

    var t = 0.5;
    this.mirrorMaterial = new BABYLON.StandardMaterial("mirrorMat", this);
    this.mirrorMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    this.mirrorMaterial.diffuseColor = new BABYLON.Color3(0.1395*t, 0.0595*t, 0.0235*t);
    this.mirrorMaterial.specularColor = new BABYLON.Color3(0.3, 0.2, 0.4);
    //this.mirrorMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    //this.mirrorMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/black.jpg", this);
    this.mirrorMaterial.specularPower = 500;
    this.mirrorMaterial.backFaceCulling = true;
    this.mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this, true);
    this.mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.95);
    this.mirrorMaterial.reflectionTexture.level = 0.2;

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

    this.dirLightMat = new BABYLON.StandardMaterial("dirLightMat", this);
    this.dirLightMat.emissiveColor = new BABYLON.Color3(1, 1, 0);

};

TetradScene.prototype.createObjects = function() {

    this.setDimensions();

    var that = this;

    this.createGround();

    BABYLON.SceneLoader.ImportMesh(
        "", "/assets/tetrad/", "tetrad.babylon",
        that,
        function(meshes) {

            that.createBounds(meshes[0]);
            that.createPawns(meshes[2]);
            that.createPlate(meshes[1]);
            that.createGround();

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

TetradScene.prototype.createBounds = function(mesh) {

    mesh.rotation.x = -Math.PI / 2;

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
                        pawn.material = app.world.tetradScene.yellowMaterial;
                    } else {
                        pawn.material = app.world.tetradScene.redMaterial;
                    }
                    pawn.parent = board;
                    this.shadowGenerator1.getShadowMap().renderList.push(pawn);
                    this.shadowGenerator2.getShadowMap().renderList.push(pawn);
                    /*
                    this.shadowGenerator3.getShadowMap().renderList.push(pawn);
                    this.shadowGenerator4.getShadowMap().renderList.push(pawn);
                    */

                    this.mirrorMaterial.reflectionTexture.renderList.push(pawn);
                }
            }
        }
    }

    board.locallyTranslate(new BABYLON.Vector3(this.originXY, this.originZ, this.originXY));

};

TetradScene.prototype.createPlate = function(mesh) {

    mesh.material = this.brownMaterial;
    mesh.scaling.z = 0.2;
    mesh.rotation.x = -Math.PI / 2;
    mesh.locallyTranslate(new BABYLON.Vector3(0, -2, 0));
    mesh.isVisible = true;

    this.plate = BABYLON.Mesh.CreateGround("mirror", 40, 40, 1, this, false);
    this.plate.locallyTranslate(new BABYLON.Vector3(0, -1.95, 0));
    this.plate.receiveShadows = true;
    this.plate.material = this.mirrorMaterial;

};

TetradScene.prototype.createGround = function() {

    this.ground = BABYLON.Mesh.CreateGround("ground", 400, 400, 1, this, false);
    this.ground.locallyTranslate(new BABYLON.Vector3(0, -4, 0));
    this.ground.receiveShadows = true;
    this.ground.material = this.groundMaterial;

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

TetradScene.prototype.update = function() {

    var that = app.world.currentScene;
    if (that.camera1.beta < 0.1) {
        that.camera1.beta = 0.1;
    } else if (that.camera1.beta > (Math.PI / 2) * 0.99) {
        that.camera1.beta = (Math.PI / 2) * 0.99;
    }

    if (that.camera1.radius > 150) {
        that.camera1.radius = 150;
    } else if (that.camera1.radius < 5) {
        that.camera1.radius = 5;
    }

};