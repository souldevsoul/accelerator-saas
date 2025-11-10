'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const cloudShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 fogColor;
    uniform float fogNear;
    uniform float fogFar;
    varying vec2 vUv;

    void main() {
      float depth = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = smoothstep( fogNear, fogFar, depth );

      gl_FragColor = texture2D( map, vUv );
      gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
      gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
    }
  `
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let mouseX = 0
    let mouseY = 0
    const startTime = Date.now()

    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      3000
    )
    camera.position.z = 6000

    const scene = new THREE.Scene()

    // Fog
    const fog = new THREE.Fog(0x4584b4, -100, 3000)
    scene.fog = fog

    // Texture loader
    const textureLoader = new THREE.TextureLoader()

    // Load cloud texture
    textureLoader.load('https://mrdoob.com/lab/javascript/webgl/clouds/cloud10.png', (texture) => {
      texture.magFilter = THREE.LinearMipMapLinearFilter
      texture.minFilter = THREE.LinearMipMapLinearFilter

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          fogColor: { value: fog.color },
          fogNear: { value: fog.near },
          fogFar: { value: fog.far }
        },
        vertexShader: cloudShader.vertexShader,
        fragmentShader: cloudShader.fragmentShader,
        depthWrite: false,
        depthTest: false,
        transparent: true
      })

      // Create cloud planes
      const planeGeo = new THREE.PlaneGeometry(64, 64)
      const planeObj = new THREE.Object3D()
      const geometries: THREE.BufferGeometry[] = []

      for (let i = 0; i < 8000; i++) {
        planeObj.position.x = Math.random() * 1000 - 500
        planeObj.position.y = -Math.random() * Math.random() * 200 - 15
        planeObj.position.z = i
        planeObj.rotation.z = Math.random() * Math.PI
        planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5
        planeObj.updateMatrix()

        const clonedPlaneGeo = planeGeo.clone()
        clonedPlaneGeo.applyMatrix4(planeObj.matrix)
        geometries.push(clonedPlaneGeo)
      }

      const mergedGeometry = mergeGeometries(geometries)
      const planesMesh = new THREE.Mesh(mergedGeometry, material)
      planesMesh.renderOrder = 2

      const planesMeshA = planesMesh.clone()
      planesMeshA.position.z = -8000
      planesMeshA.renderOrder = 1

      scene.add(planesMesh)
      scene.add(planesMeshA)

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)

        const position = ((Date.now() - startTime) * 0.03) % 8000

        camera.position.x += (mouseX - camera.position.x) * 0.01
        camera.position.y += (-mouseY - camera.position.y) * 0.01
        camera.position.z = -position + 8000

        renderer.render(scene, camera)
      }

      animate()
    })

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Mouse move handler
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.25
      mouseY = (event.clientY - window.innerHeight / 2) * 0.15
    }

    // Window resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    document.addEventListener('mousemove', onDocumentMouseMove)
    window.addEventListener('resize', onWindowResize)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove)
      window.removeEventListener('resize', onWindowResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
