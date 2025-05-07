// import { CalendarDays, Facebook, Instagram, Phone, PhoneIcon, Twitter, Users2, YoutubeIcon} from 'lucide-react';

// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'

//     const Slideshow = () => {
//         const images = [
//         "/ruta-imagen1.png",
//         "/ruta-imagen2.png",
//         "/ruta-imagen3.png",
//         "/ruta-imagen4.png",
//         ];
    
//         const [currentIndex, setCurrentIndex] = useState(0);
    
//         useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 3000);
//         return () => clearInterval(interval);
//         }, []);
    
//         return (
//         <div className="rounded-xl shadow-2xl w-full h-[400px] overflow-hidden transition-all duration-500 ease-in-out">
//             <img
//             src={images[currentIndex]}
//             alt={`Imagen ${currentIndex + 1}`}
//             className="w-full h-full object-cover"
//             />
//         </div>
//         );
//     };

// export default function Example() {
//         return (
//         <>
//     <div className="flex items-start justify-center min-h-0 bg-[#14304E] pt-0">
//         <div className="flex items-center space-x-4">
//             {/* Contenedor cuadrado para el logo */}
//             <div className="flex items-center justify-center h-40 w-40 bg-[#14304E]">
//             <img
//                 alt="Hospital Logo"
//                 src="\logLogin.png"
//                 className="h-30 w-40"
//             />
//             </div>
//             {/* Texto 'Hospital' al lado del logo */}
//             <h1 className="text-6xl font-bold tracking-tight text-white">
//             Zentrum Medical
//             </h1>
//         </div>
//     </div>

//     <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-16 gap-y-8 lg:gap-y-0 lg:gap-x-20">
//     {/* Imagen/Slideshow (arriba en móvil, izquierda en escritorio) */}
//     <div className="w-full lg:w-1/2 flex items-center justify-center -mb-3 lg:mb-0">
//         <Slideshow />
//     </div>

//     {/* Formulario (abajo en móvil, derecha en escritorio) */}
//     <div className="w-full lg:w-1/3 bg-white p-6 rounded-md shadow-md">
//         <form className="space-y-6">
//             <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//                     Cédula o Pasaporte
//                 </label>
//                 <input
//                     id="email"
//                     name="email"
//                     type="text"
//                     required
//                     autoComplete="email"
//                     className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                 />
//             </div>

//             <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                     Contraseña
//                 </label>
//                 <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     autoComplete="current-password"
//                     className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                 />
//                 <div className="mt-2 text-right text-sm">
//                     <a href="#" className="text-indigo-600 hover:text-indigo-500">
//                         ¿Olvidaste tu contraseña?
//                     </a>
//                 </div>
//             </div>

//             <div className="flex justify-between items-center w-full">
//     <Link
//         to="/pacientedash"
//         className="bg-blue-600 text-white px-8 py-2 w-1/2 max-w-[150px] rounded-md hover:bg-blue-700 transition text-center"
//     >
//         Iniciar
//     </Link>
//     <Link
//         to="/register"
//         className="bg-green-600 text-white px-8 py-2 w-1/2 max-w-[150px] rounded-md hover:bg-green-700 transition text-center"
//     >
//         Registrar
//     </Link>
// </div>

//         </form>
//     </div>
// </div>
            
//         </>
//         )
//     }

import { CalendarDays, Facebook, Instagram, Phone, PhoneIcon, Twitter, Users2, YoutubeIcon } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

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

export default function Example() {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // AGREGA ESTO

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const encoder = new TextEncoder();
            const passwordBytes = Array.from(encoder.encode(password));

            // Primer paso: login
            const response = await fetch(`http://${window.location.hostname}:5010/api/User/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users_id: cedula,
                    users_password: password
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || "Credenciales inválidas.");
                return;
            }

            const data = await response.json();
            console.log("Usuario logueado:", data);

            // Segundo paso: obtener el rol del usuario
            const roleResponse = await fetch(`http://${window.location.hostname}:5010/api/User/role/${cedula}`);
            const roleData = await roleResponse.json();
            const userRole = roleData.users_roleSerial;


           // Redireccionar según el rol
            if (userRole === 2003) {
                navigate('/pacientedash');
            } else if (userRole === 1) {
                navigate('/doctordash');
            } else if (userRole === 2002) {
                navigate('/admindash');
            } else {
                setError('Rol desconocido. Contacta al administrador.');
            }

        } catch (err) {
            setError("Error al conectar con el servidor.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="flex items-start justify-center min-h-0 bg-[#14304E] pt-0">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center h-40 w-40 bg-[#14304E]">
                        <img
                            alt="Hospital Logo"
                            src="\logLogin.png"
                            className="h-30 w-40"
                        />
                    </div>
                    <h1 className="text-6xl font-bold tracking-tight text-white">
                        Zentrum Medical
                    </h1>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-16 gap-y-8 lg:gap-y-0 lg:gap-x-20">
                {/* Slideshow */}
                <div className="w-full lg:w-1/2 flex items-center justify-center -mb-3 lg:mb-0">
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
                            <div className="mt-2 text-right text-sm">
                                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between items-center w-full">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-8 py-2 w-1/2 max-w-[150px] rounded-md hover:bg-blue-700 transition text-center"
                            >
                                Iniciar
                            </button>
                            <Link
                                to="/register"
                                className="bg-green-600 text-white px-8 py-2 w-1/2 max-w-[150px] rounded-md hover:bg-green-700 transition text-center"
                            >
                                Registrar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
