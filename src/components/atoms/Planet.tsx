import React, { useState, useEffect, useRef, LegacyRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { BufferGeometry, Line, Material, Mesh, TextureLoader } from "three";
import { Html, Torus } from "@react-three/drei";
import { useControls } from "leva";

export interface IPlanetData {
  name: string;
  Mass: number;
  diameter: number;
  density: number;
  gravity: number;
  escapeVelocity: number;
  rotationPeriod: number;
  lengthOfDay: number;
  distanceFromSun: number;
  perihelion: number;
  aphelion: number;
  orbitalPeriod: number;
  orbitalVelocity: number;
  orbitalEccentricity: number;
  obliquityOfOrbit: number;
  surfacePressure: number | undefined;
  numberOfMoons: number;
  ringSystem: boolean;
  globalMagneticField: boolean;
  texture: string;
}
interface PlanetProps {
  data: IPlanetData;
  color: string;
}

function Planet(props: PlanetProps) {
  const planetRef = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
    null
  );
  const orbitRef = useRef<Line<BufferGeometry, Material | Material[]> | null>(
    null
  );

  const { sizeScale, distanceScale, secondsPerYear } = useControls("Scales", {
    sizeScale: { value: 10, min: 1, max: 25, step: 1 },
    distanceScale: { value: 200, min: 1, max: 200, step: 1 },
    secondsPerYear: { value: 10, min: 1, max: 365, step: 5 },
  });

  const map = useLoader(TextureLoader, props.data.texture);

  const astronomicalUnit = 149597870.7;
  const earthRadius = 6371;
  const ratio = astronomicalUnit / earthRadius;
  // const earthDiameterToAuRatio =
  const scaledDistance =
    300 + (props.data.distanceFromSun * ratio) / distanceScale;

  const radsPerRev = 2 * Math.PI;
  const secondsPerOrbit =
    radsPerRev / (secondsPerYear * props.data.orbitalPeriod);
  const secondsPerRevolution =
    radsPerRev / ((secondsPerYear / 365) * props.data.rotationPeriod);
  // const orbitalVelocity = radsPerRev / secondsPerOrbit;

  useFrame((state, delta) => {
    if (planetRef.current) {
      const elapsed = state.clock.elapsedTime;
      planetRef.current.position.x =
        Math.cos(elapsed * secondsPerOrbit) * scaledDistance;
      planetRef.current.position.z =
        Math.sin(elapsed * secondsPerOrbit) * scaledDistance;
      planetRef.current.rotation.y = elapsed * secondsPerRevolution;
      // if (props.data.name === "EARTH") {
      //   console.log(elapsed, planetRef.current?.position);
      // }
    }
  });

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.x = Math.PI / 2;
      // orbitRef.current.
      // orbitRef.current?.geometry.vertices.shift();
      console.log(orbitRef.current);
    }
  }, []);

  return (
    <group>
      {/*// @ts-ignore*/}
      {/*<line ref={orbitRef}>*/}
      {/*</line>*/}
      <Torus args={[scaledDistance, 0.6, 5, 120, Math.PI * 2]} ref={orbitRef}>
        <meshBasicMaterial color={props.color} />
      </Torus>
      <mesh
        position-z={scaledDistance}
        // position-z={(props.orbitRadius * astronomicalUnit) / earthRadius}
        ref={planetRef}
        scale={sizeScale}
      >
        <sphereGeometry args={[props.data.diameter, 64, 32]} />
        <meshStandardMaterial map={map} />
        <Html>{props.data.name}</Html>
        {/*<meshStandardMaterial color={props.color} />*/}
      </mesh>
    </group>
  );
}

export default Planet;
