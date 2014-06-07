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

    this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3.Zero(), this);
    //this.camera = new BABYLON.DeviceOrientationCamera("Camera", new BABYLON.Vector3(0, 1, -15), this);

};

SkyboxScene.prototype.createSkybox = function() {

    var skybox = BABYLON.Mesh.CreateBox("skybox", 400.0, this);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", this);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var extensions = ['_right.png', '_up.png', '_back.png', '_left.png', '_down.png', '_front.png'];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/fullMoon/full_moon", this, extensions);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.material = skyboxMaterial;

};