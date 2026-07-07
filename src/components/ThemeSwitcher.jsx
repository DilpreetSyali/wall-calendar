const SWATCHES = [
  { id:'paper', bg:'#f5f0e8', ac:'#1a6b9e', label:'Paper' },
  { id:'dark',  bg:'#252525', ac:'#4a9fd4', label:'Dark'  },
  { id:'sage',  bg:'#f0f4f0', ac:'#4a7c5a', label:'Sage'  },
  { id:'rose',  bg:'#fdf0f2', ac:'#b04a6a', label:'Rose'  },
]

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div style={{display:'flex',gap:'7px',alignItems:'center'}}>
      {SWATCHES.map(s=>(
        <button
          key={s.id}
          title={s.label}
          aria-label={`${s.label} theme`}
          onClick={()=>setTheme(s.id)}
          style={{
            width:'18px', height:'18px', borderRadius:'50%',
            border: theme===s.id?`2px solid var(--ink,#0d0d0d)`:'2px solid transparent',
            background: `linear-gradient(135deg, ${s.bg} 50%, ${s.ac} 50%)`,
            boxShadow:'0 0 0 1px rgba(0,0,0,0.1)',
            transform: theme===s.id?'scale(1.22)':'scale(1)',
            transition:'transform 0.18s, border-color 0.18s',
            cursor:'pointer',
          }}
        />
      ))}
    </div>
  )
}
