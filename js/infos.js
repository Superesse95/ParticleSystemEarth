var planeIsOn = false;
var	axisAreOn = false;
var earthOrbitIsOn = false;
var moonOrbitIsOn = false;
var movementEarth = 1;

function init(){
    document.getElementById('particlesSun').textContent ="Particles per Sun: " + SunParticles;
    document.getElementById('particlesStars').textContent ="Particles per Stars: " + StarsParticles;
    updateCameraInfo();
    if(mobile()) {
        document.getElementById("checkDevice").style.display = 'none';
    }
}

function updateCameraInfo(){
	document.getElementById('cameraPos').textContent = "Camera Position: ("+Math.round(camera.position.x)+", "+Math.round(camera.position.y)+", "+Math.round(camera.position.z)+")";
}

function hidePlane(){
	if(planeIsOn){
		scene.remove(plane);
		planeIsOn = false;
	}
	else{
		scene.add(plane);
		planeIsOn = true;
	}
}

function hideAxis(){
	if(axisAreOn){
		scene.remove(axisX);
		scene.remove(axisY);
		scene.remove(axisZ);
		axisAreOn = false;
	}
	else{
		scene.add(axisX);
		scene.add(axisY);
		scene.add(axisZ);
		axisAreOn = true;
	}
}

function hideEarthOrbit(){
	if(earthOrbitIsOn){
		scene.remove(earthOrbit);
		earthOrbitIsOn = false;
	}
	else{
		scene.add(earthOrbit);
		earthOrbitIsOn = true;
	}
}

function hideMoonOrbit(){
	if(moonOrbitIsOn){
		scene.remove(moonOrbit);
		moonOrbitIsOn = false;
	}
	else{
		scene.add(moonOrbit);
		moonOrbitIsOn = true;
	}
}

function exploreEarth() {
    if(earthOrbitIsOn){
		scene.remove(earthOrbit);
		earthOrbitIsOn = false;
	}
    movementEarth = 0;
    document.getElementById("EarthOrbit").style.display = 'none';
    document.getElementById("ObsEarth").style.display = 'none';
    document.getElementById("ObsSun").style.display = 'unset';
    uniforms_sun.enabling.value = 1;
    baseSunUniforms.enabling.value = 1;
    earthUniforms.enabling.value = 0;
    earthOrbitUniforms.enabling.value = 0;
    moonUniforms.enabling.value = 0;
    moonOrbitUniforms.enabling.value = 0;
    camera.position.set(0,2000,0);
}

function exploreSun() {
    movementEarth = 1;
    document.getElementById("EarthOrbit").style.display = 'unset';
    document.getElementById("ObsEarth").style.display = 'unset';
    document.getElementById("ObsSun").style.display = 'none';
    uniforms_sun.enabling.value = 0;
    baseSunUniforms.enabling.value = 0;
    earthUniforms.enabling.value = 1;
    earthOrbitUniforms.enabling.value = 1;
    moonUniforms.enabling.value = 1;
    moonOrbitUniforms.enabling.value = 1;
    if (mobile()) {
    camera.position.set(0, 0, -2000);
    } else{
    camera.position.set(0, 0, -1000);
    }
}

stats = new Stats();

document.getElementById('statsDiv').appendChild( stats.dom ).setAttribute('id', 'statsDOM');