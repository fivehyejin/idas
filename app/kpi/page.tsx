'use client'

import Layout from '@/components/Layout'

export default function KPIPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">KPI 대시보드</div>
            <div className="ph-sub">서울 강남 직영점 · 2025년 6월</div>
          </div>
          <div className="ph-right">
            <select className="fsel">
              <option>이번 달</option>
              <option>지난 달</option>
              <option>이번 분기</option>
            </select>
            <button className="btn btn-o btn-sm" onClick={() => toast('리포트 PDF 생성', 'ok')}>
              📄 리포트
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('AI 인사이트 생성 중...', 'warn')}>
              🤖 AI 인사이트
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">RO 건수</div>
            <div className="kpi-val">384</div>
            <div className="kpi-sub ca">▲ 12% vs 전월</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">총 매출</div>
            <div className="kpi-val cg">₩1.2억</div>
            <div className="kpi-sub ca">▲ 8%</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">RO당 단가</div>
            <div className="kpi-val">₩312K</div>
            <div className="kpi-sub ca">▲ 3%</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">CSI 평점</div>
            <div className="kpi-val ca">4.6★</div>
            <div className="kpi-sub cr">▼ 0.1</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">노쇼율</div>
            <div className="kpi-val cr">4.2%</div>
            <div className="kpi-sub cr">▲ 0.8%p 악화</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">사이클타임</div>
            <div className="kpi-val">2.4h</div>
            <div className="kpi-sub cr">목표 2.0h 미달</div>
          </div>
        </div>
        <div className="ca-area">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="card">
              <div className="card-title">서비스별 매출 비중</div>
              <div className="sb-bar">
                <div className="sb-row">
                  <span className="sb-lbl">정기점검</span>
                  <div className="sb-trk">
                    <div className="sb-fill" style={{ background: 'var(--pl)', width: '72%' }}>72%</div>
                  </div>
                  <span className="sb-val">₩4,320만</span>
                </div>
                <div className="sb-row">
                  <span className="sb-lbl">수리</span>
                  <div className="sb-trk">
                    <div className="sb-fill" style={{ background: 'var(--blue)', width: '55%' }}>55%</div>
                  </div>
                  <span className="sb-val">₩3,280만</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Advisor 성과 순위</div>
              <div className="vhc-row">
                <span style={{ width: '20px', textAlign: 'center', fontWeight: 800, color: '#f59e0b' }}>1</span>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1a3a5c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, margin: '0 8px' }}>김</div>
                <span style={{ flex: 1, fontWeight: 600 }}>김민준 SA</span>
                <span className="tag tg">₩4,280만</span>
                <span className="xs sec" style={{ marginLeft: '8px' }}>CSI 4.8★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
