import { useState } from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { MONTH_IMAGES, THEMES } from '../utils/constants'
import HeroImage      from './HeroImage'
import CalendarGrid   from './CalendarGrid'
import NotesSection   from './NotesSection'
import CalendarRings  from './CalendarRings'
import ThemeSwitcher  from './ThemeSwitcher'

export default function Calendar() {
  const cal = useCalendar()
  const [theme, setTheme] = useState('paper')
  const img = MONTH_IMAGES[cal.month]

  // Merge theme vars + per-month accent (only for paper theme)
  const themeVars = { ...THEMES[theme] }
  if (theme === 'paper') themeVars['--accent'] = img.palette.accent
  themeVars['--accent-light'] = themeVars['--accent'] // fallback

  // Responsive: detect mobile via CSS custom prop trick — we'll use a JS check
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640

  return (
    /* Outer wrapper — hang wire + calendar card */
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 12px 36px', animation:'fadeIn 0.5s ease' }}>

      {/* Wire */}
      <div style={{ width:'3px', height:'54px', background:'linear-gradient(180deg,#555,#999)', borderRadius:'2px', marginBottom:'-2px', zIndex:20, boxShadow:'1px 0 2px rgba(0,0,0,0.2)' }}/>

      {/* Calendar card */}
      <div style={{
        ...themeVars,
        position:'relative',
        width: 'min(680px, 95vw)',
        background:'var(--paper)',
        borderRadius:'2px',
        boxShadow:'0 2px 0 rgba(0,0,0,0.06), 0 6px 18px rgba(0,0,0,0.12), 0 28px 56px rgba(0,0,0,0.22), 0 52px 80px rgba(0,0,0,0.1)',
        overflow:'hidden',
        display:'flex', flexDirection:'column',
        transition:'background 0.3s',
        /* paper grain */
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.4' fill='rgba(0,0,0,0.018)'/%3E%3C/svg%3E\")",
      }}>
        <CalendarRings />

        <HeroImage
          month={cal.month} year={cal.year}
          imageData={img} flipping={cal.flipping}
          onPrev={()=>cal.navigateMonth(-1)}
          onNext={()=>cal.navigateMonth(1)}
        />

        {/* Lower: grid + sidebar */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 210px',
        }}>
          <div style={{ borderRight: isMobile?'none':'1px solid var(--paper-dark)', borderBottom: isMobile?'1px solid var(--paper-dark)':'none' }}>
            <CalendarGrid
              month={cal.month} year={cal.year}
              daysInMonth={cal.daysInMonth} firstDay={cal.firstDay}
              isToday={cal.isToday} isWeekend={cal.isWeekend}
              isInRange={cal.isInRange} isRangeStart={cal.isRangeStart} isRangeEnd={cal.isRangeEnd}
              handleDayClick={cal.handleDayClick}
              setHoverDate={cal.setHoverDate}
              hoverDate={cal.hoverDate}
              selecting={cal.selecting}
            />
          </div>

          <NotesSection
            month={cal.month} year={cal.year}
            rangeStart={cal.rangeStart} rangeEnd={cal.rangeEnd}
            clearSelection={cal.clearSelection}
          />
        </div>

        {/* Footer */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'8px 16px 10px',
          borderTop:'1px solid var(--paper-dark)',
          background:'var(--cream)',
        }}>
          <ThemeSwitcher theme={theme} setTheme={setTheme}/>
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.08em',
            color:'#bbb', fontStyle:'italic',
          }}>
            {cal.selecting ? '✦ Click to set end date' : 'Click a date to start selection'}
          </div>
        </div>
      </div>

      {/* Ground shadow */}
      <div style={{
        width:'min(560px,75vw)', height:'36px',
        background:'radial-gradient(ellipse,rgba(0,0,0,0.38) 0%,transparent 70%)',
        marginTop:'4px', filter:'blur(7px)',
      }}/>
    </div>
  )
}
