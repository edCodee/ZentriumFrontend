import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute' 
import Home from '../pages/Home'
import Login from '../pages/Login'  
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Team from '../pages/Team'
import Admin from '../pages/Admin'
import Doctor from '../pages/Doctor'
import DoctorSearch from '../pages/DoctorSearch'
import DashAdministrator from '../pages/DashAdministrator'
import LoginAdmin from '../pages/LoginAdmin'
import PacienteDash from '../pages/PacienteDash'
import LoginDoctor from '../pages/LoginDoctor'
import DoctorDash from '../pages/DoctorDash'
import RegisterAdmin from '../pages/RegisterAdmin'
import SelectionRole from '../pages/SelectionRole'
import CreateUser from '../pages/CreateUser'
import AssignedRole from '../pages/AssignedRole'
import Users from '../pages/Users'
import CreateUserAdmin from '../pages/CreateUserAdmin'
import CreateDoctorProfile from '../pages/createDoctorProfile'
import ListDoctor from '../pages/listDoctor'
import ListDoctorPatient from '../pages/listDoctorPatient'
import Messages from '../pages/messages'
import ScheduleAppointment from '../pages/ScheduleAppointment'
import Appointment from '../pages/Appointment'


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
            <Route path='/dashadministrator' element={<DashAdministrator/>}/>
            <Route path='/loginadmin' element={<LoginAdmin/>}/>
            {/* <Route path='/pacientedash' element={<PacienteDash/>}/> */}
            {/* <Route path='/logindoctor' element={<LoginDoctor/>}/> */}
            <Route path='/doctordash' element={<DoctorDash/>}/>
            <Route path='/registeradmin' element={<RegisterAdmin/>}/>
            {/* <Route path='/selectionrole' element={<SelectionRole/>}/> */}
            <Route path='/createuser' element={<CreateUser/>}/>
            <Route path='/assignedrole' element={<AssignedRole/>}/>
            <Route path='/users' element={<Users/>}/>

                {/*Rutas Protegidas*/}

                <Route path="/dashadministrator" element={
                    <ProtectedRoute>
                        <DashAdministrator/>
                    </ProtectedRoute>
                }/>

                <Route path="/createuseradmin" element={
                    <ProtectedRoute>
                        <CreateUserAdmin/>
                    </ProtectedRoute>
                }/>

                <Route path="/createdoctorprofile/:userSerial" element={
                    <ProtectedRoute>
                        <CreateDoctorProfile/>
                    </ProtectedRoute>
                }/>

                <Route path="/selectionrole" element={
                    <ProtectedRoute>
                        <SelectionRole/>
                    </ProtectedRoute>
                }/>

                <Route path="/assignedrole" element={
                    <ProtectedRoute>
                        <AssignedRole/>
                    </ProtectedRoute>
                }/>

                <Route path="/listdoctor" element={
                    <ProtectedRoute>
                        <ListDoctor/>
                    </ProtectedRoute>
                }/>

                <Route path="/listdoctorpatient" element={
                    <ProtectedRoute>
                        <ListDoctorPatient/>
                    </ProtectedRoute>
                }/>

                <Route path="/messages" element={
                    <ProtectedRoute>
                        <Messages/>
                    </ProtectedRoute>
                }/>

                <Route path="/pacientedash" element={
                    <ProtectedRoute>
                        <PacienteDash/>
                    </ProtectedRoute>
                }/>

                <Route path="/appointment" element={
                    <ProtectedRoute>
                        <ScheduleAppointment/>
                    </ProtectedRoute>
                }/>

                <Route path="/appointmentdoctor" element={
                    <ProtectedRoute>
                        <Appointment/>
                    </ProtectedRoute>
                }/>

        </Routes>
        </BrowserRouter>
    )
}
