'use client'

import { useState, useMemo } from 'react'

const SLOT_TIMES = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
const SLOT_AVAIL = ['ok', 'ok', 'few', 'ok', 'busy', 'ok', 'few', 'ok', 'ok', 'busy', 'ok', 'ok', 'few', 'ok'] as const

const SERVICES = [
  { id: 0, label: '🔧 정기점검', min: 60, price: 85000 },
  { id: 1, label: '🛞 타이어 교체', min: 60, price: 180000 },
  { id: 2, label: '🛑 브레이크 패드', min: 90, price: 180000 },
  { id: 3, label: '❄ 에어컨 점검', min: 30, price: 30000 },
  { id: 4, label: '🔍 종합점검', min: 120, price: 150000 },
  { id: 5, label: '⚡ 배터리 점검', min: 20, price: 15000 },
  { id: 6, label: '🔔 리콜 캠페인', min: 45, price: 0, sub: '무상' },
  { id: 7, label: '➕ 기타 직접 입력', min: 60, price: 0 },
]

const CHANNELS = [
  { key: 'portal', label: '🌐 Customer Portal' },
  { key: 'app', label: '📱 모바일 앱' },
  { key: 'call', label: '📞 콜센터' },
  { key: 'chat', label: '🤖 챗봇' },
  { key: 'walk', label: '🏢 방문 직접' },
]

const ADVISORS = [
  { id: 'kim', name: '김민준 SA', initial: '김', color: '#1a3a5c', csi: '4.8★', tag: '이전 담당' },
  { id: 'lee', name: '이서연 SA', initial: '이', color: '#16a34a', csi: '4.9★', tag: '가용 ✅' },
  { id: 'park', name: '박지호 SA', initial: '박', color: '#9333ea', csi: '4.5★', tag: '가용 ✅' },
]

interface ApptModalProps {
  open: boolean
  onClose: () => void
  onCreated?: () => void
}

