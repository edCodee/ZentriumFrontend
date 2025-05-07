import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'  // puedes descomentar cuando tengas la página
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Team from '../pages/Team'
import Admin from '../pages/Admin'
import Doctor from '../pages/Doctor'
import DoctorSearch from '../pages/DoctorSearch'
import AdminDash from '../pages/AdminDash'
import LoginAdmin from '../pages/LoginAdmin'
import PacienteDash from '../pages/PacienteDash'
import LoginDoctor from '../pages/LoginDoctor'
import DoctorDash from '../pages/DoctorDash'
import RegisterAdmin from '../pages/RegisterAdmin'

export default function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/doctor' element={<Doctor/>}/>
            <Route path='/doctorsearch' element={<DoctorSearch/>}/>
            <Route path='/admindash' element={<AdminDash/>}/>
            <Route path='/loginadmin' element={<LoginAdmin/>}/>
            <Route path='/pacientedash' element={<PacienteDash/>}/>
            <Route path='/logindoctor' element={<LoginDoctor/>}/>
            <Route path='/doctordash' element={<DoctorDash/>}/>
            <Route path='/registeradmin' element={<RegisterAdmin/>}/>
        </Routes>
        </BrowserRouter>
    )
}
