document.body.appendChild( renderer.domElement );

/*________ ****_____________******* START SUN *******_____________**** ________*/
var sunGeometry = new THREE.BufferGeometry();           
var sunData = createSunParticles(SunParticles);
sunGeometry.addAttribute('position', new THREE.BufferAttribute(sunData.positions, 3));
sunGeometry.addAttribute('radius', new THREE.BufferAttribute(sunData.radius, 1));
sunGeometry.addAttribute('longAngle', new THREE.BufferAttribute(sunData.longAngles, 1));
sunGeometry.addAttribute('latAngle', new THREE.BufferAttribute(sunData.latAngles, 1));
sunGeometry.addAttribute('customColor', new THREE.BufferAttribute(sunData.colors, 3));
var sunVertexShader = document.getElementById("vertex_sun").textContent;
var sunFragmentShader = document.getElementById("fragment_sun").textContent;
var sunColor = new Float32Array(3);
sunColor[0] = 1; sunColor[1] = 1; sunColor[2] = 1;

var uniforms_sun = {
    delta: {value: 0},
    revolution_angle: {value: 0.1},
    enabling: {value: 0}
};
            
 var sunMaterial = new THREE.ShaderMaterial({
     uniforms: uniforms_sun, 
     vertexShader: sunVertexShader, 
     fragmentShader: sunFragmentShader, 
     side: THREE.DoubleSide
 });
            
var sun = new THREE.Points(sunGeometry, sunMaterial);
            
scene.add(sun);
           
function sunBufferPos(n){
    var pos = new Float32Array(n*3);
    for (i=0; i < n; i++){pos[i*3] = 0; pos[i*3+1] = 0; pos[i*3+2] = 0;}
    return pos;
}

function createSunParticles(n){
    var pos = sunBufferPos(n);        
    var rad = new Float32Array(n);     
    for (i=0; i < n; i++){rad[i] = (Math.random()*7 + 160);}
    var longAng = new Float32Array(n);
    for (i=0; i < n; i++){longAng[i] = ((Math.random() * (2*Math.PI)) - Math.PI );}
    var latAng = new Float32Array(n);
    for (i=0; i < n; i++){latAng[i] = ((Math.random() * Math.PI) - (Math.PI/2) );}
    var col = new Float32Array(3*n);
    for (i=0; i < n; i++){
        if(Math.random()*2 < 1) {
            col[i*3] = 1; col[i*3 + 1] = 1; col[i*3 + 2] = 0;
        } else {col[i*3] = 1; col[i*3+1] = 0.5; col[i*3+2] = 0;}
    }
    return {positions: pos, radius: rad, longAngles: longAng, latAngles: latAng, colors: col};
}

var baseSunMaterial = new THREE.ShaderMaterial({
    uniforms: baseSunUniforms = {
        texture: { type: 't', value: textureLoader.load("images/8k_sun.jpg") },
        revolution_angle: {value: 0.1},
        enabling: {value: 0}
    },
    vertexShader: document.getElementById("vertex_base_sun").textContent,
    fragmentShader: document.getElementById("fragment_base_sun").textContent,
});
            
var baseSun = new THREE.Mesh( new THREE.SphereBufferGeometry( 160, 64, 64 ), baseSunMaterial);
            
scene.add( baseSun );
/*________ ****_____________******* END SUN *******_____________**** ________*/


/*________ ****_____________******* START STARS *******_____________**** ________*/
var starsGeometry = new THREE.BufferGeometry();           
var starsData = createStarsParticles(StarsParticles);
starsGeometry.addAttribute('position', new THREE.BufferAttribute(starsData.positions, 3));
starsGeometry.addAttribute('size', new THREE.BufferAttribute(starsData.sizes, 1));
var starsVertexShader = document.getElementById("vertex_star").textContent;
var starsFragmentShader = document.getElementById("fragment_star").textContent;
var starColor = new Float32Array(3);
starColor[0] = 1; starColor[1] = 1; starColor[2] = 1;
var uniforms_stars = {
    texture: {type: 't', value: textureLoader.load("images/star.jpg")},
};
            
 var starsMaterial = new THREE.ShaderMaterial({
     uniforms: uniforms_stars, 
     vertexShader: starsVertexShader, 
     fragmentShader: starsFragmentShader, 
     side: THREE.DoubleSide
 });
            
var stars = new THREE.Points(starsGeometry, starsMaterial);

scene.add( stars );

function createStarsParticles(n){
    var pos = new Float32Array(n*3);
    for (i=0; i < n; i++){
        pos[i*3] = Math.random() * 100000 - 50000; 
        pos[i*3+1] = Math.random() * 100000 - 50000; 
        pos[i*3+2] = Math.random() * 100000 - 50000;
    }
    
    var siz = new Float32Array(n);
    for (i=0; i < n; i++){
        if(i < 30*n/31) {siz[i] = 1;} 
        else {siz[i] = 2;}
    }
    
    return {positions: pos, sizes: siz};
}
/*________ ****_____________******* END STARS *******_____________**** ________*/


