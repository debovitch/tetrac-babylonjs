function TestScene(engine) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.createObjects();

}

$.extend(TestScene.prototype, BABYLON.Scene.prototype);

TestScene.prototype.createObjects = function() {

    // Adding the light to the scene
    this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-20, 50, 0), this);

    // Adding an Arc Rotate Camera
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 10, new BABYLON.Vector3.Zero(), this);

    this.box = BABYLON.Mesh.CreateBox("Box", 6.0, this);
    this.box.position = new BABYLON.Vector3(-10, 0, 0);

    this.sphere = BABYLON.Mesh.CreateSphere("Sphere", 10.0, 3.0, this);
    this.sphere.position = new BABYLON.Vector3(10, 0, 0);

    this.plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, this);
    this.plane.position = new BABYLON.Vector3(4, -3, 20);

    this.cylinder = BABYLON.Mesh.CreateCylinder("Cylinder", 3, 3, 3, 6, this, false);
    this.cylinder.position = new BABYLON.Vector3(0, -10, 2);

    this.torus = BABYLON.Mesh.CreateTorus("Torus", 5, 1, 10, this, false);
    this.torus.position = new BABYLON.Vector3(0, 0, 10);

    this.knot = BABYLON.Mesh.CreateTorusKnot("Knot", 7, 2, 50, 10, 2, 1, this); // diameter1, diameter2, faces1, faces2
    this.knot.position = new BABYLON.Vector3(-20, 5, -10);

    this.material1 = new BABYLON.StandardMaterial("texture1", this);
    this.material1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    this.sphere.material = this.material1;

    this.material2 = new BABYLON.StandardMaterial("texture2", this);
    this.material2.diffuseTexture = new BABYLON.Texture("img/country.jpg", this);
    this.plane.material = this.material2;

    this.material3 = new BABYLON.StandardMaterial("texture3", this);
    this.material3.emissiveColor = new BABYLON.Color3(1.0, 0.2, 0.7);
    this.torus.material = this.material3;

    this.material4 = new BABYLON.StandardMaterial("texture4", this);
    this.material4.emissiveTexture = new BABYLON.Texture("img/country.jpg", this);
    this.cylinder.material = this.material4;

    this.material5 = new BABYLON.StandardMaterial("texture5", this);
    this.material5.wireframe = true;
    this.knot.material = this.material5;

};