import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";


const Slideshow = () => {
    const images = [
        "/ruta-imagen1.png",
        "/ruta-imagen2.png",
        "/ruta-imagen3.png",
        "/ruta-imagen4.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-xl shadow-2xl w-full h-[400px] overflow-hidden transition-all duration-500 ease-in-out">
            <img
                src={images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                className="w-full h-full object-cover"
            />
        </div>
    );
};


export default function LoginPage() {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
// https://localhost:7087/api/User/login
        try {
            const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/api/User/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: cedula,
                    userPassword: password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || "Credenciales inválidas.");
                return;
            }

            const data = await response.json();
            console.log("Usuario logueado:", data);

            // Guardar en localStorage
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("roles", JSON.stringify(data.roles));
            localStorage.setItem('token', data.token);

            if (!data.roles || data.roles.length === 0) {
                setError("No se encontraron roles asignados, contactese con el administrador.");
                return;
            }

            if (data.roles.length === 1) {
                const role = data.roles[0];
                if (role.roleSerial === 1) {
                    navigate("/dashadministrator");
                } else if (role.roleSerial === 2) {
                    navigate("/doctordash");
                } else if (role.roleSerial === 3) {
                    navigate("/pacientedash");
                } else {
                    navigate(`/dashboard/${role.roleName.toLowerCase()}`);
                }
            } else {
                // múltiples roles 
                navigate("/selectionrole");
            }

        } catch (err) {
            setError("Error en el servidor o conexión.");
            console.error("Login error:", err);
        }
    };

    return (
    <>
        {/* Encabezado con logo y nombre */}
        <div className="bg-[#01274C] py-4">
            <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-center">
                <img
                    alt="Logo de Orbot"
                    src="/logLogin.png" // `public/`
                    className="h-28 w-28 object-contain"
                />
                <h1 className="text-5xl sm:text-6xl font-bold text-white">
                    Zentrum Medical
                </h1>
            </div>
        </div>

        {/* Cuerpo principal */}
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-y-8 lg:gap-x-20">
            {/* Slideshow */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <Slideshow />
            </div>

            {/* Formulario de login */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-md shadow-md">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Cédula o Pasaporte
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300"
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}
<div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 w-full">
    <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-2 w-full sm:w-auto sm:min-w-[150px] rounded-md hover:bg-blue-700 transition text-center"
    >
        Iniciar
    </button>

    <Link
        to="/createuser"
        className="text-blue-600 border border-blue-600 px-8 py-2 w-full sm:w-auto sm:min-w-[150px] rounded-md hover:bg-blue-50 transition text-center font-medium"
    >
        Registrarse
    </Link>
</div>
                </form>
            </div>
        </div>
    </>
);

}

