function World() {

    var canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
        return;
    }

    // Babylon
    var engine = new BABYLON.Engine(canvas, true);

    // Creating scene
    scene = new Scene(engine);

    scene.activeCamera.attachControl(canvas);

    // Once the scene is loaded, just register a render loop to render it
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

}