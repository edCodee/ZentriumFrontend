import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

        export default function PageDoctor() {
        const [doctors, setDoctors] = useState([]);
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchDoctors = async () => {
            try {
                const response = await fetch("https://localhost:7087/apiDoctorProfile/profiledoctor", {
                headers: { accept: "application/json" },
                });
                if (response.ok) {
                const data = await response.json();
                setDoctors(data);
                } else {
                alert("Error al obtener doctores: " + (await response.text()));
                }
            } catch (error) {
                alert("Error de red: " + error.message);
            } finally {
                setLoading(false);
            }
            };
            fetchDoctors();
        }, []);

        return (
            <div className="min-h-screen bg-[#1a202c] p-6 flex flex-col items-center">
            <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl p-8 mt-4">
                <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">
                Lista de Doctores Registrados
                </h2>

                {loading ? (
                <div className="text-white text-center">Cargando doctores...</div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctors.map((doctor) => (
                    <div
                        key={doctor.userId}
                        className="bg-gradient-to-br from-[#06A2DB]/30 to-[#015B97]/30 rounded-xl border border-[#01274C]/50 p-4 shadow hover:scale-105 transition-transform"
                    >
                        <h3 className="text-xl font-semibold text-teal-300 mb-2">
                        {doctor.userFirstName} {doctor.userMiddleName} {doctor.userLastName} {doctor.userSecondLastName}
                        </h3>
                        <p className="text-gray-200 mb-1">
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {new Date(doctor.userBirthDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-200 mb-1">
                        <strong>Especialidad:</strong> {doctor.specialty}
                        </p>
                        <p className="text-gray-200 mb-1">
                        <strong>Licencia Profesional:</strong> {doctor.professionalLicense}
                        </p>
                        <p className="text-gray-200 mb-1">
                        <strong>Años de Experiencia:</strong> {doctor.yearsExperience}
                        </p>
                    </div>
                    ))}
                </div>
                )}
                <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate("/dashadministrator")}
                    className="text-teal-400 hover:underline font-semibold"
                >
                    Volver al Inicio
                </button>
                </div>
            </div>
            </div>
        );
        }
