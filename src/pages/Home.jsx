import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CalendarDays, Facebook, Instagram, Phone, PhoneIcon, Twitter, Users2, YoutubeIcon} from 'lucide-react';
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import logo1 from '../assets/images/logHospital.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const Slideshow = () => {
        const images = [
        "/ruta-imagen4.png",
        "/ruta-imagen2.png",
        "/ruta-imagen3.png",
        "/ruta-imagen1.png",
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

const navigation = [
    { name: 'Pacientes y Visitantes', href: '#', current: false },
    { name: 'Especialidades', href: '#', current: false },
    { name: 'Servicios', href: '#', current: false },
    { name: 'Consejos de Salud', href: '#', current: false },
    { name: 'Academia', href: '#', current: false },
    { name: 'Internado', href: '#', current: false },
    { name: 'Agencias', href: '#', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <>
        <div className="min-h-full">
            <div className="bg-[#1E4D6B] py-2 px-4 flex items-center justify-between flex-wrap">
                {/* IZQUIERDA: Redes sociales */}
                <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                </a>
                <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <YoutubeIcon className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                </a>
                </div>
                {/* CENTRO: Teléfonos */}
                <div className="flex items-center gap-2 text-white text-sm">
                <Phone className="w-5 h-5" />
                <span>(+593) 983540311 - (+593) 405536</span>
                </div>
                {/* DERECHA: Enlaces */}
                <div className="flex items-center gap-4 text-white text-sm">
                {/* Enlace para unirse al equipo */}
                    <Link
                        to="/team"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors text-white"
                            >
                        <Users2 className="w-4 h-4" />
                        Únete a nuestro equipo
                    </Link>
                <a href="#" className="hover:text-gray-300 transition-colors">Noticias Zentrum</a>
                </div>
            </div>  
            <Disclosure
    as="nav"
    className="sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-90 transition duration-300"
>
    {({ open }) => (
        <>
        {/* FONDO VISUAL  */}
        <div className="relative h-20 w-full overflow-hidden bg-[#0D1A2B]">
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            {/* Tus elementos visuales con colores y formas */}
            <div className="absolute top-[-120px] left-20 w-025 h-10 border-l-[1px] border-r-[110px] border-b-[350px] border-l-transparent border-r-transparent border-b-[#122740] rotate-100"></div>
                <div className="absolute top-[-140px] left-[285px] w-[150px] h-[150px] bg-[#1A355A] rotate-160"></div>
                <div className="absolute top-[50px] left-[285px] w-[150px] h-[150px] bg-[#1A355A] rotate-200"></div>
                <div className="absolute top-[-140px] left-[700px] w-[150px] h-[150px] bg-[#1A355A] rotate-200"></div>
                <div className="absolute top-[50px] left-[700px] w-[150px] h-[150px] bg-[#1A355A] rotate-160 z-[999]"></div>
                <div className="absolute top-[-120px] left-295 w-025 h-10 border-l-[1px] border-r-[110px] border-b-[350px] border-l-transparent border-r-transparent border-b-[#1A355A] rotate-100 z-[999]"></div>
                <div className="absolute top-[40px] left-[830px] w-[300px] h-[300px] bg-[#122740] rotate-160 "></div>
            </div>

            {/* CONTENIDO NAVBAR ENCIMA  */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center">
                <img src={logo1} alt="Hospital Logo" className="h-30 w-auto" />
            </div>

            {/* ENLACES EN ESCRITORIO */}
            <div className="hidden md:flex md:items-center md:space-x-6">
                {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:bg-[#1E4D6B] px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                    {item.name}
                </a>
                ))}
                <Link
                to="/login"
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2 shadow-lg"
                >
                <CalendarDays className="w-5 h-5" />
                Agendar Cita
                </Link>
            </div>

            {/* BOTÓN HAMBURGUESA */}
            <div className="flex md:hidden">
                <Disclosure.Button className="text-gray-300 hover:text-white focus:outline-none">
                {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                ) : (
                    <Bars3Icon className="block h-6 w-6" />
                )}
                </Disclosure.Button>
            </div>
            </div>
        </div>

        {/* MENÚ MÓVIL */}
        <Disclosure.Panel className="md:hidden bg-[#14304E] border-t border-gray-600 relative z-10">
            <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
                <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className="block text-gray-300 hover:text-white hover:bg-[#1E4D6B] px-3 py-2 rounded-md text-base font-medium"
                >
                {item.name}
                </Disclosure.Button>
            ))}
            <Link
                to="/login"
                className="mt-2 inline-flex items-center bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition gap-2 w-full justify-center shadow-md"
            >
                <CalendarDays className="w-5 h-5" />
                Agendar Cita
            </Link>
            </div>
        </Disclosure.Panel>
        </>
    )}
