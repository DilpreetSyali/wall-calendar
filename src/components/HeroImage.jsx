import { useState } from 'react'
import { MONTH_NAMES } from '../utils/constants'

export default function HeroImage({ month, year, imageData, flipping, onPrev, onNext }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{
      position:'relative', height:'260px', overflow:'hidden', flexShrink:0,
      animation: flipping ? 'pageFlip 0.76s cubic-bezier(0.4,0,0.2,1)' : 'none',
      transformOrigin:'top center',
    }}>
      {/* Photo */}
      {!loaded && (
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(90deg,#e0d8cc 25%,#ede7d9 50%,#e0d8cc 75%)',
          backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite',
        }}/>
      )}
      <img
        key={imageData.url}
        src={imageData.url}
        alt={imageData.credit}
        onLoad={()=>setLoaded(true)}
        style={{
          width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%',
          opacity: loaded ? 1 : 0, transition:'opacity 0.6s ease',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.12) 70%,rgba(245,240,232,0.88) 100%)',
      }}/>

      {/* Chevron left — paper color */}
      <div style={{
        position:'absolute', bottom:0, left:0, width:'55%', height:'58px',
        background:'var(--paper,#f5f0e8)',
        clipPath:'polygon(0 100%, 100% 100%, 0 0)',
      }}/>
      {/* Chevron right — accent color */}
      <div style={{
        position:'absolute', bottom:0, right:0, width:'55%', height:'58px',
        background:'var(--accent,#1a6b9e)',
        clipPath:'polygon(100% 0, 100% 100%, 0 100%)',
      }}/>

      {/* Month label */}
      <div style={{position:'absolute', bottom:'6px', right:'16px', textAlign:'right', zIndex:2, color:'#fff'}}>
        <div style={{fontFamily:'var(--font-body)', fontSize:'12px', letterSpacing:'0.1em', opacity:0.85}}>{year}</div>
        <div style={{fontFamily:'var(--font-display)', fontSize:'28px', fontWeight:900, letterSpacing:'0.04em', lineHeight:1, textTransform:'uppercase', textShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
          {MONTH_NAMES[month]}
        </div>
      </div>

      {/* Photo credit badge */}
      <div style={{
        position:'absolute', top:'12px', left:'14px', zIndex:2,
        fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.1em', textTransform:'uppercase',
        color:'rgba(255,255,255,0.75)', background:'rgba(0,0,0,0.28)',
        padding:'3px 8px', borderRadius:'2px', backdropFilter:'blur(4px)',
      }}>
        {imageData.credit}
      </div>

      {/* Nav buttons */}
      {[{dir:-1,side:'left',path:'M15 18 9 12 15 6'},{dir:1,side:'right',path:'M9 18 15 12 9 6'}].map(({dir,side,path})=>(
        <button
          key={side}
          onClick={()=>dir===-1?onPrev():onNext()}
          aria-label={dir===-1?'Previous month':'Next month'}
          style={{
            position:'absolute', top:'50%', [side]:'12px',
            transform:'translateY(-50%)',
            background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.3)',
            borderRadius:'50%', width:'36px', height:'36px',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', backdropFilter:'blur(8px)',
            transition:'background 0.2s, transform 0.15s',
            zIndex:5,
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.32)'; e.currentTarget.style.transform='translateY(-50%) scale(1.08)' }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.18)'; e.currentTarget.style.transform='translateY(-50%)' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={path}/>
          </svg>
        </button>
      ))}
    </div>
  )
}
