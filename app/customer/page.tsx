'use client'

import Layout from '@/components/Layout'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { searchCustomers, type Customer } from './data'

export default function CustomerPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [list, setList] = useState<Customer[] | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(() => {
    const result = searchCustomers(query)
    setList(result)
    setSearched(true)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">고객/차량</div>
            <div className="ph-sub">고객명, 차량번호, 전화번호로 검색 후 목록에서 선택하면 상세를 볼 수 있습니다</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-p btn-sm" onClick={() => toast('고객 등록 모달')}>
              + 고객 등록
            </button>
          </div>
        </div>

        {/* 검색 영역 (디폴트) */}
        <div className="fbar" style={{ padding: '20px 24px' }}>
          <input
            type="text"
            className="finp"
            placeholder="🔍 고객명 / 차량번호 / 전화번호"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: '280px' }}
          />
          <button className="btn btn-p btn-sm" onClick={handleSearch}>
            검색
          </button>
        </div>

        {/* 검색 후 리스트 */}
        {searched && (
          <div className="ca-area">
            {list && list.length > 0 ? (
              <>
                <div className="ph" style={{ padding: '10px 24px', borderBottom: '1px solid var(--brd)' }}>
                  <div className="ph-sub">검색 결과 {list.length}건</div>
                </div>
                <div className="tbl-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>고객명</th>
                        <th>차량</th>
                        <th>차량번호</th>
                        <th>전화번호</th>
                        <th>등급</th>
                        <th>액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((c) => (
                        <tr
                          key={c.id}
                          className="crow"
                          onClick={() => router.push(`/customer/${c.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          <td className="bold">{c.name}</td>
                          <td>{c.vehicle}</td>
                          <td><span className="plate">{c.plate}</span></td>
                          <td>{c.phone}</td>
                          <td>
                            <span className={`st ${c.grade === 'VIP' ? 'st-p' : c.grade === '골드' ? 'st-g' : ''}`}>
                              {c.grade}
                            </span>
                          </td>
                          <td>
                            <div className="ra">
                              <button
                                className="abtn abtn-p"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/customer/${c.id}`)
                                }}
                              >
                                상세 보기
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--ts)' }}>
                검색 결과가 없습니다. 다른 조건으로 검색해 보세요.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

declare global {
  function toast(msg: string, type?: string): void
}
