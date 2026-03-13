'use client'

import Layout from '@/components/Layout'

export default function CustomerPage() {
  return (
    <Layout>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div className="ph">
          <div>
            <div className="ph-title">고객/차량</div>
            <div className="ph-sub">고객 및 차량 정보 관리</div>
          </div>
          <div className="ph-right">
            <button className="btn btn-p btn-sm" onClick={() => toast('고객 등록 모달')}>
              + 고객 등록
            </button>
          </div>
        </div>
        <div className="ca-area">
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
                <tr className="crow">
                  <td className="bold">김민지</td>
                  <td>제네시스 G80 2023</td>
                  <td><span className="plate">48나2847</span></td>
                  <td>010-1234-5678</td>
                  <td><span className="st st-p">VIP</span></td>
                  <td>
                    <div className="ra">
                      <button className="abtn" onClick={() => toast('고객 상세 보기')}>보기</button>
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
