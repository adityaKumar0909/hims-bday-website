const INK = '#4a0d22'
const FUR = '#fff8f9'
const PINK = '#ff9bb3'
const CANDLES = [
  { x: 168, color: '#d9143f' },
  { x: 189, color: '#ffffff' },
  { x: 210, color: '#ff7b9c' },
  { x: 231, color: '#ffffff' },
  { x: 252, color: '#d9143f' },
]

// Draw the same shapes twice (thick outline, then fill) so overlapping blobs look like one outlined shape.
function Blob({ fill, width = 8, children }) {
  return (
    <>
      <g stroke={INK} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" fill={INK}>{children}</g>
      <g fill={fill} stroke="none">{children}</g>
    </>
  )
}

export default function CatCake({ out = false, happy = false, className, style }) {
  const drips1 = (
    <>
      <rect x="125" y="332" width="170" height="14" rx="6" />
      {[140, 172, 207, 246, 279].map((x, i) => (
        <ellipse key={x} cx={x} cy={346} rx="8" ry={[14, 10, 16, 11, 14][i]} />
      ))}
    </>
  )
  const drips2 = (
    <>
      <rect x="150" y="286" width="120" height="14" rx="6" />
      {[166, 197, 226, 254].map((x, i) => (
        <ellipse key={x} cx={x} cy={300} rx="7.5" ry={[11, 15, 10, 13][i]} />
      ))}
    </>
  )

  return (
    <svg viewBox="0 0 420 480" className={className} style={style} role="img" aria-label="A cat holding a birthday cake with candles">
      <defs>
        <radialGradient id="cc-glow">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="breathe">
        {/* tail */}
        <path d="M300 440 C 380 452, 412 380, 382 330" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
        <path d="M300 440 C 380 452, 412 380, 382 330" fill="none" stroke={FUR} strokeWidth="17" strokeLinecap="round" />

        {/* body */}
        <ellipse cx="210" cy="340" rx="108" ry="140" fill={FUR} stroke={INK} strokeWidth="4" />

        {/* ears */}
        <path d="M142 98 L134 48 L190 75 Z" fill={FUR} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M278 98 L286 48 L230 75 Z" fill={FUR} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M150 90 L145 63 L176 78 Z" fill={PINK} />
        <path d="M270 90 L275 63 L244 78 Z" fill={PINK} />

        {/* head */}
        <ellipse cx="210" cy="140" rx="82" ry="70" fill={FUR} stroke={INK} strokeWidth="4" />

        {/* party hat */}
        <path d="M180 78 L212 8 L242 80 Z" fill="#d9143f" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="205" cy="52" r="4" fill="#ffd3de" />
        <circle cx="222" cy="40" r="4" fill="#ffd3de" />
        <circle cx="218" cy="64" r="4" fill="#ffd3de" />
        <circle cx="212" cy="8" r="9" fill="#ff7b9c" stroke={INK} strokeWidth="3.5" />

        {/* face */}
        <ellipse cx="152" cy="160" rx="15" ry="9" fill={PINK} opacity="0.6" />
        <ellipse cx="268" cy="160" rx="15" ry="9" fill={PINK} opacity="0.6" />
        {happy ? (
          <g fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round">
            <path d="M164 148 Q 176 130 188 148" />
            <path d="M232 148 Q 244 130 256 148" />
          </g>
        ) : (
          <>
            <g className="blink"><ellipse cx="176" cy="142" rx="8.5" ry="11" fill={INK} /><circle cx="179" cy="137" r="3.2" fill="#fff" /></g>
            <g className="blink"><ellipse cx="244" cy="142" rx="8.5" ry="11" fill={INK} /><circle cx="247" cy="137" r="3.2" fill="#fff" /></g>
          </>
        )}
        <path d="M203 154 Q 210 151 217 154 Q 214 162 210 163 Q 206 162 203 154 Z" fill="#ff6f91" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        {happy ? (
          <path d="M194 166 Q 210 192 226 166 Z" fill="#ff6f91" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        ) : (
          <path d="M210 163 L210 170 M210 170 Q 200 180 191 171 M210 170 Q 220 180 229 171" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        )}
        <g stroke={INK} strokeWidth="2.8" strokeLinecap="round">
          <path d="M148 158 L106 150" /><path d="M148 165 L104 168" /><path d="M150 172 L110 184" />
          <path d="M272 158 L314 150" /><path d="M272 165 L316 168" /><path d="M270 172 L310 184" />
        </g>

        {/* arms */}
        <path d="M108 322 C 80 340, 80 376, 98 390" fill="none" stroke={INK} strokeWidth="32" strokeLinecap="round" />
        <path d="M108 322 C 80 340, 80 376, 98 390" fill="none" stroke={FUR} strokeWidth="24" strokeLinecap="round" />
        <path d="M312 322 C 340 340, 340 376, 322 390" fill="none" stroke={INK} strokeWidth="32" strokeLinecap="round" />
        <path d="M312 322 C 340 340, 340 376, 322 390" fill="none" stroke={FUR} strokeWidth="24" strokeLinecap="round" />

        {/* plate */}
        <ellipse cx="210" cy="395" rx="122" ry="13" fill="#ffe8ed" stroke={INK} strokeWidth="4" />

        {/* cake: bottom tier */}
        <rect x="125" y="338" width="170" height="54" rx="9" fill="#ff8fab" stroke={INK} strokeWidth="4" />
        <text x="210" y="380" textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize="22" fill="#fff">cheeku</text>
        <Blob fill="#fff8f9">{drips1}</Blob>
        {/* cake: top tier */}
        <rect x="150" y="292" width="120" height="48" rx="8" fill="#ffb3c6" stroke={INK} strokeWidth="4" />
        <Blob fill="#fff8f9">{drips2}</Blob>
        <g fill="#d9143f"><rect x="170" y="318" width="6" height="3" rx="1.5" transform="rotate(-20 173 319)" /><rect x="205" y="322" width="6" height="3" rx="1.5" transform="rotate(25 208 323)" /><rect x="240" y="316" width="6" height="3" rx="1.5" transform="rotate(-35 243 317)" /></g>

        {/* candles + flames */}
        {CANDLES.map((c, i) => (
          <g key={c.x} transform={`translate(${c.x} 0)`}>
            <rect x="-3.5" y="258" width="7" height="32" rx="2" fill={c.color} stroke={INK} strokeWidth="2.5" />
            <path d="M0 258 L0 254" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(0 254)">
              <g className="flame-wrap" style={{ transitionDelay: '0s' }}>
                <g className={out ? 'flame flame-out' : 'flame'} style={{ transitionDelay: `${i * 90}ms` }}>
                  <circle cx="0" cy="-12" r="24" fill="url(#cc-glow)" />
                  <path d="M0 0 C -8 -7, -7 -17, 0 -28 C 7 -17, 8 -7, 0 0 Z" fill="#ff8a3d" />
                  <path d="M0 -1 C -4 -5, -3.5 -11, 0 -17 C 3.5 -11, 4 -5, 0 -1 Z" fill="#ffe27a" />
                </g>
              </g>
              {out && (
                <path
                  className="smoke"
                  d="M0 -4 q -6 -9 0 -16 q 6 -7 0 -15"
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ animationDelay: `${i * 90 + 120}ms`, opacity: 0 }}
                />
              )}
            </g>
          </g>
        ))}

        {/* paws on top of plate */}
        {[98, 322].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="392" rx="20" ry="15" fill={FUR} stroke={INK} strokeWidth="4" />
            <path d={`M${x - 5} 395 l0 6 M${x + 5} 395 l0 6`} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}
      </g>
    </svg>
  )
}
