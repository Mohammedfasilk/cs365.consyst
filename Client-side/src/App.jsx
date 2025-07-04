import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import HomeRoute from './routes/home/HomeRoute'
import Sales from './routes/home/Sales'
import MainLayout from '../src/components/UI/Mainlayout'
import Project_management from './routes/home/Project_management'
import { Toaster } from './components/UI/Toaster'
import Business_Tools from './routes/BusinessTools'
import Finance from './routes/home/Finance/Finance'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route element={<MainLayout/>}>
        <Route path='/home/*' element={<HomeRoute/>}/>
        <Route path='/sales/*' element={<Sales/>}/>
        <Route path='/finance/*' element={<Finance/>}/>
        <Route path='/project-management/*' element={<Project_management/>}/>
        <Route path='/business-tools/*' element={<Business_Tools/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
