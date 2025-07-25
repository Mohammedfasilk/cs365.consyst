import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailSignatures from '../pages/Business-Tools/EmailSignatures'
import MeetingMinutes from '../pages/Business-Tools/MeetingMinutes'
import Tools from '../pages/Business-Tools/Tools'
import MeetingDetailPage from '../pages/Business-Tools/MeetingDetailPage'
import Notice from '../pages/Business-Tools/Notice'

function Business_Tools() {
  return (
    <Routes>
      <Route path='/tools' element={<Tools/>} />
      <Route path='/email-signatures' element={<EmailSignatures/>} />
      <Route path='/meeting-minutes' element={<MeetingMinutes/>} />
      <Route path='/meeting-details/:id' element={<MeetingDetailPage/>} />
      <Route path='/notice' element={<Notice/>} />
    </Routes>
  )
}

export default Business_Tools