/*________ ****_____________******* START EARTH *******_____________**** ________*/
var earthMaterial = new THREE.ShaderMaterial({
    uniforms: earthUniforms = {
        texture: { type: 't', value: textureLoader.load("images/earth.jpg") },
        rotation_angle: {value: 1.0},
        revolution_angle: {value: 0.1},
        enabling: {value: 1}
    },
    vertexShader: document.getElementById("vertex_earth").textContent,
    fragmentShader: document.getElementById("fragment_earth").textContent,
});
            
var earth = new THREE.Mesh( new THREE.SphereBufferGeometry(50, 64, 64), earthMaterial);
            
scene.add( earth );
/*________ ****_____________******* END EARTH *******_____________**** ________*/          


/*________ ****_____________******* START MOON *******_____________**** ________*/
var moonMaterial = new THREE.ShaderMaterial({
    uniforms: moonUniforms = {
        texture: { type: 't', value: textureLoader.load("images/moon.jpg") },
        revolution_angle: {value: 0.1},
        motion_angle: {value: 0.1},
        enabling: {value: 1}
    },
    vertexShader: document.getElementById("vertex_moon").textContent,
    fragmentShader: document.getElementById("fragment_moon").textContent,
});
            
var moon = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 64, 64 ), moonMaterial);
            
scene.add( moon );
/*________ ****_____________******* END MOON *******_____________**** ________*/

/*________ ****_____________******* START EARTH_ORBIT *******_____________**** ________*/
var earthOrbitGeometry = new THREE.BufferGeometry();           
var earthOrbitData = createEarthOrbitParticles(numEarthOrbitParticles);
earthOrbitGeometry.addAttribute('position', new THREE.BufferAttribute(earthOrbitData.positions, 3));
earthOrbitGeometry.addAttribute('angle', new THREE.BufferAttribute(earthOrbitData.angles, 1));
var earthOrbitVertexShader = document.getElementById("vertex_earthOrbit").textContent;
var earthOrbitFragmentShader = document.getElementById("fragment_earthOrbit").textContent;
var earthOrbitColor = new Float32Array(3);
earthOrbitColor[0] = 1; earthOrbitColor[1] = 1; earthOrbitColor[2] = 0;
var earthOrbitUniforms = {
    customColor: {value: earthOrbitColor},
    enabling: {value: 1}
};
            
 var earthOrbitMaterial = new THREE.ShaderMaterial({
     uniforms: earthOrbitUniforms, 
     vertexShader: earthOrbitVertexShader, 
     fragmentShader: earthOrbitFragmentShader, 
     side: THREE.DoubleSide
 });
            
var earthOrbit = new THREE.Points(earthOrbitGeometry, earthOrbitMaterial);

function createEarthOrbitParticles(n){
    var pos = new Float32Array(n*3);
    for (i=0; i < n; i++){pos[i*3] = 0; pos[i*3+1] = 0; pos[i*3+2] = 0;}
    var ang = new Float32Array(n);
    for (i=0; i < n; i++){ang[i*3] = Math.random()*(2*Math.PI);}
    return {positions: pos, angles: ang};
    
}
/*________ ****_____________******* END EARTH_ORBIT *******_____________**** ________*/


/*________ ****_____________******* START MOON_ORBIT *******_____________**** ________*/
var moonOrbitGeometry = new THREE.BufferGeometry();           
var moonOrbitData = createMoonOrbitParticles(numMoonOrbitParticles);
moonOrbitGeometry.addAttribute('position', new THREE.BufferAttribute(moonOrbitData.positions, 3));
moonOrbitGeometry.addAttribute('angle', new THREE.BufferAttribute(moonOrbitData.angles, 1));
var moonOrbitVertexShader = document.getElementById("vertex_moonOrbit").textContent;
var moonOrbitFragmentShader = document.getElementById("fragment_moonOrbit").textContent;
var moonOrbitColor = new Float32Array(3);
moonOrbitColor[0] = 1; moonOrbitColor[1] = 1; moonOrbitColor[2] = 0;
var moonOrbitUniforms = {
    customColor: {value: moonOrbitColor},
    revolution_angle : {value: 0.1},
    enabling : {value: 1}
};
            
 var moonOrbitMaterial = new THREE.ShaderMaterial({
     uniforms: moonOrbitUniforms, 
     vertexShader: moonOrbitVertexShader, 
     fragmentShader: moonOrbitFragmentShader, 
     side: THREE.DoubleSide
 });
            
var moonOrbit = new THREE.Points(moonOrbitGeometry, moonOrbitMaterial);

function createMoonOrbitParticles(n){
    var pos = new Float32Array(n*3);
    for (i=0; i < n; i++){pos[i*3] = 0; pos[i*3+1] = 0; pos[i*3+2] = 0;}
    var ang = new Float32Array(n);
    for (i=0; i < n; i++){ang[i*3] = Math.random()*(2*Math.PI);}
    return {positions: pos, angles: ang};
    
}
/*________ ****_____________******* END MOON_ORBIT *******_____________**** ________*/