export default function ApptModal({ open, onClose, onCreated }: ApptModalProps) {
  const [channel, setChannel] = useState('portal')
  const [selSlot, setSelSlot] = useState('09:00')
  const [selAdvisor, setSelAdvisor] = useState('kim')
  const [date, setDate] = useState('2025-06-20')
  const [customerQuery, setCustomerQuery] = useState('김민지')
  const [vehicle, setVehicle] = useState('제네시스 G80 2023 · 48나2847 (주차량)')
  const [serviceChecked, setServiceChecked] = useState<Record<number, boolean>>({ 0: true })
  const [memo, setMemo] = useState('')
  const [optLoaner, setOptLoaner] = useState(true)
  const [optPickup, setOptPickup] = useState(false)
  const [optSms, setOptSms] = useState(true)
  const [optRecall, setOptRecall] = useState(true)

  const { totalMin, totalPrice } = useMemo(() => {
    let mins = 0
    let price = 0
    SERVICES.forEach((s, i) => {
      if (serviceChecked[i]) {
        mins += s.min
        price += s.price
      }
    })
    return { totalMin: mins || 60, totalPrice: price }
  }, [serviceChecked])

  const toggleService = (id: number) => {
    setServiceChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const pickSlot = (t: string, av: string) => {
    if (av === 'busy') return
    setSelSlot(t)
  }

  const handleCreate = () => {
    const no = 'APT-2025-' + date.replace(/-/g, '').slice(0, 4) + '-' + (Math.floor(Math.random() * 900) + 100)
    onClose()
    onCreated?.()
    if (typeof window !== 'undefined' && (window as unknown as { toast?: (a: string, b?: string) => void }).toast) {
      ;(window as unknown as { toast: (a: string, b?: string) => void }).toast('예약 확정! ' + no + ' — 고객 SMS · SA 알림 발송 완료', 'ok')
    }
  }

  if (!open) return null

  return (
    <div
      className="modal-bg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" style={{ maxWidth: 780 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-hdr">
          <div className="modal-title">예약 생성</div>
          <button type="button" className="modal-x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ maxHeight: '82vh' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* 왼쪽: 채널 / 고객 / 차량 / 서비스 */}
            <div>
              <div className="fsec">
                <div className="fsec-title">예약 채널</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {CHANNELS.map((ch) => (
                    <div
                      key={ch.key}
                      className={`appt-ch ${channel === ch.key ? 'on' : ''}`}
                      onClick={() => setChannel(ch.key)}
                    >
                      {ch.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fsec">
                <div className="fsec-title">고객 정보</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input
                    type="text"
                    className="finput"
                    placeholder="고객명 / 전화번호"
                    value={customerQuery}
                    onChange={(e) => setCustomerQuery(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-p btn-sm" onClick={() => (typeof window !== 'undefined' && (window as unknown as { toast?: (a: string, b?: string) => void }).toast?.('고객 조회 완료', 'ok'))}>
                    조회
                  </button>
                </div>
                <div style={{ border: '1px solid var(--green)', borderRadius: 'var(--r)', padding: '10px 12px', background: 'var(--gbg)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>김</div>
                  <div style={{ flex: 1 }}>
                    <div className="bold fca g8">⭐ 김민지 <span className="tag tg" style={{ fontSize: 10 }}>VIP</span></div>
                    <div className="xs sec mt4">010-1234-5678 · 총 12회 방문 · CSI 4.9★</div>
                  </div>
                  <button type="button" className="btn btn-o btn-xs" style={{ marginLeft: 'auto' }} onClick={() => (typeof window !== 'undefined' && (window as unknown as { toast?: (a: string, b?: string) => void }).toast?.('신규 고객 등록'))}>+ 신규</button>
                </div>
              </div>
              <div className="fsec">
                <div className="fsec-title">차량 정보</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <select className="fsel2" style={{ flex: 1 }} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    <option>제네시스 G80 2023 · 48나2847 (주차량)</option>
                    <option>현대 아반떼 2020 · 33라1122</option>
                  </select>
                  <button type="button" className="btn btn-o btn-sm" onClick={() => (typeof window !== 'undefined' && (window as unknown as { toast?: (a: string, b?: string) => void }).toast?.('OCR 스캔 준비 중', 'warn'))}>📷 OCR</button>
                </div>
                <div style={{ background: 'var(--sur2)', borderRadius: 'var(--r)', padding: '8px 12px', fontSize: 12, color: 'var(--ts)' }}>
                  주행거리 47,832 km · 최근 방문 2025.03.15 · 다음 점검 <span className="ca bold">2025.09 예정</span>
                </div>
              </div>
              <div className="fsec">
                <div className="fsec-title">서비스 선택 <span className="hint" style={{ fontWeight: 400 }}>(복수 선택 가능)</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
                  {SERVICES.map((s) => (
                    <label key={s.id} className="appt-svc">
                      <input
                        type="checkbox"
                        checked={!!serviceChecked[s.id]}
                        onChange={() => toggleService(s.id)}
                      />
                      <span>
                        {s.label} <span className="hint xs">{s.min}분{s.sub ? ` · ${s.sub}` : ''}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <textarea
                  className="ftxt"
                  rows={2}
                  placeholder="증상 / 추가 요청 (예: 에어컨 켜면 소음, 브레이크 떨림 등)"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
                <div className="ai mt8">
                  <div className="ai-ico">🤖</div>
                  <div>
                    <div className="ai-title">AI 추천</div>
                    <div className="ai-body">브레이크 패드 교체 시기 도래 · 에어필터 권장 — 추가 시 +₩243,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 날짜·시간 / SA / 옵션 / 요약 */}
            <div>
              <div className="fsec">
                <div className="fsec-title">날짜 · 시간</div>
                <input type="date" className="finput" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: 10 }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
                  {SLOT_TIMES.map((t, i) => {
                    const av = SLOT_AVAIL[i]
                    const cls = ['aslot', av === 'busy' ? 'busy' : '', av === 'few' ? 'few' : '', t === selSlot && av !== 'busy' ? 'on' : ''].filter(Boolean).join(' ')
                    const sub = av === 'busy' ? '마감' : av === 'few' ? '임박' : '여유'
                    return (
                      <div
                        key={t}
                        className={cls}
                        onClick={() => pickSlot(t, av)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && pickSlot(t, av)}
                      >
                        {t}
                        <div className="aslot-sub">{sub}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="fca g8 mt6" style={{ flexWrap: 'wrap', gap: 5 }}>
                  <span className="fca g4 xs hint"><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--pl)', display: 'inline-block' }} />선택</span>
                  <span className="fca g4 xs hint"><span style={{ width: 8, height: 8, borderRadius: 2, border: '1px solid var(--amber)', display: 'inline-block' }} />마감임박</span>
                  <span className="fca g4 xs hint"><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--sur2)', border: '1px solid var(--brd)', display: 'inline-block' }} />마감</span>
                </div>
              </div>
              <div className="fsec">
                <div className="fsec-title">담당 Advisor <span className="hint" style={{ fontWeight: 400 }}>(AI 자동 매칭 · 변경 가능)</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {ADVISORS.map((a) => (
                    <div
                      key={a.id}
                      className={`appt-sa ${selAdvisor === a.id ? 'on' : ''}`}
                      onClick={() => setSelAdvisor(a.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: a.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 5px' }}>{a.initial}</div>
                      <div className="bold xs">{a.name}</div>
                      <div className="xs hint">{a.csi}</div>
                      <div className="tag tg mt4" style={{ fontSize: 9 }}>{a.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fsec">
                <div className="fsec-title">추가 옵션</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="appt-opt">
                    <input type="checkbox" checked={optLoaner} onChange={(e) => setOptLoaner(e.target.checked)} />
                    <div>
                      <div className="bold sm">🚙 대차 서비스</div>
                      <div className="xs sec">잔여 3대 · 4시간 이상 수리 우선</div>
                    </div>
                  </label>
                  <label className="appt-opt">
                    <input type="checkbox" checked={optPickup} onChange={(e) => setOptPickup(e.target.checked)} />
                    <div>
                      <div className="bold sm">🚕 픽업 / 딜리버리</div>
                      <div className="xs sec">Lyft 연동 · 20km 이내 · 대차와 중복 불가</div>
                    </div>
                  </label>
                  <label className="appt-opt">
                    <input type="checkbox" checked={optSms} onChange={(e) => setOptSms(e.target.checked)} />
                    <div>
                      <div className="bold sm">💬 SMS 알림</div>
                      <div className="xs sec">예약 확정 · 전날 리마인드 · 완료 알림</div>
                    </div>
                  </label>
                  <label className="appt-opt">
                    <input type="checkbox" checked={optRecall} onChange={(e) => setOptRecall(e.target.checked)} />
                    <div>
                      <div className="bold sm">🔔 오픈 리콜 자동 조회</div>
                      <div className="xs sec"><span className="cr bold">1건 감지</span> — 방문 시 병행 처리 권장</div>
                    </div>
                  </label>
                </div>
              </div>
              <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: 'var(--rl)', padding: '14px 16px' }}>
                <div className="fca g8" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, opacity: 0.8 }}>예상 소요</span>
                  <span className="bold">{totalMin}분</span>
                </div>
                <div className="fca g8" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, opacity: 0.8 }}>예상 금액</span>
                  <span className="bold">{totalPrice ? `₩${totalPrice.toLocaleString()}~` : '견적 후 확정'}</span>
                </div>
                <div className="fca g8" style={{ justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, opacity: 0.8 }}>선택 일시</span>
                  <span className="bold">{date} {selSlot}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="btn btn-o" onClick={onClose}>취소</button>
          <button type="button" className="btn btn-g" onClick={handleCreate}>✅ 예약 확정</button>
        </div>
      </div>
    </div>
  )
}
