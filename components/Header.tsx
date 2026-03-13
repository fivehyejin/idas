'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const [plusOpen, setPlusOpen] = useState(false)

  useEffect(() => {
    const handleClick = () => setPlusOpen(false)
    if (plusOpen) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [plusOpen])

  return (
    <header className="hdr">
      <div className="hdr-logo" onClick={() => router.push('/appointment')}>
        ID<span>AS</span>
      </div>
      <div className="hdr-search" onClick={() => toast('전역 검색 — Ctrl+K')}>
        <span>🔍</span>
        <span>고객명, 차량번호, 전화번호 검색...</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px', opacity: 0.5 }}>⌘K</span>
      </div>
      <div className="hdr-right">
        <div className="plus-wrap">
          <button className="plus-btn" onClick={(e) => { e.stopPropagation(); setPlusOpen(!plusOpen) }}>
            + &nbsp;▾
          </button>
          <div className={`plus-dd ${plusOpen ? 'open' : ''}`}>
            <div className="plus-dd-item" onClick={() => { setPlusOpen(false); router.push('/appointment') }}>
              📅 예약 생성
            </div>
            <div className="plus-dd-item" onClick={() => { setPlusOpen(false); router.push('/checkin') }}>
              ✅ 체크인 처리
            </div>
            <div className="plus-dd-item" onClick={() => { setPlusOpen(false); toast('OCR 스캔 준비 중', 'warn') }}>
              📷 OCR 스캔
            </div>
          </div>
        </div>
        <div className="hdr-icon" onClick={() => toast('노쇼 위험 2건, 부품 지연 1건', 'warn')}>
          🔔<span className="badge">3</span>
        </div>
        <div className="hdr-icon">📋</div>
        <div className="uavatar">SA</div>
      </div>
    </header>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
