import React, { useState, useEffect, useRef } from "react";
import Planet from "../atoms/Planet";
import { useFrame, useLoader } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh, TextureLoader } from "three";
import { useControls } from "leva";

interface SunProps {}

function Sun(props: SunProps) {
  const sunRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const map = useLoader(TextureLoader, "/src/assets/textures/planets/sun.jpg");

  useFrame((state, delta) => {
    if (sunRef.current) {
      const elapsed = state.clock.elapsedTime;
      sunRef.current.rotation.y = elapsed;
      // sunRef.current.rotation.x = elapsed * 9;
      // sunRef.current.rotation.z = elapsed * 9;
      // if (props.data.name === "EARTH") {
      //   console.log(elapsed, sunRef.current?.position);
      // }
    }
  });

  // const { sunScale } = useControls({
  //   sunScale: { value: 0.5, min: 0.1, max: 1, step: 0.1 },
  // });

  return (
    <mesh position-z={0} scale={1} ref={sunRef}>
      <sphereGeometry args={[109, 32, 32]} />
      <meshBasicMaterial map={map} />
      {/*<meshStandardMaterial color={props.color} />*/}
    </mesh>
  );
}

export default Sun;
