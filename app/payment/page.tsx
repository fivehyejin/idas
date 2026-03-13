'use client'

import Layout from '@/components/Layout'

export default function PaymentPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">수납</div>
            <div className="ph-sub">서비스 완료 차량 · 결제 처리</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => toast('Invoice PDF 출력')}>
              📄 Invoice 출력
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('결제 처리 모달')}>
              결제 처리
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">수납 대기</div>
            <div className="kpi-val ca">5</div>
            <div className="kpi-sub">결제 미완료</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">오늘 수납 완료</div>
            <div className="kpi-val cg">8</div>
            <div className="kpi-sub">₩3,420,000</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">원격 결제</div>
            <div className="kpi-val cb">3</div>
            <div className="kpi-sub">Customer Portal</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">미수금</div>
            <div className="kpi-val cr">1</div>
            <div className="kpi-sub">₩180,000</div>
          </div>
        </div>
        <div className="ca-area">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="card">
              <div className="card-title">수납 대기</div>
              <div className="bold">김민지 — RO-2025-0613-047</div>
              <div className="xs sec mt4">₩358,000</div>
            </div>
            <div className="card">
              <div className="card-title">수납 완료</div>
              <div className="bold">이태양 — RO-2025-0613-044</div>
              <div className="xs cg mt4">₩178,000</div>
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
