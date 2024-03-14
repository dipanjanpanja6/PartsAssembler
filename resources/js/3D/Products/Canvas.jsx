import { ContactShadows, Environment, Grid, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Model from './Model'

export default function PartsCanvas({ selectedParts }) {
  return (
    <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />

      <Suspense fallback={null}>
        {/* <TransformControls mode="translate"> */}
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model selectedParts={selectedParts} />
        </group>
        {/* </TransformControls> */}
        <Environment preset="city" path="./hdri/" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
      <Grid renderOrder={-1} position={[0, -4.5, 0]} infiniteGrid fadeDistance={40} />
    </Canvas>
  )
}
