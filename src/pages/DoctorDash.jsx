import React from 'react';
import { User, FileCheck, HeartPulse, AlertTriangle, Cross, Stethoscope, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen bg-[#1a202c] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2d3748] p-6 space-y-6">
        <div className="text-2xl font-bold text-teal-400 mb-6">Panel Médico</div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-teal-300 hover:text-white cursor-pointer">
            <User /> <span>Pacientes</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <FileCheck /> <span>Resultados</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <HeartPulse /> <span>Estados</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white cursor-pointer">
            <Stethoscope /> <span>Consultas</span>
          </div>
          <Link to="/login" className="flex items-center gap-3 hover:text-white cursor-pointer">
            <LogOut /> <span>Salir</span>
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-teal-300 mb-8">Bienvenido, Doctor</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-teal-500/20 transition-all">
            <div className="flex items-center gap-4">
              <User className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Atender Paciente</h2>
                <p className="text-sm text-gray-400">Abrir ficha de atención médica</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-teal-500/20 transition-all">
            <div className="flex items-center gap-4">
              <FileCheck className="text-teal-400" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Revisar Resultados</h2>
                <p className="text-sm text-gray-400">Análisis clínicos recientes</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-800 rounded-xl p-6 shadow-lg hover:shadow-yellow-500/20 transition-all">
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-yellow-300" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Estado: Peligro</h2>
                <p className="text-sm text-yellow-100">Paciente requiere atención inmediata</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all">
            <div className="flex items-center gap-4">
              <HeartPulse className="text-green-300" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Estado: Estable</h2>
                <p className="text-sm text-green-100">Paciente estable sin riesgo</p>
              </div>
            </div>
          </div>

          <Link to="/appointmentdoctor" className="block">
          <div className="bg-rose-400 rounded-xl p-6 shadow-lg hover:shadow-red-500/20 transition-all">
            <div className="flex items-center gap-4">
              <Cross className="text-red-300" size={32} />
              <div>
                <h2 className="text-lg font-semibold">Citas Programadas</h2>
                <p className="text-sm text-red-100">Revisa las citas programadas el dia de hoy.</p>
              </div>
            </div>
          </div>
          </Link>

        </section>
      </main>
    </div>
  );
}