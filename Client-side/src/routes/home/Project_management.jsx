import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Project from '../../pages/Project-Management/Project'
import Cost_Control from '../../pages/Project-Management/Cost_Control'
import Schedule from '../../pages/Project-Management/Schedule'

function Project_management() {
  return (
    <Routes>
        <Route path='/project' element={<Project/>}/>
        <Route path='/cost-control' element={<Cost_Control/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
    </Routes>
  )
}

export default Project_management