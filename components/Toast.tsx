'use client'

import { useEffect, useState } from 'react'

export default function Toast() {
  const [message, setMessage] = useState('')
  const [type, setType] = useState<string>('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.toast = (msg: string, t?: string) => {
      setMessage(msg)
      setType(t || '')
      setShow(true)
      setTimeout(() => setShow(false), 3000)
    }
  }, [])

  return (
    <div className={`toast ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  )
}
