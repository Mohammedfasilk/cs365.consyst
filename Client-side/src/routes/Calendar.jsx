import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManageCalendar from '../pages/Calendar/ManageCalendar'
import CalendarView from '../pages/Calendar/CalendarView'


function Business_Tools() {
  return (
    <Routes>
      <Route path='/view' element={<CalendarView/>} />
      <Route path='/manage-calendar' element={<ManageCalendar/>} />
    </Routes>
  )
}

export default Business_Tools