'use client'

import Layout from '@/components/Layout'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface Appointment {
  name: string
  veh: string
  plate: string
  time: string
  adv: string
  svc: string
  status: string
  noshow: number
  vip: boolean
  ch: string
}

const appts: Appointment[] = [
  { name: '김민지', veh: '제네시스 G80', plate: '48나2847', time: '09:00', adv: '김민준', svc: '정기점검+에어컨', status: 'checkedin', noshow: 0.05, vip: true, ch: 'Portal' },
  { name: '이태양', veh: '현대 아이오닉6', plate: '32다4521', time: '09:30', adv: '이서연', svc: '정기점검', status: 'confirmed', noshow: 0.62, vip: false, ch: '전화' },
  { name: '박현우', veh: 'BMW 5-Series', plate: '11바5678', time: '10:00', adv: '박지호', svc: '종합점검', status: 'checkedin', noshow: 0.08, vip: true, ch: 'Portal' },
  { name: '최아영', veh: '기아 EV6', plate: '12마8844', time: '10:30', adv: '김민준', svc: '브레이크 교체', status: 'checkedin', noshow: 0.03, vip: false, ch: '앱' },
  { name: '정지훈', veh: '제네시스 GV80', plate: '71바3391', time: '11:00', adv: '이서연', svc: '타이어 교체', status: 'confirmed', noshow: 0.55, vip: false, ch: '전화' },
  { name: '한지수', veh: '현대 투싼', plate: '88가1234', time: '11:30', adv: '박지호', svc: '냉각수+엔진오일', status: 'pending', noshow: 0.2, vip: false, ch: 'Portal' },
  { name: '윤서준', veh: '현대 아반떼', plate: '55마2233', time: '13:30', adv: '이서연', svc: '에어컨', status: 'confirmed', noshow: 0.15, vip: false, ch: '앱' },
  { name: '강태현', veh: '현대 쏘나타', plate: '91나6677', time: '09:00', adv: '김민준', svc: '정기점검', status: 'checkedin', noshow: 0.1, vip: false, ch: 'Portal' },
]

const sSt: Record<string, string> = { confirmed: 'st-g', pending: 'st-a', checkedin: 'st-b', cancelled: 'st-r', waitlist: 'st-p' }
const sLb: Record<string, string> = { confirmed: '확정', pending: '대기', checkedin: '체크인완료', cancelled: '취소', waitlist: 'Waitlist' }
const advC: Record<string, string> = { '김민준': '#1a3a5c', '이서연': '#16a34a', '박지호': '#9333ea' }

export default function AppointmentPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')
  const [apptFilter, setApptFilter] = useState('all')

  const filteredAppts = useMemo(() => {
    return appts.filter(a => apptFilter === 'all' || a.status === apptFilter)
  }, [apptFilter])

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">예약 관리</div>
            <div className="ph-sub">2025.06.13 (금) · 오늘 예약 24건</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => toast('노쇼 위험 3건 리마인드 발송', 'warn')}>
              ⚠ 리마인드 발송
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('예약 생성 모달')}>
              + 예약 생성
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">오늘 예약</div>
            <div className="kpi-val">24</div>
            <div className="kpi-sub">확정 18 · 대기 6</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">체크인 완료</div>
            <div className="kpi-val cg">11</div>
            <div className="kpi-sub">오늘 기준</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">노쇼 위험</div>
            <div className="kpi-val cr">3</div>
            <div className="kpi-sub">AI 예측 50%↑</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">슬롯 가용률</div>
            <div className="kpi-val ca">68%</div>
            <div className="kpi-sub">오후 슬롯 여유</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">Waitlist</div>
            <div className="kpi-val cb">4</div>
            <div className="kpi-sub">취소 시 자동 알림</div>
          </div>
        </div>
        <div className="tabs">
          <div className={`tab ${apptFilter === 'all' ? 'active' : ''}`} onClick={() => setApptFilter('all')}>
            전체 <span className="hint sm">24</span>
          </div>
          <div className={`tab ${apptFilter === 'confirmed' ? 'active' : ''}`} onClick={() => setApptFilter('confirmed')}>
            확정 <span className="hint sm">18</span>
          </div>
          <div className={`tab ${apptFilter === 'pending' ? 'active' : ''}`} onClick={() => setApptFilter('pending')}>
            대기 <span className="hint sm">6</span>
          </div>
          <div className={`tab ${apptFilter === 'checkedin' ? 'active' : ''}`} onClick={() => setApptFilter('checkedin')}>
            체크인완료 <span className="hint sm">11</span>
          </div>
          <div className={`tab ${apptFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setApptFilter('cancelled')}>
            취소 <span className="hint sm">2</span>
          </div>
        </div>
        <div className="fbar">
          <input type="date" className="fsel" defaultValue="2025-06-13" />
          <select className="fsel">
            <option value="">전체 Advisor</option>
            <option>김민준 SA</option>
            <option>이서연 SA</option>
            <option>박지호 SA</option>
          </select>
          <input type="text" className="finp" placeholder="🔍 고객명 / 차량번호" />
          <button className="btn btn-p btn-sm" onClick={() => toast('검색 완료', 'ok')}>
            검색
          </button>
        </div>
        <div className="ca-area">
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>시간</th>
                  <th>고객 / 차량</th>
                  <th>서비스</th>
                  <th>Advisor</th>
                  <th>채널</th>
                  <th>노쇼위험</th>
                  <th>상태</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppts.map((a, idx) => {
                  const late = a.noshow > 0.5
                  return (
                    <tr key={idx} className="crow" style={{ background: late ? '#fff7ed' : undefined }} onClick={() => toast(a.name + ' 상세 보기')}>
                      <td><span className="bold">{a.time}</span></td>
                      <td>
                        <div className="bold">{a.vip ? '⭐ ' : ''}{a.name}</div>
                        <div className="plate mt4">{a.plate}</div>
                        <div className="xs sec mt4">{a.veh}</div>
                      </td>
                      <td><span className="tag tb">{a.svc}</span></td>
                      <td>
                        <div className="fca g4">
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: advC[a.adv] || '#888', color: '#fff', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {a.adv[0]}
                          </div>
                          {a.adv}
                        </div>
                      </td>
                      <td><span className="xs">{a.ch}</span></td>
                      <td>
                        {a.noshow > 0.5 ? (
                          <span className="st st-r xs">⚠ {Math.round(a.noshow * 100)}%</span>
                        ) : a.noshow > 0.3 ? (
                          <span className="st st-a xs">{Math.round(a.noshow * 100)}%</span>
                        ) : (
                          <span className="hint xs">{Math.round(a.noshow * 100)}%</span>
                        )}
                      </td>
                      <td><span className={`st ${sSt[a.status] || ''}`}>{sLb[a.status] || a.status}</span></td>
                      <td>
                        <div className="ra">
                          <button className="abtn abtn-p" onClick={(e) => { e.stopPropagation(); router.push('/checkin') }}>
                            체크인
                          </button>
                          <button className="abtn" onClick={(e) => { e.stopPropagation(); toast('리마인드 발송', 'ok') }}>
                            리마인드
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
