import React from 'react'
import { DashboardLayout } from '../../../modules/DashboardLayout'

export function DashboardLayoutPage({ items, onLogout }) {
  return (
    <>
      <DashboardLayout items={items} onLogout={onLogout} />
    </>
  )
}
