import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import Model from './Model.js'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={meshRef} scale={active ? 1.5 : 1} onClick={(event) => setActive(!active)} onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function Laptop() {
  return (
    <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
      {/* <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model />
        </group>
        {/* <Environment preset="city" /> */}
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  )
}
