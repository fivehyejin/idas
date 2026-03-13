'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    if (path === '/appointment') return pathname === '/appointment'
    if (path === '/ro_list') return pathname?.startsWith('/ro')
    return pathname === path
  }

  return (
    <nav className="sidenav">
      <div className="nav-sec">
        <div className={`nav-item ${isActive('/appointment') ? 'active' : ''}`} onClick={() => router.push('/appointment')}>
          <span className="ico">📅</span>예약<span className="nbadge">24</span>
        </div>
        <div className={`nav-item ${isActive('/checkin') ? 'active' : ''}`} onClick={() => router.push('/checkin')}>
          <span className="ico">✅</span>체크인<span className="nbadge">7</span>
        </div>
        <div className={`nav-item ${isActive('/customer') ? 'active' : ''}`} onClick={() => router.push('/customer')}>
          <span className="ico">👤</span>고객/차량
        </div>
      </div>
      <div className="nav-sec">
        <div className="nav-lbl">정비</div>
        <div className={`nav-item ${isActive('/ro_list') ? 'active' : ''}`} onClick={() => router.push('/ro_list')}>
          <span className="ico">📋</span>RO 관리
        </div>
        <div className={`nav-item ${isActive('/vhc') ? 'active' : ''}`} onClick={() => router.push('/vhc')}>
          <span className="ico">🔍</span>VHC 점검
        </div>
        <div className={`nav-item ${isActive('/job') ? 'active' : ''}`} onClick={() => router.push('/job')}>
          <span className="ico">🔧</span>Job 관리<span className="nbadge" style={{ background: 'var(--red)' }}>2</span>
        </div>
        <div className={`nav-item ${isActive('/parts') ? 'active' : ''}`} onClick={() => router.push('/parts')}>
          <span className="ico">📦</span>부품 관리
        </div>
      </div>
      <div className="nav-sec">
        <div className="nav-lbl">수납/출고</div>
        <div className={`nav-item ${isActive('/payment') ? 'active' : ''}`} onClick={() => router.push('/payment')}>
          <span className="ico">💰</span>수납
        </div>
        <div className={`nav-item ${isActive('/delivery') ? 'active' : ''}`} onClick={() => router.push('/delivery')}>
          <span className="ico">🚗</span>출고
        </div>
      </div>
      <div className="nav-sec">
        <div className={`nav-item ${isActive('/survey') ? 'active' : ''}`} onClick={() => router.push('/survey')}>
          <span className="ico">⭐</span>후속 관리
        </div>
        <div className={`nav-item ${isActive('/kpi') ? 'active' : ''}`} onClick={() => router.push('/kpi')}>
          <span className="ico">📊</span>KPI
        </div>
      </div>
    </nav>
  )
}
