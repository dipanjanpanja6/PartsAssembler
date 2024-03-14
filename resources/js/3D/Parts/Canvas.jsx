import { ContactShadows, Environment, Grid, OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Model from './Model'

export default function PartsCanvas({ selectedParts }) {
  return (
    <Canvas camera={{ position: [-5, 0, -15] }}>
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
      {/* <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Suspense fallback={null}>
        <TransformControls mode="translate">
          <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
            <Model selectedParts={selectedParts} />
          </group>
        </TransformControls>
        <Environment preset="city" path="./hdri/" />
      </Suspense>
      <ContactShadows scale={20} blur={2} far={4.5} />
      <OrbitControls makeDefault />
      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        fadeDistance={40}
      />
    </Canvas>
  )
}
