function TetradScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.HEMISPHERIC_LIGHT_INTENSITY = 0.9;
    this.CAMERA_ALPHA = Math.PI/8;
    this.CAMERA_BETA = Math.PI/2.7;
    this.CAMERA_RADIUS = 70;

    this.menu = new Menu();
    this.menu.setMode(Mode.ONEPLAYERONLINE);

    this.game = new Game();

    this.callback = callback;

    this.highDetails = false;
    this.increase = true;
    this.dAddColor = 0.01;

    this.pawns = [];

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
    this.hemisphericLight1.intensity = this.HEMISPHERIC_LIGHT_INTENSITY;

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

    this.camera1 = new BABYLON.ArcRotateCamera("camera1", this.CAMERA_ALPHA, this.CAMERA_BETA, this.CAMERA_RADIUS, new BABYLON.Vector3(0, 3.25, 0), this);

};

TetradScene.prototype.createMaterials = function() {

    this.plateMaterial = new BABYLON.StandardMaterial("mirrorMat", this);
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

    this.redMaterial = new BABYLON.StandardMaterial("redMat", this);
    this.redMaterial.ambientColor = new BABYLON.Color3(0.2, 0.1, 0);
    this.redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.redMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.redMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.redMaterial.specularPower = 500;

    this.yellowMaterial = new BABYLON.StandardMaterial("yellowMat", this);
    this.yellowMaterial.ambientColor = new BABYLON.Color3(0.2, 0.1, 0);
    this.yellowMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    this.yellowMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.yellowMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.yellowMaterial.specularPower = 500;

    this.yellowWireframeMaterial = new BABYLON.StandardMaterial("yellowWireframeMat", this);
    this.yellowWireframeMaterial.ambientColor = new BABYLON.Color3(0.2, 0.1, 0);
    this.yellowWireframeMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    this.yellowWireframeMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.yellowWireframeMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.yellowWireframeMaterial.specularPower = 500;
    this.yellowWireframeMaterial.wireframe = true;

    this.winningRedMaterial = new BABYLON.StandardMaterial("redMat", this);
    this.winningRedMaterial.ambientColor = new BABYLON.Color3(0.2, 0, 0);
    this.winningRedMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.winningRedMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    this.winningRedMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.winningRedMaterial.specularPower = 500;
    this.addRedColor = new BABYLON.Color3(this.dAddColor, 0, 0);

    this.winningYellowMaterial = new BABYLON.StandardMaterial("yellowMat", this);
    this.winningYellowMaterial.ambientColor = new BABYLON.Color3(0.2, 0.1, 0);
    this.winningYellowMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    this.winningYellowMaterial.emissiveColor = new BABYLON.Color3(0.2, 0, 0);
    this.winningYellowMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    this.winningYellowMaterial.specularPower = 500;
    this.addYellowColor = new BABYLON.Color3(this.dAddColor, this.dAddColor, 0);

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
            that.createBoard();
            that.createPawns(meshes[1]);
            that.createSquares();
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

TetradScene.prototype.createBoard = function() {

    // Create board
    this.board = BABYLON.Mesh.CreateBox("board", 2.5 * 5, this);
    this.board.material = this.wireMaterial;
    this.board.locallyTranslate(new BABYLON.Vector3(this.originXY, this.originZ, this.originXY));
    this.board.isVisible = false;

};

TetradScene.prototype.createPawns = function(mesh) {

    // Create pawn mesh
    this.pawn = mesh;
    this.pawn.isVisible = false;
    this.pawn.parent = this.board;

    // Create pawns
    for (var i=0; i<5; i++) {
        this.pawns[i] = [];
        for (var j=0; j<5; j++) {
            this.pawns[i][j] = [];
            for (var k=0; k<5; k++) {
                this.pawns[i][j][k] = this.pawn.clone("pawn" + i + j + k);
                this.pawns[i][j][k].position.x = i * (this.pawnSize + this.xyGap);
                this.pawns[i][j][k].position.y = 2 * this.squareHeight + k * (this.pawnSize + this.zGap);
                this.pawns[i][j][k].position.z = j * (this.pawnSize + this.xyGap);
                this.pawns[i][j][k].parent = this.board;
                this.pawns[i][j][k].isVisible = false;
                if (this.highDetails) {
                    this.shadowGenerator1.getShadowMap().renderList.push(this.pawns[i][j][k]);
                    this.plateMaterial.reflectionTexture.renderList.push(this.pawns[i][j][k]);
                }
            }
        }
    }

    // Create computer ghost pawn
    this.ghostPawn = this.pawn.clone("ghostPawn");
    this.ghostPawn.parent = this.board;
    this.ghostPawn.isVisible = false;
    if (this.highDetails) {
        this.shadowGenerator1.getShadowMap().renderList.push(this.ghostPawn);
        this.plateMaterial.reflectionTexture.renderList.push(this.ghostPawn);
    }
    this.ghostPawn.material = this.yellowWireframeMaterial;

};

TetradScene.prototype.createSquares = function() {

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
    if (that.game.end) {
        that.updateWin();
    }

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

TetradScene.prototype.updateWin = function() {

    if (!this.winner) {
        return;
    }

    var color, addColor;
    if (this.winner == 1) {
        color = this.winningRedMaterial.emissiveColor;
        addColor = this.addRedColor;
    } else if (this.winner == -1) {
        color = this.winningYellowMaterial.emissiveColor;
        addColor = this.addYellowColor;
    }

    if (this.increase && color.r < 0.6) {
        color.addToRef(addColor, color);
    } else if (this.increase && color.r >= 0.6) {
        this.increase = false;
        color.subtractToRef(addColor, color);
    } else if (!this.increase && color.r > 0.2) {
        color.subtractToRef(addColor, color);
    } else if (!this.increase && color.r <= 0.2) {
        this.increase = true;
        color.addToRef(addColor, color);
    }

    if (this.hemisphericLight1.intensity > 0.2) {
        this.hemisphericLight1.intensity -= 0.01;
    }

    this.camera1.alpha += 0.001;

};

TetradScene.prototype.putPawn = function(x, y, z, player) {

    if (player == -1) {
        this.pawns[x][y][z].material = app.world.tetradScene.yellowMaterial;
    } else if (player == 1) {
        this.pawns[x][y][z].material = app.world.tetradScene.redMaterial;
    } else {
        console.error("Bad value for player in TetradScene.createPawn method");
    }

    this.pawns[x][y][z].isVisible = true;

};

TetradScene.prototype.removePawn = function(x, y, z) {

    this.pawns[x][y][z].isVisible = false;

};

TetradScene.prototype.reset = function() {

    // Reset game and menu models
    this.game = new Game();
    this.menu.player = -1;

    // Reset game view
    this.hemisphericLight1.intensity = this.HEMISPHERIC_LIGHT_INTENSITY;
    this.camera1.alpha = this.CAMERA_ALPHA;
    this.camera1.beta = this.CAMERA_BETA;
    this.camera1.radius = this.CAMERA_RADIUS;

    // Reset menu view
    var scope = angular.element('body').scope();
    scope.reset();

    // Start to replay
    this.readyToPlay();

};

TetradScene.prototype.readyToPlay = function() {

    var that = this;

    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            for (var k=0; k<4; k++) {
                this.removePawn(i, j, k);
                if (this.game.pawns[i][j][k] != 0) {
                    this.putPawn(i, j, k, this.game.pawns[i][j][k]);
                    this.menu.player *= -1;
                }
            }
        }
    }

    if (this.menu.mode == Mode.ONEPLAYERONLINE) {
        this.connection.send('start');
    }

};

