'use client'

import Layout from '@/components/Layout'
import { useState } from 'react'

export default function JobPage() {
  const [view, setView] = useState('bay')

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">Job 관리</div>
            <div className="ph-sub">Workshop 운영 현황 · 2025.06.13</div>
          </div>
          <div className="ph-right">
            <div style={{ display: 'flex', border: '1px solid var(--brd2)', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                style={{ height: '30px', padding: '0 12px', fontSize: '13px', cursor: 'pointer', background: view === 'bay' ? 'var(--primary)' : 'var(--sur)', border: 'none', color: view === 'bay' ? '#fff' : 'var(--ts)' }}
                onClick={() => setView('bay')}
              >
                Bay 현황
              </button>
              <button
                style={{ height: '30px', padding: '0 12px', fontSize: '13px', cursor: 'pointer', background: view === 'kanban' ? 'var(--primary)' : 'var(--sur)', border: 'none', color: view === 'kanban' ? '#fff' : 'var(--ts)' }}
                onClick={() => setView('kanban')}
              >
                Kanban
              </button>
            </div>
            <button className="btn btn-p btn-sm" onClick={() => toast('신규 Job 배정 완료', 'ok')}>
              + Job 배정
            </button>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="kpi">
            <div className="kpi-lbl">진행 중</div>
            <div className="kpi-val cb">8</div>
            <div className="kpi-sub">작업 중인 Bay</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">완료</div>
            <div className="kpi-val cg">6</div>
            <div className="kpi-sub">오늘 기준</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">대기 중</div>
            <div className="kpi-val ca">4</div>
            <div className="kpi-sub">Bay 배정 대기</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">지연 위험</div>
            <div className="kpi-val cr">2</div>
            <div className="kpi-sub">예정 초과 임박</div>
          </div>
          <div className="kpi">
            <div className="kpi-lbl">평균 사이클</div>
            <div className="kpi-val">2.4h</div>
            <div className="kpi-sub">목표 2.0h</div>
          </div>
        </div>
        {view === 'bay' && (
          <div className="ca-area">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div className="bay-card">
                <div className="bay-hdr">
                  <span className="bay-num">Bay 1</span>
                  <span className="st st-a">작업 중</span>
                </div>
                <div className="bay-bar" style={{ background: 'var(--amber)' }}></div>
                <div className="bay-body">
                  <div className="bold">박현우 — 종합점검</div>
                  <div className="plate mt4">11바5678</div>
                  <div className="pbr mt8">
                    <div className="pbr-f" style={{ background: 'var(--amber)', width: '55%' }}></div>
                  </div>
                  <div className="xs sec mt4">진행률 55% · 예상 완료 13:30 ⚠</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === 'kanban' && (
          <div className="ca-area">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div className="kb-col">
                <div className="kb-hd">
                  <span>📋 작업 대기</span>
                  <span className="tag ta">4</span>
                </div>
                <div className="kb-card">
                  <div className="bold sm">정지훈 — 타이어</div>
                  <div className="xs sec mt4">71바3391 · 이서연 SA</div>
                  <div className="tag ta mt4">승인 대기</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
