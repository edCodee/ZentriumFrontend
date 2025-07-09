import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Stethoscope, UserCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { confirmLogout } from "../utils/confirmLogout";


export default function PatientDashboard() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        bloodType: '',
        allergies: '',
        diseases: '',
        contactName: '',
        contactRelation: '',
        contactPhone: '',
    });

    const token = localStorage.getItem('token'); // token dinámico

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const contactFormatted = `${form.contactName} (${form.contactRelation}) - +593 ${form.contactPhone.replace(/^0/, '')}`;

    try {
        const res = await fetch('https://localhost:7087/apiPatientProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            patientProfileBloodType: form.bloodType,
            patientProfileAllergies: form.allergies,
            patientProfileChronicDiseases: form.diseases,
            patientProfileEmergencyContact: contactFormatted,
        })
        });

        if (res.ok) {
        setShowModal(false);
        } else {
        alert('Error al guardar el perfil');
        }
    } catch (err) {
        console.error('Error al enviar formulario:', err);
    }
};


    useEffect(() => {
        fetch('https://localhost:7087/apiPatientProfile/exists', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'text/plain'
        }
        })
        .then(res => res.json())
        .then(exists => {
            if (!exists) {
            setShowModal(true);
            }
        })
        .catch(err => console.error('Error verificando perfil:', err));
    }, [token]);

    return (
        <>
        {/* Modal elegante */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#01274C]/60 backdrop-blur-md">
            <form
                onSubmit={handleSubmit}
                className="relative bg-gradient-to-br from-[#06A2DB]/80 to-[#015B97]/80 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-[#01274C]/50 animate-fadeIn space-y-4"
            >
                <h2 className="text-2xl font-semibold text-[#50C878]">Completa tu perfil médico</h2>
                <p className="text-sm text-[#E0F2F1]">Antes de continuar, ayúdanos con esta información</p>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Tipo de Sangre</label>
                <select
                    name="bloodType"
                    value={form.bloodType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="No tengo entendido">No tengo entendido</option>
                </select>
                </div>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Alergias</label>
                <input
                    type="text"
                    name="allergies"
                    value={form.allergies}
                    onChange={handleChange}
                    placeholder="Ej: Ninguna"
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                />
                </div>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Enfermedades Crónicas</label>
                <input
                    type="text"
                    name="diseases"
                    value={form.diseases}
                    onChange={handleChange}
                    placeholder="Ej: Diabetes tipo 2 / No tengo entendido"
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                />
                </div>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Nombre del contacto</label>
                <input
                    type="text"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="Ej: María Gómez"
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                />
                </div>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Parentesco</label>
                <input
                    type="text"
                    name="contactRelation"
                    value={form.contactRelation}
                    onChange={handleChange}
                    placeholder="Ej: Esposa"
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                />
                </div>

                <div className="text-left">
                <label className="block text-[#E0F2F1] mb-1">Teléfono celular</label>
                <input
                    type="tel"
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="Ej: 0991234567"
                    className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    required
                />
                </div>


                <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                >
                    Guardar y continuar
                </button>
                </div>
            </form>
            </div>
        )}

        {/* Dashboard Paciente */}
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
                <Link to="/listdoctorpatient" className="flex items-center gap-3 text-white hover:text-teal-400">
                <Stethoscope /> <span>Doctores</span>
                </Link>
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
            <h1 className="text-3xl font-bold text-teal-300 mb-8">Bienvenido, Paciente</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <Link to="/appointment" className="block">
                <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                    <div className="flex items-center gap-4">
                    <Calendar className="text-teal-400" size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Programar Cita</h2>
                        <p className="text-sm text-gray-400">Prográma tu cita</p>
                    </div>
                    </div>
                </div>
                </Link>

                <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                <div className="flex items-center gap-4">
                    <FileText className="text-teal-400" size={32} />
                    <div>
                    <h2 className="text-lg font-semibold">Últimos Resultados</h2>
                    <p className="text-sm text-gray-400">Ver tus exámenes recientes</p>
                    </div>
                </div>
                </div>

                <Link to="/listdoctorpatient" className="block">
                <div className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all p-6">
                    <div className="flex items-center gap-4">
                    <Stethoscope className="text-teal-400" size={32} />
                    <div>
                        <h2 className="text-lg font-semibold">Doctores</h2>
                        <p className="text-sm text-gray-400">Consulta tu equipo médico</p>
                    </div>
                    </div>
                </div>
                </Link>
            </section>
            </main>
        </div>
        </>
    );
}
