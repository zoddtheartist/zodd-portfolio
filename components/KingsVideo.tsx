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
        style={{ objectFit: 'cover' }}
        poster="/hashiro-poster.png"
        controls={playing}
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
          {/* Hard-edged, to match the rest of the system. No rounded corners. */}
          <div className="relative flex items-center justify-center w-20 h-20 border-[1.5px] border-[var(--bone)]/60 bg-[var(--night)]/40 group-hover:border-[var(--oxblood)] group-hover:bg-[var(--night)]/70 transition-all duration-300">
            <div
              className="relative ml-1"
              style={{
                width: 0,
                height: 0,
                borderTop: "13px solid transparent",
                borderBottom: "13px solid transparent",
                borderLeft: "22px solid #EDE4D0",
              }}
            />
          </div>
          <p className="mt-5 font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.3em] uppercase text-[var(--bone)]/50 group-hover:text-[var(--brass)] transition-colors duration-300">
            Play the reel
          </p>
        </div>
      )}
    </div>
  )
}
