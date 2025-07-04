import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Banking from '../../../pages/Finance/Banking'
import FinanceDashboard from '../../../pages/Finance/FinanceDashboard'

function Finance() {
  return (
    <Routes>
        <Route path='/banking' element={<Banking/>}/>
        <Route path='/finance-dashboard' element={<FinanceDashboard/>}/>
    </Routes>
  )
}

export default Finance