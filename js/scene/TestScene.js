function TestScene(engine) {

    this.engine = engine;
    this.scene = new BABYLON.Scene(engine);

    this.createLights();
    this.createCameras();
    this.createMaterials();
    this.createObjects();

}

TestScene.prototype.createLights = function() {

    this.light1 = new BABYLON.PointLight("omni1", new BABYLON.Vector3(0, 100, 0), this.scene);
    this.light1.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    this.light1.specular = new BABYLON.Color3(0.5, 0.5, 0.5);

    this.light3 = new BABYLON.DirectionalLight("dir1", new BABYLON.Vector3(10, 0, 0), this.scene);
    this.light3.diffuse = new BABYLON.Color3(0, 0.5, 0.5);
    this.light3.specular = new BABYLON.Color3(0.5, 1, 1);

};

TestScene.prototype.createCameras = function() {

    this.camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2.5, 40, new BABYLON.Vector3.Zero(), this.scene);

};

TestScene.prototype.createMaterials = function() {

    this.material1 = new BABYLON.StandardMaterial("pinkMat", this.scene);
    this.material1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    this.material1.backFaceCulling = false;

    this.mirrorMaterial = new BABYLON.StandardMaterial("mirrorMat", this.scene);
    this.mirrorMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.mirrorMaterial.backFaceCulling = false;
    this.mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirrorTex", 1024, this.scene, true);
    this.mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);

};

TestScene.prototype.createObjects = function() {

    this.sphere = BABYLON.Mesh.CreateSphere("sphere", 50.0, 10.0, this.scene);
    this.sphere.position = new BABYLON.Vector3(0, 5, 0);
    this.sphere.material = this.material1;

    this.mirrorMaterial.reflectionTexture.renderList.push(this.sphere);

    this.ground = BABYLON.Mesh.CreateGround("extraGround", 100, 100, 1, this.scene, false);
    this.ground.material = this.mirrorMaterial;

};