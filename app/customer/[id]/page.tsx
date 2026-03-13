'use client'

import Layout from '@/components/Layout'
import { useParams, useRouter } from 'next/navigation'
import { getCustomerById } from '../data'

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? params.id : params.id?.[0]
  const customer = id ? getCustomerById(id) : undefined

  if (!id || !customer) {
    return (
      <Layout>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div className="ph">
            <div>
              <div className="ph-title">고객을 찾을 수 없습니다</div>
              <div className="ph-sub">잘못된 링크이거나 삭제된 고객입니다</div>
            </div>
            <button className="btn btn-o btn-sm" onClick={() => router.push('/customer')}>
              ← 검색 페이지로
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">고객/차량 상세</div>
            <div className="ph-sub">{customer.name} · {customer.plate}</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-o btn-sm" onClick={() => router.push('/customer')}>
              ← 검색/목록
            </button>
            <button className="btn btn-p btn-sm" onClick={() => toast('수정 모달')}>
              수정
            </button>
          </div>
        </div>
        <div className="ca-area" style={{ padding: 24 }}>
          <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <section>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--th)', marginBottom: 10, textTransform: 'uppercase' }}>기본 정보</h3>
              <div style={{ background: 'var(--sur2)', borderRadius: 8, padding: 16, border: '1px solid var(--brd)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px 20px', fontSize: 14 }}>
                  <span style={{ color: 'var(--ts)' }}>고객명</span>
                  <span className="bold">{customer.name}</span>
                  <span style={{ color: 'var(--ts)' }}>등급</span>
                  <span>
                    <span className={`st ${customer.grade === 'VIP' ? 'st-p' : customer.grade === '골드' ? 'st-g' : 'st-gr'}`}>
                      {customer.grade}
                    </span>
                  </span>
                  <span style={{ color: 'var(--ts)' }}>전화번호</span>
                  <span>{customer.phone}</span>
                  {customer.email && (
                    <>
                      <span style={{ color: 'var(--ts)' }}>이메일</span>
                      <span>{customer.email}</span>
                    </>
                  )}
                </div>
              </div>
            </section>
            <section>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--th)', marginBottom: 10, textTransform: 'uppercase' }}>차량 정보</h3>
              <div style={{ background: 'var(--sur2)', borderRadius: 8, padding: 16, border: '1px solid var(--brd)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px 20px', fontSize: 14 }}>
                  <span style={{ color: 'var(--ts)' }}>차량</span>
                  <span>{customer.vehicle}</span>
                  <span style={{ color: 'var(--ts)' }}>차량번호</span>
                  <span className="plate">{customer.plate}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
