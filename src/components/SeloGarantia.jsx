/**
 * Selo de garantia em SVG.
 * Vetorial de propósito: fica nítido em qualquer densidade de tela,
 * pesa poucos KB e acompanha as cores da marca.
 */

// Borda serrilhada: pequenos círculos distribuídos na circunferência.
const BUMPS = Array.from({ length: 28 }, (_, i) => {
  const ang = (i / 28) * Math.PI * 2
  return { x: 100 + Math.cos(ang) * 84, y: 100 + Math.sin(ang) * 84 }
})

export default function SeloGarantia({ size = 169, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Selo de 7 dias de garantia com reembolso integral"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id="selo-fundo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a7bc8" />
          <stop offset="100%" stopColor="#1a4d85" />
        </linearGradient>
        <path id="selo-arco-topo" d="M 38,100 A 62,62 0 0 1 162,100" fill="none" />
        <path id="selo-arco-base" d="M 30,100 A 70,70 0 0 0 170,100" fill="none" />
      </defs>

      {BUMPS.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="9" fill="url(#selo-fundo)" />
      ))}
      <circle cx="100" cy="100" r="86" fill="url(#selo-fundo)" />

      <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="2" opacity="0.85" />

      <text fill="#fff" fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1.2">
        <textPath href="#selo-arco-topo" startOffset="50%" textAnchor="middle">
          SATISFAÇÃO GARANTIDA
        </textPath>
      </text>

      <text
        x="100"
        y="104"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Montserrat, sans-serif"
        fontSize="58"
        fontWeight="700"
      >
        7
      </text>
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Montserrat, sans-serif"
        fontSize="19"
        fontWeight="600"
        letterSpacing="3"
      >
        DIAS
      </text>

      <text fill="#fff" fontFamily="Montserrat, sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.4" opacity="0.92">
        <textPath href="#selo-arco-base" startOffset="50%" textAnchor="middle">
          REEMBOLSO INTEGRAL
        </textPath>
      </text>
    </svg>
  )
}
