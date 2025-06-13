import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Axis_bank from '../../../pages/Banking/Axis_bank'
import Hdfc_bank from '../../../pages/Banking/Hdfc_bank'
import Icici_bank from '../../../pages/Banking/Icici_bank'
import Rak_bank from '../../../pages/Banking/Rak_bank'

function Banking() {
  return (
    <Routes>
        <Route path='/axis-bank' element={<Axis_bank/>}/>
        <Route path='/hdfc-bank' element={<Hdfc_bank/>}/>
        <Route path='/icici-bank' element={<Icici_bank/>}/>
        <Route path='/rak-bank' element={<Rak_bank/>}/>
    </Routes>
  )
}

export default Banking