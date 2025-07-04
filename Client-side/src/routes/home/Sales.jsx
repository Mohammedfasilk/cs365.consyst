import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalesDashboard from '../../pages/Sales/SalesDashboard'
import OrderBooking from '../../pages/Sales/OrderBooking'

function Dashboard() {
  return (
    <Routes>
        <Route path='/sales-dashboard' element={<SalesDashboard/>}/>
        <Route path='/order-booking' element={<OrderBooking/>}/>
    </Routes>
  )
}

export default Dashboard