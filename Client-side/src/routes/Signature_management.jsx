import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signatures from '../pages/Signature-management/Signatures'

function Signature_management() {
  return (
    <Routes>
        <Route path='/signatures' element={<Signatures/>}/>
    </Routes>
  )
}

export default Signature_management