import { CalendarDays, Facebook, Instagram, Phone, PhoneIcon, Twitter, Users2, YoutubeIcon} from 'lucide-react';

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

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
                <div className="flex min-h-full flex-1 flex-row items-start justify-center px-6 py-20 lg:px-30 translate-x-[40px]">
            
            <div className="flex items-center justify-center lg:mr-10">
                <Slideshow/>
            </div>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                    >
                    Cédula o Pasaporte
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Contraseña
                    </label>
                    <div className="text-sm">
                        <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                        Olvidaste tu contraseña?
                        </a>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
                <div className="space-y-4">
                    <Link
                        to="/doctordash"
                        className="ml-40 bg-blue-600 text-white px-15 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        Iniciar sesión
                    </Link>
                        <Link
                            to="/register"
                            className="ml-40 bg-green-600 text-white px-19 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2">
                            Registrar 
                        </Link>
</div>
                </form>
            </div>
            </div>
        </>
        )
    }