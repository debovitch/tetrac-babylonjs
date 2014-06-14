function TetradScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;

    this.menu = new Menu();
    this.menu.setMode(Mode.TWOPLAYERSOFFLINE);

    this.game = new Game();

    this.callback = callback;

    this.highDetails = false;

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
    this.omniLight1.intensity = 0.6;

    this.hemisphericLight1 = new BABYLON.HemisphericLight("hemisphericLight1", new BABYLON.Vector3(0, 1, 0), this);
    this.hemisphericLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    this.hemisphericLight1.specular = new BABYLON.Color3(0, 0, 0);
    this.hemisphericLight1.intensity = 0.9;

    var lightDirection = new BABYLON.Vector3(30, -20, -10);
    this.dirLight1 = new BABYLON.DirectionalLight("dirLight1", lightDirection, this);
    this.dirLight1.position = lightDirection.negate();
    this.dirLight1.diffuse = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.specular = new BABYLON.Color3(1, 1, 1);
    this.dirLight1.intensity = 0.8;

    if (this.highDetails) {
        this.shadowGenerator1 = new BABYLON.ShadowGenerator(4096, this.dirLight1);
        this.shadowGenerator1.useVarianceShadowMap = false;
        this.shadowGenerator1.setDarkness(0.5);
    }

};

TetradScene.prototype.createCameras = function() {

    this.camera1 = new BABYLON.ArcRotateCamera("camera1", Math.PI/8, Math.PI/2.7, 70, new BABYLON.Vector3(0, 3.25, 0), this);

};

TetradScene.prototype.createMaterials = function() {

    this.plateMaterial = new BABYLON.StandardMaterial("brownMat", this);
    this.plateMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    this.plateMaterial.diffuseColor = new BABYLON.Color3(0.0872, 0.0372, 0.0147);
    this.plateMaterial.specularColor = new BABYLON.Color3(1.0000, 1.0000, 1.0000);
    this.plateMaterial.specularPower = 500;
    this.plateMaterial.backFaceCulling = true;
    if (this.highDetails) {
        this.plateMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this, true);
        this.plateMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, -1.95);
        this.plateMaterial.reflectionTexture.level = 0.1;
    }

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
    if (this.highDetails) {
        this.plateMaterial.reflectionTexture.renderList.push(this.pawn);
    }

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
            if (this.highDetails) {
                this.shadowGenerator1.getShadowMap().renderList.push(square);
            }
        }
    }

};



TetradScene.prototype.createPlate = function() {

    this.plate = BABYLON.Mesh.CreateGround("mirror", 40, 40, 1, this, false);
    this.plate.locallyTranslate(new BABYLON.Vector3(0, this.plateZ, 0));
    if (this.highDetails) {
        this.plate.receiveShadows = true;
    }
    this.plate.material = this.plateMaterial;

};

TetradScene.prototype.createGround = function() {

    this.ground = BABYLON.Mesh.CreateGround("ground", 600, 600, 1, this, false);
    this.ground.locallyTranslate(new BABYLON.Vector3(0, -4, 0));
    if (this.highDetails) {
        this.ground.receiveShadows = true;
    }
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

};

TetradScene.prototype.update = function() {

    var that = app.world.currentScene;

    that.updateCamera();
    //that.updatePawns();

};

TetradScene.prototype.updateCamera = function() {

    if (this.camera1.beta < 0.1) {
        this.camera1.beta = 0.1;
    } else if (this.camera1.beta > (Math.PI / 2) * 0.99) {
        this.camera1.beta = (Math.PI / 2) * 0.99;
    }

    if (this.camera1.radius > 140) {
        this.camera1.radius = 140;
    } else if (this.camera1.radius < 10) {
        this.camera1.radius = 10;
    }

};

TetradScene.prototype.createPawn = function(x, y, z, player) {

    var pawn = this.pawn.clone("pawn" + x + y + z);
    pawn.position.x = x * (this.pawnSize + this.xyGap);
    pawn.position.y = 2 * this.squareHeight + z * (this.pawnSize + this.zGap);
    pawn.position.z = y * (this.pawnSize + this.xyGap);
    if (player == -1) {
        pawn.material = app.world.tetradScene.yellowMaterial;
    } else if (player == 1) {
        pawn.material = app.world.tetradScene.redMaterial;
    } else {
        console.error("Bad value for player in TetradScene.createPawn method");
    }
    pawn.parent = this.board;
    pawn.isVisible = true;
    if (this.highDetails) {
        this.shadowGenerator1.getShadowMap().renderList.push(pawn);
        this.plateMaterial.reflectionTexture.renderList.push(pawn);
    }

};

TetradScene.prototype.readyToPlay = function() {

    var that = this;

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                if (this.game.pawns[i][j][k] != 0) {
                    this.createPawn(i, j, k, this.game.pawns[i][j][k]);
                    this.menu.player *= -1;
                }
            }
        }
    }

    if (this.menu.mode == Mode.ONEPLAYERONLINE) {

        Helper.sendRequest(
            '/new',
            function(response) {
                console.log("gameId : %i, x : %i, y : %i", response.gameId, response.x, response.y);
                that.game.id = response.gameId;
                that.play(response.x, response.y, -1);
            }
        );

    }

};

TetradScene.prototype.play = function(x, y, player) {

    var that = this;

    // Si la colonne est disponible
    if (!this.game.end && this.game.h[x][y] < 4) {

        this.createPawn(x, y, this.game.h[x][y], player);

        // Pose le pion et teste le gain
        var win = this.game.putPawnAt(x, y, player);
        if (win.winner) {
            this.game.end = true;
            this.displayWinningLine(x, y, player, win.line);
        }

        this.game.h[x][y]++;
        this.game.counter++;

        if (this.game.counter == 100) {
            this.game.end = true;
        }

        this.menu.player *= -1;

    }

    if (this.menu.mode == Mode.ONEPLAYERONLINE) {

        if (player == 1) {
            Helper.sendRequest(
                '/gameId=' + this.game.id + '&move=' + x + y,
                function(response) {
                    console.log("gameId : %i, x : %i, y : %i", response.gameId, response.x, response.y);
                    if (response.gameId != that.game.id) {
                        console.error("Error, game id returned (%s) is different from current game one : %s", response.gameId, that.game.id);
                    }
                    if (response.x != -1) {
                        that.play(response.x, response.y, -1);
                    } else {
                        console.log("Game over, you win !");
                    }
                }
            );
        }

    }

};

TetradScene.prototype.displayWinningLine = function(x, y, player, line) {

    console.log("C'est gagné !");

    for (var i=0; i<4; i++) {
        console.log("Place %i, x : %i, y : %i, z : %i", i,
            this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].x,
            this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].y,
            this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].z
        );
    }

};

TetradScene.prototype.meshHit = function(mesh) {

    //Helper.log("Mesh clicked");

    var x, y;
    if (mesh.name.substring(0, 6) == "square") {
        x = parseInt(mesh.name.substring(6, 7));
        y = parseInt(mesh.name.substring(7, 8));
    } else if (mesh.name.substring(0, 4) == "pawn") {
        x = parseInt(mesh.name.substring(4, 5));
        y = parseInt(mesh.name.substring(5, 6));
    } else {
        return;
    }

    this.play(x, y, this.menu.player);

};