/*________ ****_____________******* START AXIS *******_____________**** ________*/
//ASSE X
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(5500, 0, 0));
var axisX = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0xdd3333, linewidth: 5 }));
//ASSE Y
var lineGeometry = new THREE.Geometry();              
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 5500, 0));       
var axisY = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x33dd33, linewidth: 5 }));           
//ASSE Z
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 5500));
var axisZ = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x3333dd, linewidth: 5 }));

/*________ ****_____________******* END AXIS *******_____________**** ________*/

/*________ ****_____________******* START PLANE *******_____________**** ________*/
//PLANE
var plane = new THREE.GridHelper(4000, 4000);

/*________ ****_____________******* END PLANE *******_____________**** ________*/

/*________ ****_____________******* START GUI *******_____________**** ________*/
    
var guiControls = new function (){ 
    this.SunParticles = SunParticles;
    this.StarsParticles = StarsParticles;
    this.SpeedRevolutionEarth = SpeedRevolutionEarth;
    this.SpeedRotationEarth = SpeedRotationEarth;
    this.SpeedMoon = SpeedMoon;
    this.toggleMovement = function(){
        going = !going;
    }
}; //Valori da cambiare una volta fatto lo shader

var datGui = new dat.GUI();  

var sunFolder = datGui.addFolder('Sun');
var starsFolder = datGui.addFolder('Stars');
var earthFolder = datGui.addFolder('Earth');
var moonFolder = datGui.addFolder('Moon');

sunFolder.add(guiControls, 'SunParticles', 0, 1000000).onFinishChange(function(newValue){
    SunParticles = Math.floor(newValue);
    document.getElementById('particlesSun').textContent ="Particles per Sun: " + SunParticles;
    
    var newData = createSunParticles(newValue);

    sunGeometry.removeAttribute('position');
    sunGeometry.removeAttribute('radius');
    sunGeometry.removeAttribute('longAngle');
    sunGeometry.removeAttribute('latAngle');
    sunGeometry.removeAttribute('customColor');

    sunGeometry.addAttribute('position', new THREE.BufferAttribute(newData.positions, 3));
    sunGeometry.addAttribute('radius', new THREE.BufferAttribute(newData.radius, 1));
    sunGeometry.addAttribute('longAngle', new THREE.BufferAttribute(newData.longAngles, 1));
    sunGeometry.addAttribute('latAngle', new THREE.BufferAttribute(newData.latAngles, 1));
    sunGeometry.addAttribute('customColor', new THREE.BufferAttribute(newData.colors, 3));

    sunGeometry.attributes.position.needsUpdate = true;
    sunGeometry.attributes.radius.needsUpdate = true;
    sunGeometry.attributes.longAngle.needsUpdate = true;
    sunGeometry.attributes.latAngle.needsUpdate = true;
    sunGeometry.attributes.customColor.needsUpdate = true;
});

starsFolder.add(guiControls, 'StarsParticles', 0, 3000000).onFinishChange(function(newValue){
    StarsParticles = Math.floor(newValue);
    document.getElementById('particlesStars').textContent ="Particles per Stars: " + StarsParticles;
    
    var newData = createStarsParticles(newValue);
    
    starsGeometry.removeAttribute('position');
    starsGeometry.removeAttribute('size');

    starsGeometry.addAttribute('position', new THREE.BufferAttribute(newData.positions, 3));
    starsGeometry.addAttribute('size', new THREE.BufferAttribute(newData.sizes, 1));

    starsGeometry.attributes.position.needsUpdate = true;
    starsGeometry.attributes.size.needsUpdate = true;
});

earthFolder.add(guiControls, 'SpeedRotationEarth', 0, 10).onFinishChange(function(newValue){
    SpeedRotationEarth = newValue;
});

earthFolder.add(guiControls, 'SpeedRevolutionEarth', 0, 10).onFinishChange(function(newValue){
    SpeedRevolutionEarth = newValue;
});

moonFolder.add(guiControls, 'SpeedMoon', 0, 10).onFinishChange(function(newValue){
    SpeedMoon = newValue;
});

datGui.add(guiControls, 'toggleMovement').name("ToggleMovement");

if (mobile()) {
    datGui.close();
} else{
    datGui.open();
}

/*________ ****_____________******* END GUI *******_____________**** ________*/


/*________ ****_____________******* START AUDIO *******_____________**** ________*/

//Create an AudioListener and add it to the camera 
var listener = new THREE.AudioListener(); 
camera.add( listener ); 
// create a global audio source 
var sound = new THREE.Audio( listener ); 
var audioLoader = new THREE.AudioLoader();
//Load a sound and set it as the Audio object's buffer 
audioLoader.load( "music/song.mp3", function( buffer ) { 
    sound.setBuffer( buffer ); 
    sound.setLoop(true); 
    sound.setVolume(0.5); 
    sound.play(); 
});

/*________ ****_____________******* END AUDIO *******_____________**** ________*/

render();