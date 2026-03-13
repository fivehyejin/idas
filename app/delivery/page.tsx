'use client'

import Layout from '@/components/Layout'

export default function DeliveryPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">출고</div>
            <div className="ph-sub">차량 인도 처리 · 2025.06.13</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-p btn-sm" onClick={() => toast('출고 처리 모달')}>
              출고 처리
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">출고 대기</div>
            <div className="kpi-val ca">4</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">오늘 출고</div>
            <div className="kpi-val cg">7</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">평균 출고 시간</div>
            <div className="kpi-val">12분</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">고객 만족</div>
            <div className="kpi-val cg">4.8★</div>
          </div>
        </div>
        <div className="ca-area">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div className="del-card">
              <div className="bold">김민지 — RO-2025-0613-047</div>
              <div className="xs sec mt4">제네시스 G80 · 48나2847</div>
              <div className="tag tg mt8">수납 완료</div>
            </div>
            <div className="del-card">
              <div className="bold">박현우 — RO-2025-0613-046</div>
              <div className="xs sec mt4">BMW 5-Series · 11바5678</div>
              <div className="tag ta mt8">작업 진행중</div>
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
