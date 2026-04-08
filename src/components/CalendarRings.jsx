export default function CalendarRings() {
  return (
    <div style={{
      position:'absolute', top:'-22px', left:'50%', transform:'translateX(-50%)',
      display:'flex', gap:'17px', zIndex:10, padding:'0 16px',
    }}>
      {Array.from({length:14},(_,i)=>(
        <div key={i} style={{
          display:'flex', flexDirection:'column', alignItems:'center',
          animation:`ringSwing ${3.5+i*0.15}s ease-in-out infinite`,
          animationDelay:`${-i*0.3}s`,
        }}>
          <div style={{
            width:'15px', height:'9px',
            border:'2.5px solid #888', borderBottom:'none',
            borderRadius:'10px 10px 0 0',
            background:'linear-gradient(135deg,#d0d0d0,#999)',
            boxShadow:'inset 0 2px 3px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.25)',
          }}/>
          <div style={{
            width:'15px', height:'9px',
            border:'2.5px solid #777', borderTop:'none',
            borderRadius:'0 0 10px 10px',
            background:'linear-gradient(135deg,#aaa,#888)',
            boxShadow:'0 2px 3px rgba(0,0,0,0.2)',
          }}/>
        </div>
      ))}
    </div>
  )
}
