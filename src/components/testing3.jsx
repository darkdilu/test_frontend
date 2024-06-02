import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
PresentationControls
import  Manquee from '../../public/Manquee'
import Muza from '../../public/Muza'

const Testing3 = () => {
  return (
    <>
  <div   style={{ width: "60vw", height: "60vh" }}>
  <Canvas>
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 10]} intensity={0.5} />
  <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <OrbitControls />
  

<Manquee  position={[0,-3,0]}/>
<Muza position={[0,-2.8,0]} />

    </Canvas>
    </div>
    </>
  );
};


export default Testing3;
