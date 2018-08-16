//CONTROLS
//var clock = new THREE.Clock();

// Parameters of Sun
var SunParticles = 100000;

//Parameter of Stars
var StarsParticles = 1000000;

//var numStarsParticles = 0;
var maxDimStarsParticles = 2;

//Parameter of Earth
var numEarthOrbitParticles = 100000;
var SpeedRevolutionEarth = 1;
var SpeedRotationEarth = 1;

//Parameter of Moon
var numMoonOrbitParticles = 60000;
var SpeedMoon = 1;

//Renderer
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
var scene = new THREE.Scene();

//Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 20000);


if (mobile()) {
    camera.position.set(-355, 83, -1800);
} else{
    camera.position.set(-331, 334, -1000);
}

//Events
THREEx.WindowResize(renderer, camera);
THREEx.FullScreen.bindKey({ charCode : 'f'.charCodeAt(0) }); // Va fullscreen se si preme f
var keyboard = new THREEx.KeyboardState();
var going = true;
window.addEventListener('keydown', function(event){
    if (event.repeat) {
        return;
    }
    var key = 'tab';
    var pressed = keyboard.pressed(key);
    if(pressed){
        going = !going;
    }
})

//Controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );

//Texture
var textureLoader = new THREE.TextureLoader();

function render() {
    stats.begin();
    //Update Orbit Controls
    controls.update(); //Aggiorna i controlli della vista e camera
    //Update camera info on screen
    updateCameraInfo();
    //Render the scene
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    if(going) {
        uniforms_sun.delta.value =  Math.random()*0.01 - 0.005;
        earthUniforms.rotation_angle.value += 0.01*SpeedRotationEarth;
        earthUniforms.revolution_angle.value -= 0.001*SpeedRevolutionEarth*movementEarth;
        moonUniforms.revolution_angle.value -= 0.001*SpeedRevolutionEarth*movementEarth;
        moonUniforms.motion_angle.value -= 0.005*SpeedMoon;
    
        moonOrbitUniforms.revolution_angle.value -= 0.001*SpeedRevolutionEarth*movementEarth;
        
        uniforms_sun.revolution_angle.value -= 0.001*SpeedRevolutionEarth*movementEarth;
        baseSunUniforms.revolution_angle.value -= 0.001*SpeedRevolutionEarth*movementEarth;
    }
    stats.end();
}