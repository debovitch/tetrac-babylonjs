function TestScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.createLights();
    this.createCameras();
    this.createMaterials();
    this.createObjects();
    this.createMirror();
    callback();

}

$.extend(TestScene.prototype, BABYLON.Scene.prototype);

TestScene.prototype.createLights = function() {

    this.light1 = new BABYLON.PointLight("omni1", new BABYLON.Vector3(0, 100, 0), this);
    this.light1.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    this.light1.specular = new BABYLON.Color3(0.5, 0.5, 0.5);

    this.light3 = new BABYLON.DirectionalLight("dir1", new BABYLON.Vector3(10, 0, 0), this);
    this.light3.diffuse = new BABYLON.Color3(0, 0.5, 0.5);
    this.light3.specular = new BABYLON.Color3(0.5, 1, 1);

};

TestScene.prototype.createCameras = function() {

    this.camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2.5, 40, new BABYLON.Vector3.Zero(), this);

};

TestScene.prototype.createMaterials = function() {

    this.material1 = new BABYLON.StandardMaterial("pinkMat", this);
    this.material1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    this.material1.backFaceCulling = false;

};

TestScene.prototype.createObjects = function() {

    this.sphere = BABYLON.Mesh.CreateSphere("sphere", 50.0, 10.0, this);
    this.sphere.position = new BABYLON.Vector3(0, 5, 0);
    this.sphere.material = this.material1;

    this.ground = BABYLON.Mesh.CreateGround("extraGround", 100, 100, 1, this, false);
    //this.ground.material = this.material1;

};

TestScene.prototype.createMirror = function() {

    this.mirrorMaterial = new BABYLON.StandardMaterial("mirrorMat", this);
    this.mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this, true);
    this.mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
    this.mirrorMaterial.reflectionTexture.renderList = [this.sphere];

    this.ground.material = this.mirrorMaterial;

};