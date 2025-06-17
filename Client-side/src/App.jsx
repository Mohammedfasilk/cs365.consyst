import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import HomeRoute from './routes/home/HomeRoute'
import Dashboard from './routes/home/Dashboard'
import MainLayout from '../src/components/UI/Mainlayout'
import Banking from './routes/home/Banking/Banking'
import Project_management from './routes/home/Project_management'
import Signature_management from './routes/Signature_management'
import { Toaster } from './components/UI/Toaster'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route element={<MainLayout/>}>
        <Route path='/home/*' element={<HomeRoute/>}/>
        <Route path='/dashboards/*' element={<Dashboard/>}/>
        <Route path='/banking/*' element={<Banking/>}/>
        <Route path='/project-management/*' element={<Project_management/>}/>
        <Route path='/signature-management/*' element={<Signature_management/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
