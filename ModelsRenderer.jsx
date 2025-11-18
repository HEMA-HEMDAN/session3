import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import React, { useEffect, useRef, useState, Suspense } from "react";
import PropTypes from "prop-types";

const ModelRenderer = ({ model }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Prefer matchMedia for more reliable mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handle = (e) => setIsMobile(!!e.matches);
    handle(mq);
    if (mq.addEventListener) mq.addEventListener("change", handle);
    else mq.addListener(handle);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle);
      else mq.removeListener(handle);
    };
  }, []);

  // Validate model prop early
  const modelPath = model && model.modelPath ? model.modelPath : null;
  // NOTE: move useGLTF into the RotatingModel component so the hook
  // is only invoked when a valid `modelPath` exists (avoids fetching
  // an invalid path or calling the loader with `null`).

  // Camera controls - initialize from model object
  const { camX, camY, camZ, fov } = useControls("Camera", {
    camX: { value: model?.camX ?? 0, min: -50, max: 50, step: 0.5 },
    camY: { value: model?.camY ?? 0, min: -50, max: 50, step: 0.5 },
    camZ: { value: model?.camZ ?? 25, min: -50, max: 50, step: 0.5 },
    fov: { value: model?.fov ?? 75, min: 20, max: 100, step: 1 },
  });

  // Light controls - initialize from model object
  const { ambientIntensity, dirIntensity, hemiIntensity } = useControls(
    "Lights",
    {
      ambientIntensity: {
        value: model?.ambientIntensity ?? 0.2,
        min: 0,
        max: 5,
        step: 0.1,
      },
      dirIntensity: {
        value: model?.dirIntensity ?? 0.9,
        min: 0,
        max: 5,
        step: 0.1,
      },
      hemiIntensity: {
        value: model?.hemiIntensity ?? 0.2,
        min: 0,
        max: 5,
        step: 0.1,
      },
    }
  );

  // Light position controls
  const { lightX, lightY, lightZ } = useControls("Light Position", {
    lightX: { value: model?.lightX ?? 10, min: -50, max: 50, step: 0.5 },
    lightY: { value: model?.lightY ?? 15, min: -50, max: 50, step: 0.5 },
    lightZ: { value: model?.lightZ ?? 10, min: -50, max: 50, step: 0.5 },
  });

  // Model transform controls - initialize from model object
  const { posX, posY, posZ, rotX, rotY, rotZ, scale } = useControls("Model", {
    posX: { value: model?.posX ?? 0, min: -10, max: 10, step: 0.1 },
    posY: { value: model?.posY ?? 0, min: -10, max: 10, step: 0.1 },
    posZ: { value: model?.posZ ?? 0, min: -10, max: 10, step: 0.1 },
    rotX: { value: model?.rotX ?? 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotY: { value: model?.rotY ?? 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotZ: { value: model?.rotZ ?? 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: model?.scale ?? 1, min: 0.1, max: 5, step: 0.1 },
  });

  // Rotation speed controls
  const { rotSpeedX, rotSpeedY, rotSpeedZ } = useControls("Rotation Speed", {
    rotSpeedX: {
      value: model?.rotSpeedX ?? 0,
      min: -0.1,
      max: 0.1,
      step: 0.001,
    },
    rotSpeedY: {
      value: model?.rotSpeedY ?? 0.01,
      min: -0.1,
      max: 0.1,
      step: 0.001,
    },
    rotSpeedZ: {
      value: model?.rotSpeedZ ?? 0,
      min: -0.1,
      max: 0.1,
      step: 0.001,
    },
  });

  // Sync controls back to model object
  useEffect(() => {
    if (model) {
      model.camX = camX;
      model.camY = camY;
      model.camZ = camZ;
      model.fov = fov;
      model.ambientIntensity = ambientIntensity;
      model.dirIntensity = dirIntensity;
      model.hemiIntensity = hemiIntensity;
      model.lightX = lightX;
      model.lightY = lightY;
      model.lightZ = lightZ;
      model.posX = posX;
      model.posY = posY;
      model.posZ = posZ;
      model.rotX = rotX;
      model.rotY = rotY;
      model.rotZ = rotZ;
      model.scale = scale;
      model.rotSpeedX = rotSpeedX;
      model.rotSpeedY = rotSpeedY;
      model.rotSpeedZ = rotSpeedZ;
    }
  }, [
    model,
    camX,
    camY,
    camZ,
    fov,
    ambientIntensity,
    dirIntensity,
    hemiIntensity,
    lightX,
    lightY,
    lightZ,
    posX,
    posY,
    posZ,
    rotX,
    rotY,
    rotZ,
    scale,
    rotSpeedX,
    rotSpeedY,
    rotSpeedZ,
  ]);

  // Rotating model component (defined inline because it uses controls)
  function RotatingModel() {
    const modelRef = useRef();
    const gltfScene = useGLTF(modelPath, true);

    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.x += rotSpeedX;
        modelRef.current.rotation.y += rotSpeedY;
        modelRef.current.rotation.z += rotSpeedZ;
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
          {gltfScene?.scene && <primitive object={gltfScene.scene} />}
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
          position={[lightX, lightY, lightZ]}
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
        {modelPath ? (
          <Suspense fallback={null}>
            <RotatingModel />
          </Suspense>
        ) : null}

        {/* Orbit controls disabled on mobile */}
        {!isMobile && <OrbitControls />}
      </Canvas>

      {/* Control Panel */}
      <Leva hidden={!model.editable} collapsed />
    </section>
  );
};

ModelRenderer.propTypes = {
  model: PropTypes.shape({
    modelPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModelRenderer;
export { ModelRenderer };
