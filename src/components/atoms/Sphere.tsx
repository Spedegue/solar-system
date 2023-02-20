import React, {useState, useEffect} from 'react';

interface SphereProps{
}


function Sphere(props: SphereProps) {
 return (
  <mesh>
     <sphereGeometry  args={[]}/>
  </mesh>
 );}

export default Sphere;