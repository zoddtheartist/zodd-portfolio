"use client"
import { useRef, useState } from "react"

export default function KingsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setPlaying(true)
  }

  return (
    <div className="relative w-full bg-black aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        preload="metadata"
      >
        <source src="/video/kings.mp4" type="video/mp4" />
      </video>

      {/* Play overlay — hidden once video starts */}
      {!playing && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
          onClick={handlePlay}
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 100%)",
          }}
        >
          {/* Play button circle */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-white/60 group-hover:border-white group-hover:scale-110 transition-all duration-300">
            {/* Subtle glow ring */}
            <div className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
            {/* Triangle */}
            <div
              className="relative ml-1.5"
              style={{
                width: 0,
                height: 0,
                borderTop: "14px solid transparent",
                borderBottom: "14px solid transparent",
                borderLeft: "24px solid rgba(255,255,255,0.85)",
              }}
            />
          </div>
          <p className="mt-6 text-white/40 text-xs tracking-[0.3em] uppercase group-hover:text-white/70 transition-colors duration-300">
            Play
          </p>
        </div>
      )}
    </div>
  )
}
