"use client"
import { useEffect, useRef } from "react"
import { images as portfolioImages } from "@/lib/portfolio-data"

const IMGS = portfolioImages.slice(0, 24)
const Z_STEP = 520
const MAX_SCROLL = IMGS.length * Z_STEP - 500
const CAM_Z = 800
const LERP = 0.05

export default function ThreeGallery() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let destroyed = false
    let dispose: (() => void) | null = null

    ;(async () => {
      const THREE = await import("three")
      if (destroyed) return

      let W = mount.clientWidth
      let H = mount.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x080808, 1)
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x080808, 1800, 3200)

      const camera = new THREE.PerspectiveCamera(55, W / H, 1, 6000)
      camera.position.z = CAM_Z

      const loader = new THREE.TextureLoader()
      IMGS.forEach((img, i) => {
        loader.load(`/portfolio/${img.file}`, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          const iW = tex.image?.naturalWidth ?? tex.image?.width ?? 4
          const iH = tex.image?.naturalHeight ?? tex.image?.height ?? 3
          const ar = iW / iH
          const pH = 245
          const pW = pH * ar

          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(pW, pH),
            new THREE.MeshBasicMaterial({ map: tex })
          )

          const side = i % 2 === 0 ? 1 : -1
          // Camera travels straight down x=0. Keep the plane's near edge clear of
          // that line (half-width + margin) so wide images never fill the screen
          // as the camera passes their depth — otherwise it clips through them.
          const clearance = pW / 2 + 90 + (Math.sin(i * 0.9) * 0.5 + 0.5) * 55
          mesh.position.set(
            side * clearance,
            Math.sin(i * 1.4) * 65,
            -i * Z_STEP
          )
          mesh.rotation.y = -side * 0.13
          mesh.rotation.z = (i % 3 === 0 ? 1 : -1) * 0.025
          scene.add(mesh)
        })
      })

      let rawScroll = 0
      let smoothScroll = 0
      let isDragging = false
      let dragY0 = 0
      let scrollY0 = 0

      const onWheel = (e: WheelEvent) => {
        const goingUp = e.deltaY < 0
        const goingDown = e.deltaY > 0
        // Release scroll at boundaries so the user can exit the section normally
        if ((goingUp && rawScroll <= 0) || (goingDown && rawScroll >= MAX_SCROLL)) return
        e.preventDefault()
        rawScroll = Math.max(0, Math.min(rawScroll + e.deltaY * 1.5, MAX_SCROLL))
      }

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true
        dragY0 = e.clientY
        scrollY0 = rawScroll
        mount.setPointerCapture(e.pointerId)
      }
      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return
        rawScroll = Math.max(0, Math.min(scrollY0 - (e.clientY - dragY0) * 3, MAX_SCROLL))
      }
      const onPointerUp = () => { isDragging = false }

      mount.addEventListener("wheel", onWheel, { passive: false })
      mount.addEventListener("pointerdown", onPointerDown)
      mount.addEventListener("pointermove", onPointerMove)
      mount.addEventListener("pointerup", onPointerUp)
      mount.addEventListener("pointercancel", onPointerUp)

      let rafId: number
      const tick = () => {
        rafId = requestAnimationFrame(tick)
        smoothScroll += (rawScroll - smoothScroll) * LERP
        camera.position.z = CAM_Z - smoothScroll
        renderer.render(scene, camera)
      }
      tick()

      const onResize = () => {
        W = mount.clientWidth
        H = mount.clientHeight
        renderer.setSize(W, H)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
      }
      window.addEventListener("resize", onResize)

      dispose = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener("resize", onResize)
        mount.removeEventListener("wheel", onWheel)
        mount.removeEventListener("pointerdown", onPointerDown)
        mount.removeEventListener("pointermove", onPointerMove)
        mount.removeEventListener("pointerup", onPointerUp)
        mount.removeEventListener("pointercancel", onPointerUp)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    })()

    return () => {
      destroyed = true
      dispose?.()
    }
  }, [])

  return (
    <section className="relative" style={{ height: "80vh" }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #080808 0%, transparent 14%, transparent 86%, #080808 100%)",
        }}
      />
      <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest uppercase">
        Scroll or drag to explore
      </p>
    </section>
  )
}
