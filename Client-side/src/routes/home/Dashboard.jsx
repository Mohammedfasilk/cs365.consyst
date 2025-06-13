import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sales from '../../pages/Dashboard/Sales'
import Finance from '../../pages/Dashboard/Finance'
import Project from '../../pages/Dashboard/Project'

function Dashboard() {
  return (
    <Routes>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/finance' element={<Finance/>}/>
        <Route path='/project-report' element={<Project/>}/>
    </Routes>
  )
}

export default Dashboard