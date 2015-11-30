/// <reference path="../bin/acid.d.ts" />

acid.define([], function() {
	
	//----------------------
	// variables..
	//----------------------
	var width         = 1600;
	var	height        = 1600;	
	var angle         = 0;
	
	//----------------------
	// scene..
	//----------------------
	var scenes = {
		scene   : null
	}
	var cameras = {
		camera      : new THREE.PerspectiveCamera( 70, 1, 0.1, 1000 )
	}
	
	var targets = {
		reflect: new THREE.WebGLRenderTarget(width, height, {
			minFilter: THREE.LinearFilter,
			maxFilter: THREE.LinearFilter
		}),		
		scene: new THREE.WebGLRenderTarget(width, height, {
			minFilter: THREE.LinearFilter,
			maxFilter: THREE.LinearFilter
		})
	}
	
	//----------------------
	// lazy load scene.
	//----------------------
	acid.graphics.assets.load("scene", 
		"showroom/assets/scene.json").then(function(scene) {
		acid.graphics.assets.load("texture", [
			"showroom/assets/room-floor.jpg",
			"showroom/assets/room-wall.jpg",
			"showroom/assets/room-arch.jpg",
			"showroom/assets/room-ceiling.jpg",
			"showroom/assets/stage-floor.jpg",
			"showroom/assets/display-top.jpg",
			"showroom/assets/stage-panel.jpg",
		]).then(function(textures) {
			console.log(scene)
			
			//-------------------------------
			// environment
			//-------------------------------
			
			scene.getObjectByName("display-bottom").material  = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("display-top").material     = new THREE.MeshBasicMaterial({map: textures[5],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("room-arch").material       = new THREE.MeshBasicMaterial({map: textures[2],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("room-ceiling").material    = new THREE.MeshBasicMaterial({map: textures[3],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("room-floor").material      = new THREE.MeshBasicMaterial({map: textures[0],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("room-wall").material       = new THREE.MeshBasicMaterial({map: textures[1],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("stage-floor").material     = new THREE.MeshBasicMaterial({map: textures[4],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("stage-light").material     = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("stage-panel").material     = new THREE.MeshBasicMaterial({map: textures[6],  wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("stage-wall").material      = new THREE.MeshPhongMaterial({color: 0x333333, transparent: true, opacity: 0.8, side: THREE.DoubleSide});
			
			scene.getObjectByName("room-floor").material = new acid.graphics.materials.ReflectMaterial({
				reflection_map : targets.reflect,
				map            : textures[0],
				roughness      : 0.7,
				reflect		   : 0.3
			});					
			scene.getObjectByName("stage-floor").material = new acid.graphics.materials.ReflectMaterial({
				reflection_map : targets.reflect,
				map            : textures[4],
				roughness      : 0.4,
				reflect		   : 0.3
			});			
			//-------------------------------
			// car
			//-------------------------------
			var car_environment_cubemap  = new THREE.CubeCamera(1, 1000, 512);
			car_environment_cubemap.name = "car-environment-cubemap";
			car_environment_cubemap.position.set(0, 2, 0)
			scene.add(car_environment_cubemap)
			
			scene.getObjectByName("car-panels").material       = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0x000000, specular: 0xBBBBBB, emissive: 0x333333, shininess: 30, side: THREE.DoubleSide } );
			scene.getObjectByName("car-chassis").material      = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false, side: THREE.DoubleSide});
			scene.getObjectByName("car-chrome").material       = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xFFFFFF, specular: 0xFFFFFF, emissive: 0xFFFFFF, shininess: 100, side: THREE.DoubleSide});
			scene.getObjectByName("car-fender").material       = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide});
			scene.getObjectByName("car-headlights").material   = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xFFFFFF, specular: 0xFFFFFF, emissive: 0xFFFFFF, transparent: true, opacity: 0.9, side: THREE.DoubleSide});
			scene.getObjectByName("car-interior").material     = new THREE.MeshPhongMaterial({ color: 0xC4854D, side: THREE.DoubleSide});
			scene.getObjectByName("car-mag-0").material        = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xC87533, specular: 0xFFFFFF, emissive: 0xFFFFFF, shininess: 100, side: THREE.DoubleSide});
			scene.getObjectByName("car-mag-1").material        = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xC87533, specular: 0xFFFFFF, emissive: 0xFFFFFF, shininess: 100, side: THREE.DoubleSide});
			scene.getObjectByName("car-mag-2").material        = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xC87533, specular: 0xFFFFFF, emissive: 0xFFFFFF, shininess: 100, side: THREE.DoubleSide});
			scene.getObjectByName("car-mag-3").material        = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xC87533, specular: 0xFFFFFF, emissive: 0xFFFFFF, shininess: 100, side: THREE.DoubleSide});
			scene.getObjectByName("car-plates").material       = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, side: THREE.DoubleSide});
			scene.getObjectByName("car-rearlights").material   = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xBB0000, transparent: true, opacity: 0.9, side: THREE.DoubleSide});
			scene.getObjectByName("car-seats").material        = new THREE.MeshPhongMaterial({ color: 0xC4854D, side: THREE.DoubleSide});
			scene.getObjectByName("car-steering").material     = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, side: THREE.DoubleSide});
			scene.getObjectByName("car-wheel-0").material      = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide});
			scene.getObjectByName("car-wheel-1").material      = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide});
			scene.getObjectByName("car-wheel-2").material      = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide});
			scene.getObjectByName("car-wheel-3").material      = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide});
			scene.getObjectByName("car-windows").material      = new THREE.MeshPhongMaterial({ envMap: car_environment_cubemap.renderTarget, color: 0xFFFFFF, specular: 0xFFFFFF, emissive: 0xFFFFFF, transparent: true, opacity: 0.6, side: THREE.DoubleSide});
			scene.getObjectByName("car-wipers").material       = new THREE.MeshPhongMaterial({ color: 0xC4854D, side: THREE.DoubleSide});
			scenes.scene = scene			
		})
	});
	
	return {
		update : function(time) {
			var x = Math.sin(time * 0.01 * Math.PI / 180) * 15;
			var position = new THREE.Vector3(x, 5, -15);
			var lookat = new THREE.Vector3(0, 0, 0);
			cameras.camera.position.set(position.x,  position.y, position.z);
			cameras.camera.up = new THREE.Vector3(0, 1, 0)
			cameras.camera.lookAt(lookat);
		},
		
		render : function(app) {
			if(scenes.scene) {
				app.renderer.setClearColor(0x666666)	
				//--------------------------------------
				// render reflection planes
				//--------------------------------------
				scenes.scene.getObjectByName("room-floor").visible  = false;	
				scenes.scene.getObjectByName("stage-floor").visible = false;
				app.renderer.render(scenes.scene, 
					acid.graphics.cameras.reflect(cameras.camera, 
						new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)), 
						targets.reflect, 
						true)
				scenes.scene.getObjectByName("room-floor").visible  = true;	
				scenes.scene.getObjectByName("stage-floor").visible = true;			
				
				
				
				//---------------------------------------
				// render car environment map
				//---------------------------------------
				scenes.scene.getObjectByName("car").visible = false;						
				scenes.scene.getObjectByName("car-environment-cubemap").updateCubeMap( app.renderer, scenes.scene );
				scenes.scene.getObjectByName("car").visible = true;				
				
									
				app.renderer.render(scenes.scene, cameras.camera, targets.scene, true)				
			}

			return targets;
		}
	}
})