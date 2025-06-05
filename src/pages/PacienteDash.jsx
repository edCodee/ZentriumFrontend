import React from 'react';
import { Calendar, FileText, Stethoscope, UserCircle, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";

export default function PatientDashboard() {
    return (
        <div className="flex min-h-screen bg-[#1a202c] text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-[#2d3748] p-6 space-y-6">
            <div className="text-2xl font-bold text-teal-400 mb-6">Zentrium Salud</div>
            <nav className="space-y-4">
            <div className="flex items-center gap-3 text-teal-300 hover:text-white cursor-pointer">
                <UserCircle /> <span>Mi Perfil</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white cursor-pointer">
                <Calendar /> <span>Citas</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white cursor-pointer">
                <FileText /> <span>Resultados</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white cursor-pointer">
                <Stethoscope /> <span>Doctores</span>
            </div>
            <Link to="/login" className="flex items-center gap-3 text-white hover:text-teal-400">
                <LogOut /> <span>Salir</span>
            </Link>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
            <h1 className="text-3xl font-bold text-teal-300 mb-8">Bienvenido, Paciente</h1>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                <div className="flex items-center gap-4">
                <Calendar className="text-teal-400" size={32} />
                <div>
                    <h2 className="text-lg font-semibold">Próxima Cita</h2>
                    <p className="text-sm text-gray-400">Consulta médica programada</p>
                </div>
                </div>
            </div>

            <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                <div className="flex items-center gap-4">
                <FileText className="text-teal-400" size={32} />
                <div>
                    <h2 className="text-lg font-semibold">Últimos Resultados</h2>
                    <p className="text-sm text-gray-400">Ver tus exámenes recientes</p>
                </div>
                </div>
            </div>

            <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                <div className="flex items-center gap-4">
                <Stethoscope className="text-teal-400" size={32} />
                <div>
                    <h2 className="text-lg font-semibold">Doctores</h2>
                    <p className="text-sm text-gray-400">Consulta tu equipo médico</p>
                </div>
                </div>
            </div>
            </section>
        </main>
        </div>
    );
}