</Disclosure>


            <header className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-50">
        <div className="flex justify-between items-center h-9">
        
        {/* Logo / Nombre del hospital */}
        <div className="flex-shrink-0 text-black items-center font-bold text-2xl">
            ZENTRUM MEDICIAL
        </div>
        </div>
    </div>
    </header>
    <main>
    <section className="bg-[#14304E] py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
        
        {/* Slideshow - sin animación específica por ahora */}
        <div className='md:w-1/2'>
        <Slideshow />
        </div>

        {/* Contenido animado */}
        <div className='md:w-1/2 text-center md:text-left'>

        {/* Título - de arriba hacia su posición */}
        <motion.h2
            className='text-4xl font-bold text-white mb-4'
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            Conoce la nueva app de Hospital ZentrumMedicial.
        </motion.h2>

        {/* Descripción - de derecha hacia su posición */}
        <motion.p
            className='text-lg text-white mb-6'
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <strong>HZentrum</strong> APP es más que una simple aplicación.<br />
            Es tu <strong>aliado integral</strong> para cuidar tu salud y la <br />
            de todos tus seres queridos.
        </motion.p>

        {/* Botones - desde abajo hacia su lugar */}
        <motion.div
            className='flex justify-center md:justify-start gap-4'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <a
            href="https://play.google.com/store"
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300'
            >
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M3.654 1.328a.82.82 0 00-.82.82v19.706c0 .715.821 1.161 1.387.76l14.76-9.74a.88.88 0 000-1.44L4.22 1.694a.819.819 0 00-.566-.166zM5.013 4.1l9.943 6.572-9.943 6.572V4.1z' />
            </svg>
            Google Play
            </a>
            <a
            href="https://apps.apple.com/"
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center bg-black hover:bg-gray-900 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300'
            >
            <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 384 512'>
                <path d="M318.7 268.7c-1.5-32.1 13.8-56.5 43.7-74.3-16.5-24-41.4-37.4-75.2-40.4-31.6-3-65.6 18.5-77.6 18.5-12.3 0-45.3-17.9-70.2-17.9C89.3 154.6 49 195.2 49 256c0 28.8 9.3 59.1 27.9 91.3 23.3 39.5 54.1 88.1 96.7 86.6 22.5-.8 38.9-16.4 70.3-16.4 30.8 0 45.9 16.4 70.1 16.4 43.1 0 70.3-50.4 92.4-90.2-59.1-28.2-55.4-82.5-55.7-84zM255.9 119c13.7-16.5 23.5-39.4 20.8-62.3-20.1 1.4-44.5 13.4-58.9 30.3-12.9 14.7-24.2 38.5-21.2 61.1 23 .2 46.1-13.2 59.3-29.1z" />
            </svg>
            App Store
            </a>
        </motion.div>

                </div>
                </div>
            </section>
            <div className="relative h-20 w-full bg-[#0D1A2B] overflow-hidden">
                <div className="absolute top-[-120px] left-20 w-025 h-10 border-l-[1px] border-r-[110px] border-b-[350px] border-l-transparent border-r-transparent border-b-[#122740] rotate-100"></div>
                <div className="absolute top-[-140px] left-[285px] w-[150px] h-[150px] bg-[#1A355A] rotate-160"></div>
                <div className="absolute top-[50px] left-[285px] w-[150px] h-[150px] bg-[#1A355A] rotate-200"></div>
                <div className="absolute top-[-140px] left-[700px] w-[150px] h-[150px] bg-[#1A355A] rotate-200"></div>
                <div className="absolute top-[50px] left-[700px] w-[150px] h-[150px] bg-[#1A355A] rotate-160 z-[999]"></div>
                <div className="absolute top-[-120px] left-295 w-025 h-10 border-l-[1px] border-r-[110px] border-b-[350px] border-l-transparent border-r-transparent border-b-[#1A355A] rotate-100 z-[999]"></div>
                <div className="absolute top-[40px] left-[830px] w-[300px] h-[300px] bg-[#122740] rotate-160 "></div>
            </div>


    {/* Acuerdate Joel */}

    <section id="equipo" className="bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestro Equipo</h2>
        {/* LISTA DE USUARIOS */}
        <ul role="list" className="divide-y divide-gray-100">
        <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Leslie Alexander</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">leslie.alexander@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Gererente</p>
        <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
        </div>
    </li>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Michael Foster</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">michael.foster@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Doctor</p>
        <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
        </div>
    </li>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Dries Vincent</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">dries.vincent@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Pediatra</p>
        <div class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="size-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p class="text-xs/5 text-gray-500">Online</p>
        </div>
        </div>
    </li>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Lindsay Walton</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">lindsay.walton@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Enfermera</p>
        <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
        </div>
    </li>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Courtney Henry</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">courtney.henry@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Paramédico</p>
        <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
        </div>
    </li>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
        <img className="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">Tom Cook</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">tom.cook@example.com</p>
        </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">Director General</p>
        <div class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="size-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p class="text-xs/5 text-gray-500">Online</p>
        </div>
        </div>
    </li>

            </ul>
        </div>
    </section>
        </main>    
            </div>
            </>
    )
}
