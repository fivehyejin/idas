'use client'

import Layout from '@/components/Layout'
import { useState, useMemo } from 'react'

interface CheckIn {
  name: string
  veh: string
  plate: string
  time: string
  adv: string
  svc: string
  status: string
  vip?: boolean
  selfci?: boolean
  risk?: boolean
}

const ciList: CheckIn[] = [
  { name: '김민지', veh: '제네시스 G80 2023', plate: '48나2847', time: '09:00', adv: '김민준', svc: '정기점검', status: 'waiting', vip: true, selfci: true },
  { name: '이태양', veh: '현대 아이오닉6', plate: '32다4521', time: '09:30', adv: '이서연', svc: '정기점검', status: 'waiting', vip: false, risk: true },
  { name: '박현우', veh: 'BMW 5-Series', plate: '11바5678', time: '10:00', adv: '박지호', svc: '종합점검', status: 'waiting', vip: true, selfci: true },
  { name: '최아영', veh: '기아 EV6', plate: '12마8844', time: '10:30', adv: '김민준', svc: '브레이크', status: 'done' },
  { name: '정지훈', veh: '제네시스 GV80', plate: '71바3391', time: '11:00', adv: '이서연', svc: '타이어', status: 'waiting', risk: true },
  { name: '한지수', veh: '현대 투싼', plate: '88가1234', time: '11:30', adv: '박지호', svc: '냉각수', status: 'waiting', selfci: true },
]

const advC: Record<string, string> = { '김민준': '#1a3a5c', '이서연': '#16a34a', '박지호': '#9333ea' }

export default function CheckInPage() {
  const [ciFilter, setCiFilter] = useState('waiting')

  const filteredList = useMemo(() => {
    return ciList.filter(c => c.status === ciFilter)
  }, [ciFilter])

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">체크인 처리</div>
            <div className="ph-sub">오늘 도착 대기 · 7건 처리 필요</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm">+ Walk-in 등록</button>
            <button className="btn btn-p btn-sm" onClick={() => toast('체크인 처리 모달')}>
              체크인 처리
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">대기 중</div>
            <div className="kpi-val ca">7</div>
            <div className="kpi-sub">체크인 전</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">체크인 완료</div>
            <div className="kpi-val cg">11</div>
            <div className="kpi-sub">오늘 기준</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">평균 대기</div>
            <div className="kpi-val">8분</div>
            <div className="kpi-sub">목표 10분 이하</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">Self 체크인</div>
            <div className="kpi-val cb">4</div>
            <div className="kpi-sub">Customer Portal</div>
          </div>
        </div>
        <div className="tabs">
          <div className={`tab ${ciFilter === 'waiting' ? 'active' : ''}`} onClick={() => setCiFilter('waiting')}>
            도착 대기 <span className="hint sm">7</span>
          </div>
          <div className={`tab ${ciFilter === 'done' ? 'active' : ''}`} onClick={() => setCiFilter('done')}>
            체크인 완료 <span className="hint sm">11</span>
          </div>
          <div className={`tab ${ciFilter === 'walkin' ? 'active' : ''}`} onClick={() => setCiFilter('walkin')}>
            Walk-in <span className="hint sm">3</span>
          </div>
        </div>
        <div className="ca-area">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {filteredList.map((c, idx) => (
              <div key={idx} className="kc" onClick={() => toast('체크인 모달 열기')}>
                <div className="fca g8 mb12" style={{ justifyContent: 'space-between' }}>
                  <div className="fca g8">
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: advC[c.adv] || '#888', color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="bold">{c.vip ? '⭐ ' : ''}{c.name}</div>
                      <div className="xs sec mt4">{c.plate}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="bold" style={{ fontSize: '16px' }}>{c.time}</div>
                    {c.risk && <div className="tag tr mt4 xs">노쇼위험</div>}
                    {c.selfci && <div className="xs sec mt4">Self CI ✓</div>}
                  </div>
                </div>
                <div className="sm">{c.veh}</div>
                <div className="fca g8 mt8" style={{ justifyContent: 'space-between' }}>
                  <span className="tag tb">{c.svc}</span>
                  <span className="xs sec">{c.adv} SA</span>
                </div>
                {c.status === 'done' ? (
                  <div className="xs cg mt8 bold">✅ 체크인 완료</div>
                ) : (
                  <button className="btn btn-p btn-sm mt8" style={{ width: '100%' }} onClick={(e) => { e.stopPropagation(); toast('체크인 처리 모달') }}>
                    체크인 처리 →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
