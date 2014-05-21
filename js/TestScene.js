function TestScene(engine) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.createObjects();

}

$.extend(TestScene.prototype, BABYLON.Scene.prototype);

TestScene.prototype.createObjects = function() {

    // Adding the light to the scene
    this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-20, 50, 50), this);

    // Adding an Arc Rotate Camera
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), this);

    this.box = BABYLON.Mesh.CreateBox("Box", 6.0, this);
    this.box.position = new BABYLON.Vector3(-10, 0, 0);

    this.sphere = BABYLON.Mesh.CreateSphere("Sphere", 10.0, 3.0, this);
    this.sphere.position = new BABYLON.Vector3(10, 0, 0);

    this.plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, this);
    this.plane.position = new BABYLON.Vector3(4, -3, 20);

    this.cylinder = BABYLON.Mesh.CreateCylinder("Cylinder", 3, 3, 3, 6, this, false);
    this.cylinder.position = new BABYLON.Vector3(0, -10, 2);

    this.torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, this, false);
    this.torus.position = new BABYLON.Vector3(0, 0, 10);

};