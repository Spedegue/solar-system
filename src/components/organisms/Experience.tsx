import { useThree } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import Planet from "../atoms/Planet";

import Sun from "../molecules/Sun";
import {
  Environment,
  OrbitControls,
  useCubeTexture,
  useTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

interface ExperienceProps {}

const planetData = [
  {
    name: "MERCURY",
    Mass: 0.0553,
    diameter: 0.383,
    density: 0.985,
    gravity: 0.378,
    escapeVelocity: 0.384,
    rotationPeriod: 58.8,
    lengthOfDay: 175.9,
    distanceFromSun: 0.387,
    perihelion: 0.313,
    aphelion: 0.459,
    orbitalPeriod: 0.241,
    orbitalVelocity: 1.59,
    orbitalEccentricity: 12.3,
    obliquityOfOrbit: 0.001,
    surfacePressure: 0,
    numberOfMoons: 0,
    ringSystem: false,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/mercury.jpg",
  },
  {
    name: "VENUS",
    Mass: 0.815,
    diameter: 0.949,
    density: 0.951,
    gravity: 0.907,
    escapeVelocity: 0.926,
    // TODO Figure out how to rotate backwards
    rotationPeriod: 244,
    // rotationPeriod: -244,
    lengthOfDay: 116.8,
    distanceFromSun: 0.723,
    perihelion: 0.731,
    aphelion: 0.716,
    orbitalPeriod: 0.615,
    orbitalVelocity: 1.18,
    orbitalEccentricity: 0.401,
    obliquityOfOrbit: 0.113,
    surfacePressure: 92,
    numberOfMoons: 0,
    ringSystem: false,
    globalMagneticField: false,
    texture: "/src/assets/textures/planets/venus.jpg",
  },
  {
    name: "EARTH",
    Mass: 1,
    diameter: 1,
    density: 1,
    gravity: 1,
    escapeVelocity: 1,
    rotationPeriod: 1,
    lengthOfDay: 1,
    distanceFromSun: 1,
    perihelion: 1,
    aphelion: 1,
    orbitalPeriod: 1,
    orbitalVelocity: 1,
    orbitalEccentricity: 1,
    obliquityOfOrbit: 1,
    surfacePressure: 1,
    numberOfMoons: 1,
    ringSystem: false,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/earth.jpg",
  },
  // {
  //   name: "MOON",
  //   Mass: 0.0123,
  //   diameter: 0.2724,
  //   density: 0.606,
  //   gravity: 0.166,
  //   escapeVelocity: 0.213,
  //   rotationPeriod: 27.4,
  //   lengthOfDay: 29.5,
  //   distanceFromSun: 0.00257,
  //   perihelion: 0.00247,
  //   aphelion: 0.00267,
  //   orbitalPeriod: 0.0748,
  //   orbitalVelocity: 0.0343,
  //   orbitalEccentricity: 3.29,
  //   obliquityOfOrbit: 0.285,
  //   surfacePressure: 0,
  //   numberOfMoons: 0,
  //   ringSystem: false,
  //   globalMagneticField: false,
  //   texture: "/src/assets/textures/planets/mercury.jpg",

  // },
  {
    name: "MARS",
    Mass: 0.107,
    diameter: 0.532,
    density: 0.714,
    gravity: 0.377,
    escapeVelocity: 0.45,
    rotationPeriod: 1.03,
    lengthOfDay: 1.03,
    distanceFromSun: 1.52,
    perihelion: 1.41,
    aphelion: 1.64,
    orbitalPeriod: 1.88,
    orbitalVelocity: 0.808,
    orbitalEccentricity: 5.6,
    obliquityOfOrbit: 1.07,
    surfacePressure: 0.01,
    numberOfMoons: 2,
    ringSystem: false,
    globalMagneticField: false,
    texture: "/src/assets/textures/planets/mars.jpg",
  },
  {
    name: "JUPITER",
    Mass: 317.8,
    diameter: 11.21,
    density: 0.241,
    gravity: 2.36,
    escapeVelocity: 5.32,
    rotationPeriod: 0.415,
    lengthOfDay: 0.414,
    distanceFromSun: 5.2,
    perihelion: 5.04,
    aphelion: 5.37,
    orbitalPeriod: 11.9,
    orbitalVelocity: 0.439,
    orbitalEccentricity: 2.93,
    obliquityOfOrbit: 0.134,
    surfacePressure: undefined,
    numberOfMoons: 92,
    ringSystem: true,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/jupiter.jpg",
  },
  {
    name: "SATURN",
    Mass: 95.2,
    diameter: 9.45,
    density: 0.125,
    gravity: 0.916,
    escapeVelocity: 3.17,
    rotationPeriod: 0.445,
    lengthOfDay: 0.444,
    distanceFromSun: 9.57,
    perihelion: 9.23,
    aphelion: 9.91,
    orbitalPeriod: 29.4,
    orbitalVelocity: 0.325,
    orbitalEccentricity: 3.38,
    obliquityOfOrbit: 1.14,
    surfacePressure: undefined,
    numberOfMoons: 83,
    ringSystem: true,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/saturn.jpg",
  },
  {
    name: "URANUS",
    Mass: 14.5,
    diameter: 4.01,
    density: 0.23,
    gravity: 0.889,
    escapeVelocity: 1.9,
    rotationPeriod: -0.72,
    lengthOfDay: 0.718,
    distanceFromSun: 19.17,
    perihelion: 18.58,
    aphelion: 19.73,
    orbitalPeriod: 83.7,
    orbitalVelocity: 0.228,
    orbitalEccentricity: 2.74,
    obliquityOfOrbit: 4.17,
    surfacePressure: undefined,
    numberOfMoons: 27,
    ringSystem: true,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/uranus.jpg",
  },
  {
    name: "NEPTUNE",
    Mass: 17.1,
    diameter: 3.88,
    density: 0.297,
    gravity: 1.12,
    escapeVelocity: 2.1,
    rotationPeriod: 0.673,
    lengthOfDay: 0.671,
    distanceFromSun: 30.18,
    perihelion: 30.4,
    aphelion: 29.97,
    orbitalPeriod: 163.7,
    orbitalVelocity: 0.182,
    orbitalEccentricity: 0.677,
    obliquityOfOrbit: 1.21,
    surfacePressure: undefined,
    numberOfMoons: 14,
    ringSystem: true,
    globalMagneticField: true,
    texture: "/src/assets/textures/planets/neptune.jpg",
  },
  // {
  //   name: "PLUTO",
  //   Mass: 0.0022,
  //   diameter: 0.187,
  //   density: 0.336,
  //   gravity: 0.071",
  //   escapeVelocity: "0.116",
  //   rotationPeriod: "6.41",
  //   lengthOfDay: "6.39",
  //   distanceFromSun: "39.48",
  //   perihelion: "30.16",
  //   aphelion: "48.49",
  //   orbitalPeriod: "247.9",
  //   orbitalVelocity: "0.157",
  //   orbitalEccentricity: "14.6",
  //   obliquityOfOrbit: "2.45*",
  //   surfacePressure: "0.00001",
  //   numberOfMoons: "5",
  //   ringSystem: false,
  //   globalMagneticField: "Unknown",
  //   texture: "/src/assets/textures/planets/mercury.jpg",

  // },
];

function Experience(props: ExperienceProps) {
  const { camera, gl, scene } = useThree();
  // const map = useTexture("src/assets/textures/stars.jpg");

  // scene.background = map;

  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls />

      <ambientLight intensity={0.1} />
      {/*<directionalLight />*/}
      <pointLight color={"orange"} intensity={10} position={[0, 0, 0]} />
      <Environment
        // near={1}
        // blur={0.2}
        // far={10}
        // files={"src/assets/textures/star.png"}
        resolution={1024}
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        // preset={"studio"}
        background={true}
        path={"src/assets/textures/stars2/"}
      />
      <Sun />
      {planetData.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
        />
      ))}

      {/*<Earth />*/}
    </>
  );
}

export default Experience;
