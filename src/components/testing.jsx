import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

const Testing = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    const light1 = new THREE.PointLight(0xffffff, 1000);
    light1.position.set(2.5, 2.5, 2.5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1000);
    light2.position.set(-2.5, 2.5, 2.5);
    scene.add(light2);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.8, 1.4, 1.0);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    let mixer;
    const gltfLoader = new GLTFLoader();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      if (mixer) mixer.update(clock.getDelta());

      renderer.render(scene, camera);
    };

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    gltfLoader.load(
      '/scene.gltf',
      (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene);

        const animationActions = gltf.animations.map((clip) => {
          const action = mixer.clipAction(clip);
          action.play(); //
          return action;
        });
        console.log('Animation Actions:', animationActions);

        scene.add(gltf.scene);

        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log(error);
      }
    );

    window.addEventListener('resize', onWindowResize, false);

    let clock = new THREE.Clock();

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Testing;
