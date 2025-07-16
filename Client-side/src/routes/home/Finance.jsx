import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Banking from '../../pages/Finance/Banking'
import FinanceDashboard from '../../pages/Finance/FinanceDashboard'
import BillingPlan from '../../pages/Finance/BillingPlan'

function Finance() {
  return (
    <Routes>
        <Route path='/banking' element={<Banking/>}/>
        <Route path='/finance-dashboard' element={<FinanceDashboard/>}/>
        <Route path='billing-plan' element={<BillingPlan/>}/>
    </Routes>
  )
}

export default Finance