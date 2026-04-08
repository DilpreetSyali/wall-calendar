import { DAY_NAMES, HOLIDAYS } from '../utils/constants'

const cell = (extra={}) => ({
  position:'relative', aspectRatio:'1', display:'flex',
  alignItems:'center', justifyContent:'center',
  cursor:'pointer', borderRadius:'4px',
  transition:'background 0.14s, transform 0.1s',
  userSelect:'none',
  ...extra,
})

export default function CalendarGrid({
  month, year, daysInMonth, firstDay,
  isToday, isWeekend, isInRange, isRangeStart, isRangeEnd,
  handleDayClick, setHoverDate, selecting,
}) {
  const prevMonthDays = []
  for (let i = firstDay-1; i >= 0; i--) {
    prevMonthDays.push(new Date(year, month, -i).getDate())
  }
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const nextDays = totalCells - firstDay - daysInMonth

  const getHoliday = d => HOLIDAYS[`${month+1}-${d}`]

  const numStyle = (opts={}) => ({
    fontFamily:'var(--font-body)', fontSize:'13px', fontWeight:400,
    color:'var(--ink)', position:'relative', zIndex:1, lineHeight:1,
    ...opts,
  })

  return (
    <div style={{padding:'10px 14px 14px'}}>
      {/* Day headers */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px', marginBottom:'5px'}}>
        {DAY_NAMES.map((d,i)=>(
          <div key={d} style={{
            textAlign:'center', fontFamily:'var(--font-mono)',
            fontSize:'10px', fontWeight:500, letterSpacing:'0.08em',
            textTransform:'uppercase', padding:'3px 0',
            color: i>=5 ? 'var(--accent)' : '#aaa',
          }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px'}}>
        {/* Prev month ghost days */}
        {prevMonthDays.map((d,i)=>(
          <div key={`p${i}`} style={cell({cursor:'default', opacity:0.28})}>
            <span style={numStyle({fontSize:'11px'})}>{d}</span>
          </div>
        ))}

        {/* Current month */}
        {Array.from({length:daysInMonth},(_,i)=>i+1).map(day=>{
          const start   = isRangeStart(day)
          const end     = isRangeEnd(day)
          const inRange = isInRange(day)
          const today   = isToday(day)
          const weekend = isWeekend(day)
          const holiday = getHoliday(day)

          let bg = 'transparent'
          let radius = '4px'
          if (start || end) { bg='var(--accent)'; radius = start&&end?'4px': start?'4px 0 0 4px':'0 4px 4px 0' }
          else if (inRange) { bg='var(--accent-pale)'; radius='0' }

          return (
            <div
              key={day}
              title={holiday||''}
              style={cell({
                background: bg, borderRadius: radius,
                cursor: selecting ? 'crosshair' : 'pointer',
              })}
              onClick={()=>handleDayClick(day)}
              onMouseEnter={e=>{
                setHoverDate(new Date(year,month,day))
                if(!start&&!end&&!inRange) e.currentTarget.style.background='var(--paper-dark)'
                if(!start&&!end) e.currentTarget.style.transform='scale(1.07)'
              }}
              onMouseLeave={e=>{
                setHoverDate(null)
                if(!start&&!end&&!inRange) e.currentTarget.style.background='transparent'
                e.currentTarget.style.transform='scale(1)'
              }}
            >
              <span style={numStyle({
                color: (start||end) ? '#fff' : today ? 'var(--accent)' : holiday ? 'var(--red,#c0392b)' : weekend ? 'var(--accent)' : inRange ? 'var(--accent)' : 'var(--ink)',
                fontWeight: (start||end||today) ? 700 : 400,
              })}>{day}</span>

              {/* Today dot */}
              {today && !start && !end && (
                <div style={{position:'absolute',bottom:'3px',left:'50%',transform:'translateX(-50%)',width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)'}}/>
              )}
              {/* Holiday dot */}
              {holiday && !start && !end && (
                <div style={{position:'absolute',top:'3px',right:'4px',width:'4px',height:'4px',borderRadius:'50%',background:'#e74c3c'}}/>
              )}
              {/* Selection inner ring */}
              {(start||end) && (
                <div style={{position:'absolute',inset:'2px',border:'1.5px solid rgba(255,255,255,0.45)',borderRadius:'inherit',pointerEvents:'none'}}/>
              )}
            </div>
          )
        })}

        {/* Next month ghost days */}
        {Array.from({length:nextDays},(_,i)=>i+1).map(d=>(
          <div key={`n${d}`} style={cell({cursor:'default', opacity:0.28})}>
            <span style={numStyle({fontSize:'11px'})}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
