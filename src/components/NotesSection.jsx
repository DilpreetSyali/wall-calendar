import { useState, useEffect } from 'react'
import { MONTH_NAMES, formatDate, getDaysBetween } from '../utils/constants'

const KEY = 'wall-calendar-notes-v2'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY))||{} } catch { return {} } }

export default function NotesSection({ month, year, rangeStart, rangeEnd, clearSelection }) {
  const [notes,   setNotes]   = useState(load)
  const [tab,     setTab]     = useState('month')

  const k = `${year}-${month}`
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(notes)) }, [notes])
  useEffect(()=>{ if(rangeStart&&rangeEnd) setTab('range') }, [rangeStart,rangeEnd])

  const monthNote = notes[k]?.m || ''
  const rangeNote = notes[k]?.r || ''
  const setMN = v => setNotes(p=>({...p,[k]:{...p[k],m:v}}))
  const setRN = v => setNotes(p=>({...p,[k]:{...p[k],r:v}}))

  const days = getDaysBetween(rangeStart, rangeEnd)

  const tabBtn = (id, label) => (
    <button onClick={()=>{ if(id==='range'&&!rangeStart) return; setTab(id) }} style={{
      fontFamily:'var(--font-mono)', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase',
      padding:'4px 11px', border:`1px solid ${tab===id?'var(--accent)':'var(--paper-dark)'}`,
      background: tab===id?'var(--accent)':'transparent',
      color: tab===id?'#fff': id==='range'&&!rangeStart?'#ccc':'#999',
      borderRadius:'2px', cursor: id==='range'&&!rangeStart?'not-allowed':'pointer',
      transition:'all 0.18s',
    }}>{label}</button>
  )

  const textarea = (val, onChange, placeholder, rows=5) => (
    <textarea
      value={val} onChange={e=>onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{
        width:'100%', border:'none', background:'transparent', resize:'none',
        fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75,
        color:'var(--ink)', outline:'none', caretColor:'var(--accent)',
      }}
    />
  )

  return (
    <div style={{
      padding:'13px 14px 10px', borderTop:'1px solid var(--paper-dark)',
      background:'var(--cream)', height:'100%',
    }}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#bbb'}}>Notes</span>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'5px',marginBottom:'10px'}}>
        {tabBtn('month', MONTH_NAMES[month].slice(0,3))}
        {tabBtn('range', 'Range')}
      </div>

      {/* Content */}
      {tab==='month' ? (
        <div>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:'12px',color:'#bbb',marginBottom:'7px'}}>
            {MONTH_NAMES[month]} {year}
          </div>
          {textarea(monthNote, setMN, `Notes for ${MONTH_NAMES[month]}…`)}
        </div>
      ) : (
        <div style={{animation:'noteAppear 0.22s ease'}}>
          {rangeStart && rangeEnd ? (<>
            <div style={{marginBottom:'9px'}}>
              <div style={{
                display:'flex',alignItems:'center',gap:'5px',flexWrap:'wrap',
                fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.04em',
                color:'var(--accent)',background:'var(--accent-pale)',
                borderRadius:'3px',padding:'5px 8px',marginBottom:'4px',
              }}>
                <span>{formatDate(rangeStart)}</span>
                <span style={{color:'#aaa'}}>→</span>
                <span>{formatDate(rangeEnd)}</span>
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'10px',color:'#bbb',letterSpacing:'0.05em',paddingLeft:'2px'}}>
                {days} day{days!==1?'s':''}
              </div>
            </div>
            {textarea(rangeNote, setRN, 'Notes for this range…', 4)}
            <button onClick={clearSelection} style={{
              display:'flex',alignItems:'center',gap:'5px',marginTop:'9px',
              fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.08em',
              textTransform:'uppercase',color:'#bbb',background:'none',border:'none',
              padding:0, transition:'color 0.18s',
            }}
              onMouseEnter={e=>e.currentTarget.style.color='#c0392b'}
              onMouseLeave={e=>e.currentTarget.style.color='#bbb'}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear selection
            </button>
          </>) : rangeStart ? (
            <div style={{padding:'6px 0'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--accent)',animation:'pulse 2s infinite'}}/>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'11px',color:'var(--accent)'}}>{formatDate(rangeStart)}</span>
              </div>
              <p style={{fontSize:'12px',color:'#bbb',fontStyle:'italic',lineHeight:1.5}}>Click another day to complete your selection</p>
            </div>
          ) : (
            <div style={{textAlign:'center',padding:'20px 0 10px',color:'#ccc'}}>
              <div style={{fontSize:'22px',marginBottom:'8px'}}>◻</div>
              <p style={{fontSize:'11px',lineHeight:1.5,fontStyle:'italic'}}>Click two dates to create a range</p>
            </div>
          )}
        </div>
      )}

      {/* Ruled lines decoration */}
      <div style={{marginTop:'14px',display:'flex',flexDirection:'column',gap:'7px'}}>
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{height:'1px',background:'var(--paper-dark)',borderRadius:'1px'}}/>
        ))}
      </div>
    </div>
  )
}
