import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import HomeRoute from './routes/home/HomeRoute'
import Dashboard from './routes/home/Dashboard'
import MainLayout from '../src/components/UI/Mainlayout'
import Banking from './routes/home/Banking/Banking'
import Project_management from './routes/home/Project_management'
import { Toaster } from './components/UI/Toaster'
import Business_Tools from './routes/Signature_management'
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
        <Route path='/business-tools/*' element={<Business_Tools/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
