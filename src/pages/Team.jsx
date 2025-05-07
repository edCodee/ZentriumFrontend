import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { Hospital, User, Users } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Example() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-4xl font-semibold tracking-tight text-white">Dejanos tu correo para contactarte</h2>
                <p className="mt-4 text-lg text-gray-300">
                Ten en cuenta tener una hoja de vida que cumpla con estandares elevados para este hospital.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                    Email address
                </label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Ingresa tu email"
                    autoComplete="email"
                    className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Enviar
                </button>
                </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <Hospital aria-hidden="true" className="size-6 text-white" />
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Personal Médico</dt>
                <dd className="mt-2 text-base/7 text-gray-400">
                Accede a tu espacio médico personalizado, donde la precisión y el cuidado se encuentran con la tecnología. Inicia sesión para gestionar consultas, analizar historiales y optimizar la atención, todo en un entorno intuitivo y seguro.
                </dd>
                </div>
                <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <Users aria-hidden="true" className="size-6 text-white" />
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Personal Administrativo</dt>
                <dd className="mt-2 text-base/7 text-gray-400">
                Accede a tu portal administrativo y optimiza la gestión con facilidad. Inicia sesión para supervisar procesos, coordinar tareas y mantener el flujo de trabajo en un entorno seguro y eficiente.
                </dd>
                </div>
                <div className="flex flex-row items-center justify-start ml-1 gap-35">
                        <Link
                            to="/login"
                            className="bg-green-600 text-white px-15 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                        >
                            Ingresar
                        </Link>

                        <Link
                            to="/login"
                            className="bg-green-600 text-white px-15 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            Ingresar
                        </Link>
</div>

            </dl>
            </div>
        </div>
        <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
            <div
            style={{
                clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
        </div>
        </div>
    )
}
