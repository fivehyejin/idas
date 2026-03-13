'use client'

import Layout from '@/components/Layout'

export default function SurveyPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">후속 관리</div>
            <div className="ph-sub">설문 발송 · VOC 분석 · Recovery</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => toast('설문 일괄 발송 완료', 'ok')}>
              📤 설문 일괄 발송
            </button>
            <button className="btn btn-p btn-sm">+ Recovery 등록</button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">설문 응답률</div>
            <div className="kpi-val cg">68%</div>
            <div className="kpi-sub">업계 평균 45%</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">평균 CSI</div>
            <div className="kpi-val">4.6★</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">불만 건수</div>
            <div className="kpi-val cr">3</div>
            <div className="kpi-sub">이번 주</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">Recovery 완료</div>
            <div className="kpi-val cg">2</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">NPS</div>
            <div className="kpi-val">+52</div>
          </div>
        </div>
        <div className="ca-area">
          <div className="fg2 mb16">
            <div>
              <div className="sec-title mb12">설문 발송 현황</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>고객</th>
                      <th>발송</th>
                      <th>상태</th>
                      <th>CSI</th>
                      <th>액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="crow">
                      <td className="bold">김민지</td>
                      <td className="sec sm">2025.06.13</td>
                      <td><span className="st st-g">응답완료</span></td>
                      <td>⭐⭐⭐⭐⭐</td>
                      <td>
                        <div className="ra">
                          <button className="abtn" onClick={() => toast('응답 상세 보기')}>보기</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="sec-title mb12">AI VOC 분석 요약</div>
              <div className="card mb12">
                <div className="card-title">감성 분석 — 이번 주</div>
                <div className="fca g8 mb4" style={{ justifyContent: 'space-between' }}>
                  <span className="sm">긍정</span>
                  <span className="cg bold">72%</span>
                </div>
                <div className="pbr" style={{ height: '8px' }}>
                  <div className="pbr-f" style={{ background: 'var(--green)', width: '72%' }}></div>
                </div>
                <div className="fca g8 mt8 mb4" style={{ justifyContent: 'space-between' }}>
                  <span className="sm">중립</span>
                  <span className="sec bold">18%</span>
                </div>
                <div className="pbr" style={{ height: '8px' }}>
                  <div className="pbr-f" style={{ background: 'var(--brd2)', width: '18%' }}></div>
                </div>
                <div className="fca g8 mt8 mb4" style={{ justifyContent: 'space-between' }}>
                  <span className="sm">부정</span>
                  <span className="cr bold">10%</span>
                </div>
                <div className="pbr" style={{ height: '8px' }}>
                  <div className="pbr-f" style={{ background: 'var(--red)', width: '10%' }}></div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">키워드</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="tag tg">친절함 (28)</span>
                  <span className="tag tg">빠른 처리 (21)</span>
                  <span className="tag tb">설명 친절 (18)</span>
                  <span className="tag ta">대기 시간 (12)</span>
                  <span className="tag tr">견적 비쌈 (7)</span>
                </div>
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
