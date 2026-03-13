'use client'

import Layout from '@/components/Layout'

export default function PartsPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">부품 관리</div>
            <div className="ph-sub">재고 현황 · 주문 · 출고</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => toast('긴급 발주 등록')}>
              + 긴급 발주
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('출고 처리 완료', 'ok')}>
              부품 출고
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">총 재고 품목</div>
            <div className="kpi-val">1,248</div>
            <div className="kpi-sub">SKU 기준</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">부족 품목</div>
            <div className="kpi-val cr">12</div>
            <div className="kpi-sub">안전재고 이하</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">발주 중</div>
            <div className="kpi-val ca">8</div>
            <div className="kpi-sub">입고 대기</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">오늘 출고</div>
            <div className="kpi-val cb">34</div>
            <div className="kpi-sub">품목 기준</div>
          </div>
        </div>
        <div className="fbar">
          <select className="fsel">
            <option>전체 카테고리</option>
            <option>엔진/오일</option>
            <option>브레이크</option>
            <option>타이어</option>
            <option>전기</option>
            <option>에어컨</option>
          </select>
          <input type="text" className="finp" placeholder="🔍 부품명 / 부품번호" />
          <button className="btn btn-p btn-sm">검색</button>
          <button className="btn btn-o btn-sm" style={{ marginLeft: 'auto' }} onClick={() => toast('부족 품목 12건 자동 발주 등록', 'warn')}>
            ⚠ 부족 품목 일괄 발주
          </button>
        </div>
        <div className="ca-area">
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>상태</th>
                  <th>부품번호</th>
                  <th>부품명</th>
                  <th>카테고리</th>
                  <th>재고</th>
                  <th>안전재고</th>
                  <th>단가</th>
                  <th>ETA</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                <tr className="crow">
                  <td><span className="st st-g">재고 있음</span></td>
                  <td className="bold">BRK-001</td>
                  <td>브레이크 패드 (전)</td>
                  <td>브레이크</td>
                  <td>24</td>
                  <td>10</td>
                  <td>₩130,000</td>
                  <td>—</td>
                  <td>
                    <div className="ra">
                      <button className="abtn" onClick={() => toast('출고 처리')}>출고</button>
                    </div>
                  </td>
                </tr>
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
