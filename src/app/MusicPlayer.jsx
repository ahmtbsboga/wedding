'use client'
import React, { useState, useRef } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleSound = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} src="/weddingmusic.mp3" loop />

      <button
        onClick={toggleSound}
        className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border-2 border-yellow-100/40 shadow-2xl shadow-black/50 hover:bg-white/20 transition"
      >
        {isPlaying ? (
          // Nota donuyor - ses acik ikonu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 text-yellow-50 animate-spin"
            style={{ animationDuration: '3s' }}
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ) : (
          // Sabit nota - ses kapali ikonu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 text-yellow-50/60"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default MusicPlayer