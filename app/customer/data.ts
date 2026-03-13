export interface Customer {
  id: string
  name: string
  vehicle: string
  plate: string
  phone: string
  grade: 'VIP' | '일반' | '골드'
  email?: string
  memo?: string
}

export const customers: Customer[] = [
  { id: '1', name: '김민지', vehicle: '제네시스 G80 2023', plate: '48나2847', phone: '010-1234-5678', grade: 'VIP', email: 'kim@example.com' },
  { id: '2', name: '이태양', vehicle: '현대 아이오닉6', plate: '32다4521', phone: '010-2345-6789', grade: '일반' },
  { id: '3', name: '박현우', vehicle: 'BMW 5-Series', plate: '11바5678', phone: '010-3456-7890', grade: 'VIP', email: 'park@example.com' },
  { id: '4', name: '최아영', vehicle: '기아 EV6', plate: '12마8844', phone: '010-4567-8901', grade: '일반' },
  { id: '5', name: '정지훈', vehicle: '제네시스 GV80', plate: '71바3391', phone: '010-5678-9012', grade: '골드' },
  { id: '6', name: '한지수', vehicle: '현대 투싼', plate: '88가1234', phone: '010-6789-0123', grade: '일반' },
  { id: '7', name: '윤서준', vehicle: '현대 아반떼', plate: '55마2233', phone: '010-7890-1234', grade: '일반' },
  { id: '8', name: '강태현', vehicle: '현대 쏘나타', plate: '91나6677', phone: '010-8901-2345', grade: '골드' },
]

export function searchCustomers(query: string): Customer[] {
  if (!query.trim()) return []
  const q = query.trim().toLowerCase()
  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.plate.replace(/\s/g, '').toLowerCase().includes(q) ||
      c.vehicle.toLowerCase().includes(q) ||
      c.phone.replace(/-/g, '').includes(q.replace(/-/g, ''))
  )
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}
