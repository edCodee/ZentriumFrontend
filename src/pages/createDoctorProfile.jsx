import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateDoctorProfile() {
    const { userSerial } = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        doctorProfileSpeciality: "",
        doctorProfileProfessionalLicense: "",
        doctorProfileYearsExperience: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validación básica para evitar enviar años vacíos
        if (form.doctorProfileYearsExperience === "") {
            alert("Por favor ingrese los años de experiencia.");
            return;
        }

        try {
            const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/apiDoctorProfile/${userSerial}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                doctorProfileSpeciality: form.doctorProfileSpeciality,
                doctorProfileProfessionalLicense: form.doctorProfileProfessionalLicense,
                doctorProfileYearsExperience: parseInt(form.doctorProfileYearsExperience, 10),
            }),
            });

            if (response.ok) {
                setShowSuccessModal(true);
            } else {
                const errorText = await response.text();
                alert("Error al crear doctor: " + errorText);
            }
        } catch (error) {
            alert("Error de red: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a202c] flex justify-center items-center p-4">
            <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">
                    Crear Ficha Médica Doctor
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="doctorProfileSpeciality"
                        placeholder="Especialidad"
                        value={form.doctorProfileSpeciality}
                        onChange={handleChange}
                        required
                        className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="text"
                        name="doctorProfileProfessionalLicense"
                        placeholder="Licencia Profesional"
                        value={form.doctorProfileProfessionalLicense}
                        onChange={handleChange}
                        required
                        className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="number"
                        name="doctorProfileYearsExperience"
                        placeholder="Años de Experiencia (ej: 5)"
                        min="0"
                        max="50"
                        value={form.doctorProfileYearsExperience}
                        onChange={handleChange}
                        required
                        className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <div className="md:col-span-2 flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-colors"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/assignedrole")}
                            className="text-teal-400 hover:underline font-semibold"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#01274C]/60 backdrop-blur-md">
                    <div className="relative bg-gradient-to-br from-[#06A2DB]/80 to-[#015B97]/80 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-[#01274C]/50 animate-fadeIn">
                        <h3 className="text-2xl font-bold text-[#50C878] mb-4">Doctor creado correctamente</h3>
                        <p className="text-[#E0F2F1] mb-6">El perfil del doctor se registró con éxito.</p>
                        <button
                            onClick={() => navigate("/assignedrole")}
                            className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
