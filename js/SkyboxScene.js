function SkyboxScene(engine, callback) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.callback = callback;

    this.clearColor = new BABYLON.Vector3(0.2, 0.2, 0.2);

    this.createCameras();
    this.createSkybox();

    callback();

}

$.extend(SkyboxScene.prototype, BABYLON.Scene.prototype);

SkyboxScene.prototype.createCameras = function() {

    this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/6, Math.PI/3, 50, new BABYLON.Vector3.Zero(), this);

};

SkyboxScene.prototype.createSkybox = function() {

    var skybox = BABYLON.Mesh.CreateBox("skybox", 400.0, this);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", this);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/moon/moon", this);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.material = skyboxMaterial;

};