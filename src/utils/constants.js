export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

export const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export const MONTH_IMAGES = [
  { url:'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=900&auto=format&fit=crop', credit:'Winter Peaks',    palette:{ accent:'#1a6b9e' } },
  { url:'https://images.unsplash.com/photo-1490750967868-88df5691cc8e?w=900&auto=format&fit=crop', credit:'Spring Bloom',    palette:{ accent:'#9b4f8e' } },
  { url:'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=900&auto=format&fit=crop', credit:'Forest Light',    palette:{ accent:'#2d6a4f' } },
  { url:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&auto=format&fit=crop', credit:'Deep Woods',     palette:{ accent:'#1b5e3b' } },
  { url:'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900&auto=format&fit=crop', credit:'Golden Hour',    palette:{ accent:'#c07a1f' } },
  { url:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop', credit:'Summer Heights', palette:{ accent:'#2563a8' } },
  { url:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&auto=format&fit=crop', credit:'Rocky Coast',    palette:{ accent:'#2d6a90' } },
  { url:'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&auto=format&fit=crop', credit:'Late Summer',    palette:{ accent:'#7b4f1a' } },
  { url:'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&auto=format&fit=crop', credit:'Autumn Roads',   palette:{ accent:'#8b4513' } },
  { url:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop', credit:'Misty Morning',  palette:{ accent:'#5a7a6e' } },
  { url:'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&auto=format&fit=crop', credit:'First Frost',    palette:{ accent:'#3d6475' } },
  { url:'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=900&auto=format&fit=crop', credit:'Winter Silence', palette:{ accent:'#2a5580' } },
]

export const HOLIDAYS = {
  '1-1':'New Year\'s Day','2-14':'Valentine\'s Day','3-8':'Women\'s Day',
  '3-17':'St. Patrick\'s Day','4-1':'April Fool\'s Day','4-22':'Earth Day',
  '5-1':'Labour Day','6-21':'Summer Solstice','7-4':'Independence Day',
  '9-22':'Autumn Equinox','10-31':'Halloween','11-11':'Veterans Day',
  '12-24':'Christmas Eve','12-25':'Christmas Day','12-31':'New Year\'s Eve',
}

export const THEMES = {
  paper: { '--paper':'#f5f0e8','--paper-dark':'#ede7d9','--cream':'#faf7f2','--ink':'#0d0d0d','--accent-pale':'#d4eaf7' },
  dark:  { '--paper':'#252525','--paper-dark':'#1a1a1a','--cream':'#2e2e2e','--ink':'#e8e0d0','--accent-pale':'#1a3545' },
  sage:  { '--paper':'#f0f4f0','--paper-dark':'#e4ebe4','--cream':'#f6f9f6','--ink':'#1a2a1a','--accent-pale':'#d4e8da', '--accent':'#4a7c5a','--accent-light':'#6a9c7a' },
  rose:  { '--paper':'#fdf0f2','--paper-dark':'#f5e0e4','--cream':'#fff5f7','--ink':'#2a1218','--accent-pale':'#f5d4de', '--accent':'#b04a6a','--accent-light':'#d06a8a' },
}

export const formatDate = d =>
  d ? d.toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' }) : ''

export const getDaysBetween = (a, b) =>
  (!a || !b) ? 0 : Math.abs(Math.floor((b - a) / 86400000)) + 1
