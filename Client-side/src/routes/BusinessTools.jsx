import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailSignatures from '../pages/Business-Tools/EmailSignatures'
import MeetingMinutes from '../pages/Business-Tools/MeetingMinutes'

function Business_Tools() {
  return (
    <Routes>
      <Route path='/email-signatures' element={<EmailSignatures/>} />
      <Route path='/meeting-minutes' element={<MeetingMinutes/>} />
    </Routes>
  )
}

export default Business_Tools