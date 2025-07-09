import React from 'react';
import { UserPlus, Briefcase, Building2, LayoutDashboard, Settings, Search, LogOut, User, BriefcaseMedicalIcon, BotIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { confirmLogout } from "../utils/confirmLogout";


export default function AdminDashboard() {
      const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#1a202c] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2d3748] p-6 space-y-6">
        <div className="text-2xl font-bold text-teal-400 mb-6">Admin Salud</div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-teal-300 hover:text-white cursor-pointer">
            <LayoutDashboard /> <span>Dashboard</span>
          </div>
          {/* <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <UserPlus /> <span>Doctores</span>
          </div> */}
          {/* <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <Settings /> <span>Configuración</span>
          </div> */}
            <Link
                to="/login"
                onClick={async (e) => {
                e.preventDefault();
                const confirmed = await confirmLogout();
                if (confirmed) {
                    localStorage.removeItem("token");
                    navigate("/login", { replace: true });
                }
                }}
                className="flex items-center gap-3 p-2 rounded-xl hover:text-teal-400 transition-all"
            >
                <LogOut /> <span>Salir</span>
            </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-teal-300 mb-8">Panel Administrativo</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/createuseradmin">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6 cursor-pointer">
            <div className="flex items-center gap-4">
              <UserPlus className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Nuevo Empleado</h2>
                <p className="text-sm text-gray-400">Agregar un nuevo profesional en su área</p>
              </div>
            </div>
          </div>
        </Link>

<Link to="/doctorsearch">
  <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6 cursor-pointer">
    <div className="flex items-center gap-4">
      <Search className="text-teal-400" size={32} />
      <div>
        <h2 className="text-lg font-semibold">Buscar Usuario</h2>
        <p className="text-sm text-gray-400">Busca usuario parte de la empresa</p>
      </div>
    </div>
  </div>
</Link>

<Link to="/assignedrole">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
            <div className="flex items-center gap-4">
              <Briefcase className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Asignar Rol</h2>
                <p className="text-sm text-gray-400">Asignar un rol a un nuevo empleado</p>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/users">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
            <div className="flex items-center gap-4">
              <User className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Usuarios</h2>
                <p className="text-sm text-gray-400">Gestion de ususarios rapida</p>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/listdoctor">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
            <div className="flex items-center gap-4">
              <BriefcaseMedicalIcon className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Doctores</h2>
                <p className="text-sm text-gray-400">Lista de doctores Activos</p>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/messages">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
            <div className="flex items-center gap-4">
              <BotIcon className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Boot de ventas </h2>
                <p className="text-sm text-gray-400">Lista de doctores Activos</p>
              </div>
            </div>
          </div>
          </Link>

        </section>
      </main>
    </div>
  );
}
