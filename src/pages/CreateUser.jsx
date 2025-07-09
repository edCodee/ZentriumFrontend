import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearUsuario() {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        userPhoto: null,
        userId: "",
        userFirstName: "",
        userMiddleName: "",
        userLastName: "",
        userSecondLastName: "",
        userBirthDate: "",
        userUsername: "",
        userEmail: "",
        userPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...form };
        data.userBirthDate = new Date(data.userBirthDate).toISOString();
// https://localhost:7087/api/User
        try {
            const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/api/User`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "text/plain",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
            setShowSuccessModal(true);
            } else {
                const errorText = await response.text();
                alert("Error al crear usuario: " + errorText);
            }
        } catch (error) {
            alert("Error de red: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a202c] flex justify-center items-center p-4">
            <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">Crear Nuevo Usuario</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="userId" placeholder="Cédula o ID" value={form.userId} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" name="userUsername" placeholder="Nombre de usuario" value={form.userUsername} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" name="userFirstName" placeholder="Primer nombre" value={form.userFirstName} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" name="userMiddleName" placeholder="Segundo nombre" value={form.userMiddleName} onChange={handleChange} className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" name="userLastName" placeholder="Apellido paterno" value={form.userLastName} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="text" name="userSecondLastName" placeholder="Apellido materno" value={form.userSecondLastName} onChange={handleChange} className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="email" name="userEmail" placeholder="Correo electrónico" value={form.userEmail} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <input type="password" name="userPassword" placeholder="Contraseña" value={form.userPassword} onChange={handleChange} required className="input bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <div className="md:col-span-2">
                        <label className="block text-white mb-2">Fecha de nacimiento</label>
                        <input type="date" name="userBirthDate" value={form.userBirthDate} onChange={handleChange} required className="w-full bg-gray-700 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <div className="md:col-span-2 flex justify-between mt-6">
                        <button type="submit" className="bg-teal-400 hover:bg-teal-500 transition-colors text-white px-8 py-3 rounded-xl font-semibold shadow-md">
                            Crear Usuario
                        </button>
                        <button type="button" onClick={() => navigate("/")} className="text-teal-400 hover:underline font-semibold">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
                        <h3 className="text-2xl font-bold text-teal-600 mb-4">Usuario creado correctamente</h3>
                        <p className="text-gray-700 mb-6">La cuenta ha sido creada con éxito.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            )}
            
        </div>

        
    );
}
