'use client'

import Layout from '@/components/Layout'
import { useState } from 'react'

export default function VHCPage() {
  const [role, setRole] = useState('sa')

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">VHC 점검</div>
            <div className="ph-sub">제네시스 G80 · 48나2847 · 김민준 SA / 이준호 TC</div>
          </div>
          <div className="ph-right">
            <div style={{ display: 'flex', border: '1px solid var(--brd2)', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                style={{ height: '30px', padding: '0 12px', fontSize: '13px', cursor: 'pointer', background: role === 'sa' ? 'var(--primary)' : 'var(--sur)', border: 'none', color: role === 'sa' ? '#fff' : 'var(--ts)' }}
                onClick={() => setRole('sa')}
              >
                SA 뷰
              </button>
              <button
                style={{ height: '30px', padding: '0 12px', fontSize: '13px', cursor: 'pointer', background: role === 'tc' ? 'var(--primary)' : 'var(--sur)', border: 'none', color: role === 'tc' ? '#fff' : 'var(--ts)' }}
                onClick={() => setRole('tc')}
              >
                TC 뷰
              </button>
            </div>
            <button className="btn btn-o btn-sm" onClick={() => toast('OBD 진단기 연결됨', 'ok')}>
              🔌 진단기 연결
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('VHC 완료 — SA에게 결과 전송', 'ok')}>
              점검 완료 →
            </button>
          </div>
        </div>
        {role === 'sa' && (
          <div className="ca-area">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="card">
                <div className="card-title">🔧 엔진 / 구동계</div>
                <div className="vhc-row">
                  <span style={{ flex: 1 }}>엔진오일 상태</span>
                  <div className="flex g4">
                    <div className="vbtn g on">✓</div>
                    <div className="vbtn y">!</div>
                    <div className="vbtn r">✗</div>
                  </div>
                  <button style={{ border: '1px dashed var(--brd2)', borderRadius: '5px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', background: 'var(--sur2)', color: 'var(--ts)', marginLeft: '6px' }} onClick={() => toast('사진 촬영', 'ok')}>
                    📷
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {role === 'tc' && (
          <div className="ca-area">
            <div className="ai ok mb12">
              <div className="ai-ico">🔧</div>
              <div>
                <div className="ai-title" style={{ color: 'var(--green)' }}>기술자 작업 지시</div>
                <div className="ai-body">SA 배정: 이준호 TC · Bay 3 · 오늘 09:40 시작 · 예상 완료 13:00</div>
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
