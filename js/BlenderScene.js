function BlenderScene(engine) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.createMaterials();
    this.createObjects();

}

$.extend(BlenderScene.prototype, BABYLON.Scene.prototype);

BlenderScene.prototype.createMaterials = function() {

    this.diffuseRed = new BABYLON.StandardMaterial("diffuseRed", this);
    this.diffuseRed.diffuseColor = new BABYLON.Color3(1, 0, 0);

    this.diffuseYellow = new BABYLON.StandardMaterial("diffuseYellow", this);
    this.diffuseYellow.diffuseColor = new BABYLON.Color3(1, 1, 0);

    this.diffuseGrey = new BABYLON.StandardMaterial("diffuseGrey", this);
    this.diffuseGrey.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);

};

BlenderScene.prototype.createObjects = function() {

    // Add light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 50), this);

    // Add a trackball camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/2, 50, new BABYLON.Vector3.Zero(), this);

    // Add box
    var box = BABYLON.Mesh.CreateBox("Box", 6.0, this);
    box.position = new BABYLON.Vector3(0, 0, 0);
    box.material = this.diffuseRed;

};