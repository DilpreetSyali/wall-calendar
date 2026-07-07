'use client'
import { useState, useRef } from 'react'
import { MONTHS } from '../utils/dateHelpers'
import styles from './HeroPanel.module.css'

const DEFAULT_IMAGES = {
  0: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80',
  1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  2: 'https://images.unsplash.com/photo-1490750967868-88df5691cc8c?w=800&q=80',
  3: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  4: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=800&q=80',
  5: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  6: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&q=80',
  7: 'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=800&q=80',
  8: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
  9: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
  10: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  11: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80',
}

export default function HeroPanel({ viewYear, viewMonth }) {
  const [customImage, setCustomImage] = useState(null)
  const [imgError, setImgError] = useState(false)
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCustomImage(url)
    setImgError(false)
  }

  const imgSrc = customImage || DEFAULT_IMAGES[viewMonth]

  return (
    <div className={styles.hero}>
      <div className={styles.imgWrapper}>
        {!imgError ? (
          <img
            src={imgSrc}
            alt={`${MONTHS[viewMonth]} ${viewYear}`}
            className={styles.img}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.fallback}>
            <span className={styles.fallbackIcon}>🏔</span>
          </div>
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.monthBadge}>
        <span className={styles.year}>{viewYear}</span>
        <span className={styles.month}>{MONTHS[viewMonth]}</span>
      </div>

      <button
        className={styles.uploadBtn}
        onClick={() => fileRef.current?.click()}
        title="Upload custom photo"
      >
        ↑ Photo
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />

      <svg className={styles.wave} viewBox="0 0 400 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 L0,20 Q100,0 200,20 Q300,40 400,20 L400,40 Z" fill="#ffffff" />
      </svg>
    </div>
  )
}
