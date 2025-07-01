import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signatures from '../pages/Signature-management/Signatures'
import MeetingMinutes from '../pages/Signature-management/MeetingMinutes'

function Business_Tools() {
  return (
    <Routes>
      <Route path='/email-signatures' element={<Signatures />} />
      <Route path='/meeting-minutes' element={<MeetingMinutes/>} />
    </Routes>
  )
}

export default Business_Tools