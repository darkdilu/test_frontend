import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import axios from "axios";
import { MeshStandardMaterial, TextureLoader } from "three";


import first from '../../public/first.jpeg'
const Testing2 = () => {
  const [gltf, setGltf] = useState(null);
  const [gltf2,setGltf2]=useState(null)

  useEffect(() => {
    const fetchGLTF = async () => {
      try {
        const response = await axios.get("http://localhost:4000/gltf2", {
          responseType: "arraybuffer",
        });

        const response2 = await axios.get("http://localhost:4000/gltf", {
          responseType: "arraybuffer",
        });

        const loader = new GLTFLoader();
        const gltfModel = await loader.parseAsync(response.data);
        const gltfModel2 = await loader.parseAsync(response2.data);


        console.log("this is gltfmodel", gltfModel.scene)
        const object = gltfModel.scene
        object.traverse((node) => {


          console.log("node founded",node.name)

          // color setting
          if (node.isMesh && node.name === 'LEFT_SLEEVE_TSHIRT') {
            
            const material = new MeshStandardMaterial();
            node.material.color.set("blue");

           // console.log("node picked")
          }




        })
        object.traverse((node) => {


          console.log("node founded",node.name)

          const textureLoader = new TextureLoader();
		      const map1Texture = textureLoader.load(first); 

          if (node.isMesh && node.name === 'R_SLEEVE_TSHIRT') {

            node.material.map = map1Texture;

            console.log("node picked")
          }




        })










        setGltf2(gltfModel2)
        setGltf(gltfModel);
      } catch (error) {
        console.error("Error fetching GLTF:", error);
      }
    };

    fetchGLTF();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {gltf && <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0,-2,0]}/>}
          {gltf2 && <primitive object={gltf2.scene} scale={[2, 2, 2]} position={[0,-2,0]}/>}
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Testing2;