TetradScene.prototype.play = function(x, y, player) {

    // Si la colonne est disponible
    if (!this.game.end && this.game.h[x][y] < 4) {

        this.putPawn(x, y, this.game.h[x][y], player);

        // Pose le pion et teste le gain
        var win = this.game.putPawnAt(x, y, player);
        if (win.winner) {
            this.game.end = true;
            this.winner = player;
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
            var scope = angular.element($('body')).scope();
            scope.toggle();
            this.connection.send('gameId=' + this.game.id + '&move=' + x + y);
        }

    }

};

TetradScene.prototype.displayWinningLine = function(x, y, player, line) {

    console.log("C'est gagné !");

    for (var i=0; i<4; i++) {

        var xx = this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].x;
        var yy = this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].y;
        var zz = this.game.gameLines.pawnsLines[x][y][this.game.h[x][y]][line].places[i].z;

        if (player == 1) {
            this.pawns[xx][yy][zz].material = this.winningRedMaterial;
        } else {
            this.pawns[xx][yy][zz].material = this.winningYellowMaterial;
        }

    }

    var scope = angular.element($('body')).scope();
    if (player == 1) {
        scope.message = "you win !";
    } else {
        scope.message = "you lose !";
    }

    scope.$apply(
        function() {
            scope.restart = true;
        }
    );

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

    if (this.menu.player == 1) {
        this.play(x, y, this.menu.player);
    } else {
        var scope = angular.element('body').scope();
        scope.flash("wait a minute cheater ! it is not your turn");
    }

};