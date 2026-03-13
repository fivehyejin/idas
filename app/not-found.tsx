import Link from 'next/link'
import '../styles/globals.css'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg, #f4f5f7)',
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: 'var(--primary, #1a3a5c)' }}>
        404
      </h1>
      <p style={{ color: 'var(--ts, #5a6478)', marginBottom: '1.5rem' }}>
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--primary, #1a3a5c)',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        홈으로 이동
      </Link>
    </div>
  )
}
