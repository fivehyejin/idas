'use client'

import Layout from '@/components/Layout'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface RO {
  id: string
  name: string
  veh: string
  plate: string
  svc: string
  adv: string
  intime: string
  eta: string
  amount: number
  status: string
  vip?: boolean
}

const roData: RO[] = [
  { id: 'RO-2025-0613-047', name: '김민지', veh: '제네시스 G80 2023', plate: '48나2847', svc: '정기점검+에어컨소음', adv: '김민준', intime: '09:00', eta: '13:00', amount: 358000, status: 'inprogress', vip: true },
  { id: 'RO-2025-0613-046', name: '박현우', veh: 'BMW 5-Series 2022', plate: '11바5678', svc: '종합점검+타이어', adv: '박지호', intime: '10:00', eta: '14:30', amount: 580000, status: 'inprogress', vip: true },
  { id: 'RO-2025-0613-045', name: '최아영', veh: '기아 EV6 2023', plate: '12마8844', svc: '브레이크 패드 교체', adv: '김민준', intime: '10:30', eta: '12:00', amount: 352000, status: 'completed', vip: false },
  { id: 'RO-2025-0613-044', name: '이태양', veh: '현대 아이오닉6', plate: '32다4521', svc: '정기점검', adv: '이서연', intime: '09:30', eta: '11:30', amount: 178000, status: 'paid', vip: false },
  { id: 'RO-2025-0613-043', name: '정지훈', veh: '제네시스 GV80', plate: '71바3391', svc: '타이어 교체 4개', adv: '이서연', intime: '11:00', eta: '13:30', amount: 720000, status: 'waiting', vip: false },
  { id: 'RO-2025-0613-042', name: '한지수', veh: '현대 투싼 2022', plate: '88가1234', svc: '냉각수+엔진오일', adv: '박지호', intime: '11:30', eta: '15:00', amount: 263000, status: 'inprogress', vip: false },
]

const roSC: Record<string, string> = { inprogress: 'st-a', waiting: 'st-p', completed: 'st-g', paid: 'st-g' }
const roSL: Record<string, string> = { inprogress: '진행 중', waiting: '승인 대기', completed: '작업 완료', paid: '수납 완료' }

export default function ROListPage() {
  const router = useRouter()
  const [roFilter, setRoFilter] = useState('all')

  const filteredROs = useMemo(() => {
    return roData.filter(r => roFilter === 'all' || r.status === roFilter)
  }, [roFilter])

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">RO 관리</div>
            <div className="ph-sub">정비 작업 지시서 목록 · 2025.06.13</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => toast('엑셀 내보내기', 'ok')}>
              ⬇ 내보내기
            </button>
            <button className="btn btn-p btn-sm" onClick={() => router.push('/checkin')}>
              + RO 생성 (체크인)
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">오늘 RO</div>
            <div className="kpi-val">18</div>
            <div className="kpi-sub">진행 중 8건</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">작업 완료</div>
            <div className="kpi-val cg">6</div>
            <div className="kpi-sub">수납 대기 2건</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">고객 승인 대기</div>
            <div className="kpi-val ca">3</div>
            <div className="kpi-sub">원격 승인 포함</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">지연 위험</div>
            <div className="kpi-val cr">2</div>
            <div className="kpi-sub">예정 초과 임박</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">오늘 매출</div>
            <div className="kpi-val cb">₩4.2M</div>
            <div className="kpi-sub">완료 기준</div>
          </div>
        </div>
        <div className="tabs">
          <div className={`tab ${roFilter === 'all' ? 'active' : ''}`} onClick={() => setRoFilter('all')}>
            전체 <span className="hint sm">18</span>
          </div>
          <div className={`tab ${roFilter === 'inprogress' ? 'active' : ''}`} onClick={() => setRoFilter('inprogress')}>
            진행 중 <span className="hint sm">8</span>
          </div>
          <div className={`tab ${roFilter === 'waiting' ? 'active' : ''}`} onClick={() => setRoFilter('waiting')}>
            승인 대기 <span className="hint sm">3</span>
          </div>
          <div className={`tab ${roFilter === 'completed' ? 'active' : ''}`} onClick={() => setRoFilter('completed')}>
            완료 <span className="hint sm">6</span>
          </div>
          <div className={`tab ${roFilter === 'paid' ? 'active' : ''}`} onClick={() => setRoFilter('paid')}>
            수납 완료 <span className="hint sm">4</span>
          </div>
        </div>
        <div className="fbar">
          <input type="date" className="fsel" defaultValue="2025-06-13" />
          <select className="fsel">
            <option>전체 Advisor</option>
            <option>김민준 SA</option>
            <option>이서연 SA</option>
            <option>박지호 SA</option>
          </select>
          <input type="text" className="finp" placeholder="🔍 고객명 / 차량번호 / RO번호" />
          <button className="btn btn-p btn-sm">검색</button>
        </div>
        <div className="ca-area">
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>RO번호</th>
                  <th>고객 / 차량</th>
                  <th>서비스</th>
                  <th>Advisor</th>
                  <th>입고</th>
                  <th>예상완료</th>
                  <th>금액</th>
                  <th>상태</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {filteredROs.map((r, idx) => (
                  <tr key={idx} className="crow" onClick={() => toast('RO 상세 보기')}>
                    <td className="bold">{r.id}</td>
                    <td>
                      <div className="bold">{r.vip ? '⭐ ' : ''}{r.name}</div>
                      <div className="plate mt4">{r.plate}</div>
                      <div className="xs sec mt4">{r.veh}</div>
                    </td>
                    <td><span className="tag tb">{r.svc}</span></td>
                    <td>{r.adv}</td>
                    <td>{r.intime}</td>
                    <td>{r.eta}</td>
                    <td className="bold">₩{r.amount.toLocaleString()}</td>
                    <td><span className={`st ${roSC[r.status] || ''}`}>{roSL[r.status] || r.status}</span></td>
                    <td>
                      <div className="ra">
                        <button className="abtn abtn-p" onClick={(e) => { e.stopPropagation(); toast('RO 열기') }}>
                          열기
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
