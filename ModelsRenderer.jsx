import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { useEffect, useRef, useState } from "react";

const GymRenderer = ({ model }) => {
  const [isMobile, setIsMobile] = useState(false);
  const gltfScene = useGLTF(model.modelPath);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Camera controls
  const { camX, camY, camZ, fov } = useControls("Camera", {
    camX: { value: 0, min: -50, max: 50, step: 0.5 },
    camY: { value: 0, min: -50, max: 50, step: 0.5 },
    camZ: { value: 25, min: -50, max: 50, step: 0.5 },
    fov: { value: 75, min: 20, max: 100, step: 1 },
  });

  // Light controls
  const { ambientIntensity, dirIntensity, hemiIntensity } = useControls(
    "Lights",
    {
      ambientIntensity: { value: 0.2, min: 0, max: 5, step: 0.1 },
      dirIntensity: { value: 0.9, min: 0, max: 5, step: 0.1 },
      hemiIntensity: { value: 0.2, min: 0, max: 5, step: 0.1 },
    }
  );

  // Model transform controls
  const { posX, posY, posZ, rotX, rotY, rotZ, scale } = useControls("Model", {
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 0, min: -10, max: 10, step: 0.1 },
    posZ: { value: 0, min: -10, max: 10, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
  });

  // Rotating model component
  function RotatingModel() {
    const modelRef = useRef();

    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
    });

    return (
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group
          ref={modelRef}
          position={[posX, posY, posZ]}
          rotation={[rotX, rotY, rotZ]}
          scale={scale}
        >
          <primitive object={gltfScene.scene} />
        </group>
      </Float>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <Canvas
        camera={{ position: [camX, camY, camZ], fov }}
        style={{ width: "100%", height: "100%" }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={dirIntensity}
          castShadow
        />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#444444"
          intensity={hemiIntensity}
        />
        <Environment preset="city" />

        {/* 3D Model */}
        <RotatingModel />

        {/* Orbit controls disabled on mobile */}
        {!isMobile && <OrbitControls />}
      </Canvas>

      {/* Control Panel */}
      <Leva collapsed />
    </section>
  );
};

export default GymRenderer;
