'use client'

import Header from './Header'
import Sidebar from './Sidebar'
import Toast from './Toast'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
      <Toast />
    </>
  )
}
