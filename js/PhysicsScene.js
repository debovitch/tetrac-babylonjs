function PhysicsScene(engine) {

    BABYLON.Scene.call(this, engine);

    this.engine = engine;
    this.createMaterials();
    this.createObjects();

}

$.extend(PhysicsScene.prototype, BABYLON.Scene.prototype);

PhysicsScene.prototype.createMaterials = function() {

    this.diffuseRed = new BABYLON.StandardMaterial("diffuseRed", this);
    this.diffuseRed.diffuseColor = new BABYLON.Color3(1, 0, 0);

    this.diffuseYellow = new BABYLON.StandardMaterial("diffuseYellow", this);
    this.diffuseYellow.diffuseColor = new BABYLON.Color3(1, 1, 0);

    this.diffuseGrey = new BABYLON.StandardMaterial("diffuseGrey", this);
    this.diffuseGrey.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);

};

PhysicsScene.prototype.createObjects = function() {

    // Add light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 50), this);

    // Add a trackball camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/2, 50, new BABYLON.Vector3.Zero(), this);

    // Add ground
    var plane = BABYLON.Mesh.CreatePlane("Plane", 50.0, this);
    plane.position = new BABYLON.Vector3(0, 0, 0);
    //plane.rotation.y = Math.PI/2;
    plane.material = this.diffuseGrey;

    // Add box
    var box = BABYLON.Mesh.CreateBox("Box", 6.0, this);
    box.position = new BABYLON.Vector3(0, 0, 0);
    box.material = this.diffuseRed;

    var box2 = BABYLON.Mesh.CreateBox("Box", 6.0, this);
    box2.position = new BABYLON.Vector3(0, 6, 0);
    box2.material = this.diffuseRed;

    // Add sphere
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", 10, 3, this);
    sphere.position = new BABYLON.Vector3(0, 10, 0);
    sphere.material = this.diffuseYellow;

/*

    // Compound
    this.part0 = BABYLON.Mesh.CreateBox("part0", 3, this);
    this.part0.material = this.material1;
    this.part0.position = new BABYLON.Vector3(3, 6, 0);

    this.part1 = BABYLON.Mesh.CreateBox("part1", 3, this);
    this.part1.parent = this.part0; // We need a hierarchy for compound objects
    this.part1.position = new BABYLON.Vector3(0, 0, 0);

    this.createCompoundImpostor(
        {
            mass : 2,
            friction : 0.4,
            restitution : 0.3,
            parts : [
                { mesh : this.part0, impostor : BABYLON.PhysicsEngine.BoxImpostor },
                { mesh : this.part1, impostor : BABYLON.PhysicsEngine.BoxImpostor }
            ]
        }
    );

    this.enablePhysics();
    this.setGravity(new BABYLON.Vector3(0, -10, 0));
*/
};