import React, { Suspense, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const Testing5 = () => {
  const gltf = useLoader(GLTFLoader, "/scene.gltf");
  const clock = useRef(new THREE.Clock()).current;

  const [animationIndex, setAnimationIndex] = useState(0);
  let mixer;

  const animate = () => {
    requestAnimationFrame(animate);

    if (mixer) mixer.update(clock.getDelta());
  };

  const scene = new THREE.Scene();

  if (gltf) {
    mixer = new THREE.AnimationMixer(gltf.scene);

    const animationActions = gltf.animations.map((clip) => {



if(clip.name==='Run'){
    console.log(clip)
      const action = mixer.clipAction(clip);
      console.log('this is the actions',action)
      action.play();
      return action;

}
    });

 

    scene.add(gltf.scene);

    animate();
  }

  const switchAnimation = () => {
    const nextIndex = (animationIndex + 1) % gltf.animations.length;
    setAnimationIndex(nextIndex);
    mixer.stopAllAction(); // Stop all current animations
    mixer.clipAction(gltf.animations[nextIndex]).play(); // Play the next animation
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <primitive object={gltf ? gltf.scene : null} scale={[2, 2, 2]} position={[0,-2,0]}/>
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      {gltf && (
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <button onClick={switchAnimation}>Switch Animation</button>
          <p>Current Animation: {gltf.animations[animationIndex].name}</p>
        </div>
      )}
    </div>
  );
};

export default Testing5;

