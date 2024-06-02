import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import axios from "axios";
import { MeshStandardMaterial, TextureLoader } from "three";
import first from '../../public/first.jpeg';

const Testing2 = () => {
  const [gltf, setGltf] = useState(null);
  const [gltf2, setGltf2] = useState(null);

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

        const object = gltfModel.scene;
        object.traverse((node) => {
          if (node.isMesh && node.name === "LEFT_SLEEVE_TSHIRT") {
            const material = new MeshStandardMaterial();
            node.material.color.set("blue");
          }
        });

        object.traverse((node) => {
          const textureLoader = new TextureLoader();
          const map1Texture = textureLoader.load(first);
          if (node.isMesh && node.name === "R_SLEEVE_TSHIRT") {
            node.material.map = map1Texture;
          }
        });

        setGltf2(gltfModel2);
        setGltf(gltfModel);
      } catch (error) {
        console.error("Error fetching GLTF:", error);
      }
    };

    fetchGLTF();
  }, []);

  const handleDownloadGLTF = () => {
    if (gltf) {
      const exporter = new GLTFExporter();
      exporter.parse(gltf.scene, (gltfData) => {
        const gltfString = JSON.stringify(gltfData);
        const blob = new Blob([gltfString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "modified_gltf1.gltf";
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  };
  

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {gltf && <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, -2, 0]} />}
          {gltf2 && <primitive object={gltf2.scene} scale={[2, 2, 2]} position={[0, -2, 0]} />}
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      {gltf && <button onClick={handleDownloadGLTF}>Download GLTF</button>}
    </div>
  );
};

export default Testing2;
