// import { UserCircleIcon } from '@heroicons/react/24/solid'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// export default function InsertUserForm() {
//     const [photo, setPhoto] = useState(null);
//     const [photoBase64, setPhotoBase64] = useState(null);
//     const [status, setStatus] = useState("");
//     const [showSuccessModal, setShowSuccessModal] = useState(false); // 👉 modal
//     const [showErrorModal, setShowErrorModal] = useState(false); // 👉 modal

//     const navigate = useNavigate();

//     const handleCloseModal = () => {
//         setShowSuccessModal(false); // Cierra el modal
//         navigate('/login'); // Redirige a la página de Login
//     };

//     const handleCloseModalError = () => {
//         setShowErrorModal(false); // Cierra el modal
//         navigate('/register'); // Redirige a la página de Login
//     };

    

//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith("image/")) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64 = reader.result.split(',')[1]; // parte útil del base64
//                 setPhoto(reader.result); // Vista previa
//                 setPhotoBase64(base64);
//                 setStatus("¡Carga exitosa!");
//             };
//             reader.onerror = () => {
//                 setPhoto(null);
//                 setStatus("Error al leer el archivo.");
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setPhoto(null);
//             setPhotoBase64(null);
//             setStatus("Solo se permiten imágenes.");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const password = formData.get("users_password");

//         // Convertir la foto base64 a byte array
//         let byteArray = null;
//         if (photoBase64) {
//             const binary = atob(photoBase64);
//             byteArray = Array.from(binary, (char) => char.charCodeAt(0));
//         }

//         const user = {
//             user_serial: 0,
//             users_id: formData.get("users_id"),
//             users_userName: formData.get("users_userName"),
//             users_firstName: formData.get("users_firstName"),
//             users_middleName: formData.get("users_middleName") || null,
//             users_lastName: formData.get("users_lastName"),
//             users_secondLastName: formData.get("users_secondLastName") || null,
//             users_email: formData.get("users_email"),
//             users_password: btoa(password), // password en Base64
//             users_dateOfBirth: formData.get("users_dateOfBirth"),
//             users_createdAt: new Date().toISOString(),
//             users_updatedAt: null,
//             users_roleSerial: 2005,
//             users_photo: photoBase64 || null
//         };

//         try {
//             // const res = await fetch('http://localhost:5010/api/User', {
//             //     method: 'POST',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify(user),
//             // });

//             const res = await fetch(`http://${window.location.hostname}:5010/api/User`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(user),
//             });            
//             if (res.ok) {
//                 setPhoto(null);
//                 setPhotoBase64(null);
//                 setShowSuccessModal(true)
//             } else {
//                 setShowErrorModal(true)
//             }
//         } catch (err) {
//             console.error(err);
//             setStatus("Error de conexión.");
//         }
//     };



//     return (
//         <>
//         <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-10 p-8 bg-[#2d3748] rounded-xl shadow-md space-y-8  text-white">
//             <h2 className="text-2xl font-bold text-center text-teal-400">Registrate</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="users_id" className="block text-sm font-medium text-gray-700">Cédula o Pasaporte</label>
//                     <input type="text" id="users_id" name="users_id" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_userName" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
//                     <input type="text" id="users_userName" name="users_userName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_firstName" className="block text-sm font-medium text-gray-700">Primer Nombre</label>
//                     <input type="text" id="users_firstName" name="users_firstName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_middleName" className="block text-sm font-medium text-gray-700">Segundo Nombre</label>
//                     <input type="text" id="users_middleName" name="users_middleName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_lastName" className="block text-sm font-medium text-gray-700">Primer Apellido</label>
//                     <input type="text" id="users_lastName" name="users_lastName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_secondLastName" className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
//                     <input type="text" id="users_secondLastName" name="users_secondLastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
//                     <input type="email" id="users_email" name="users_email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_password" className="block text-sm font-medium text-gray-700">Contraseña</label>
//                     <input type="password" id="users_password" name="users_password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div>
//                     <label htmlFor="users_dateOfBirth" className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
//                     <input type="date" id="users_dateOfBirth" name="users_dateOfBirth" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
//                 </div>

//                 <div className="col-span-full">
//                     <label htmlFor="users_photo" className="block text-sm font-medium text-gray-700">Foto de perfil</label>
//                     <div className="mt-2 flex flex-col items-center gap-y-10">
//                         {photo ? (
//                             <div className="relative w-24 h-24">
//                                 <img src={photo} alt="Vista previa" className="w-full h-full object-cover rounded-full shadow-md" />
//                                 <p className="text-sm text-green-600 font-medium mt-2">{status}</p>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center">
//                                 <UserCircleIcon className="h-16 w-16 text-gray-300" />
//                                 <p className="text-gray-500 text-sm">Sin imagen cargada</p>
//                             </div>
//                         )}
//                         <input
//                             type="file"
//                             id="users_photo"
//                             name="users_photo"
//                             accept="image/*"
//                             className="mt-3 block text-sm text-gray-600 file:py-2 file:px-4 file:rounded-md file:border-none file:bg-indigo-500 file:text-white file:cursor-pointer hover:file:bg-indigo-500"
//                             onChange={handlePhotoChange}
//                         />
//                         {status && !photo && <p className="text-sm text-red-500 font-medium">{status}</p>}
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-center pt-6">
//                 <button
//                     type="submit"
//                     className="rounded-md bg-indigo-800 px-6 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500"
//                 >
//                     Guardar
//                 </button>
//             </div>

//             {status && <p className="text-center text-sm mt-4 font-medium text-indigo-800">{status}</p>}
//         </form>

//         <div>
//         {showSuccessModal && (
//     <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
//     >
//         <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-sm text-center">
//             <h2 className="text-2xl font-bold text-green-700 mb-4">
//                 ✅ Usuario creado con éxito
//             </h2>
//             <p className="text-gray-600 mb-6">
//                 Gracias por registrarte. Haz clic en OK para continuar.
//             </p>
//             <button
//                 onClick={handleCloseModal}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-semibold"
//             >
//                 OK
//             </button>
//         </div>
//     </div>
// )}
//         </div>


//         <div>
//         {showErrorModal && (
//     <div
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
//     >
//         <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-sm text-center">
//             <h2 className="text-2xl font-bold text-green-700 mb-4">
//             ❌ Error al crear usuario.
//             </h2>
//             <p className="text-gray-600 mb-6">
//                 Asegura que tus credenciales sean válidas.
//             </p>
//             <button
//                 onClick={handleCloseModalError}
//                 className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md font-semibold"
//             >
//                 OK
//             </button>
//         </div>
//     </div>
// )}
//         </div>


//         </>
//     );
// }

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function NewPatient() {
    const [photo, setPhoto] = useState(null);
    const [photoBase64, setPhotoBase64] = useState(null);
    const [status, setStatus] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    const handleCloseModalError = () => {
        setShowErrorModal(false);
        navigate('/register');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                setPhoto(reader.result);
                setPhotoBase64(base64);
                setStatus("¡Carga exitosa!");
            };
            reader.onerror = () => {
                setPhoto(null);
                setStatus("Error al leer el archivo.");
            };
            reader.readAsDataURL(file);
        } else {
            setPhoto(null);
            setPhotoBase64(null);
            setStatus("Solo se permiten imágenes.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const password = formData.get("users_password");

        let byteArray = null;
        if (photoBase64) {
            const binary = atob(photoBase64);
            byteArray = Array.from(binary, (char) => char.charCodeAt(0));
        }

        const user = {
            user_serial: 0,
            users_id: formData.get("users_id"),
            users_userName: formData.get("users_userName"),
            users_firstName: formData.get("users_firstName"),
            users_middleName: formData.get("users_middleName") || null,
            users_lastName: formData.get("users_lastName"),
            users_secondLastName: formData.get("users_secondLastName") || null,
            users_email: formData.get("users_email"),
            users_password: btoa(password),
            users_dateOfBirth: formData.get("users_dateOfBirth"),
            users_createdAt: new Date().toISOString(),
            users_updatedAt: null,
            users_roleSerial: 2003,
            users_photo: photoBase64 || null
        };

        try {
            const res = await fetch(`http://${window.location.hostname}:5010/api/User`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                setPhoto(null);
                setPhotoBase64(null);
                setShowSuccessModal(true);
            } else {
                setShowErrorModal(true);
            }
        } catch (err) {
            console.error(err);
            setStatus("Error de conexión.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 p-10 bg-[#2d3748] rounded-2xl shadow-xl space-y-10 text-white">
                <h2 className="text-3xl font-bold text-center text-teal-400">📝 Registro de Paciente</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[ 
                        { id: 'users_id', label: 'Cédula o Pasaporte' },
                        { id: 'users_userName', label: 'Nombre de Usuario' },
                        { id: 'users_firstName', label: 'Primer Nombre' },
                        { id: 'users_middleName', label: 'Segundo Nombre' },
                        { id: 'users_lastName', label: 'Primer Apellido' },
                        { id: 'users_secondLastName', label: 'Segundo Apellido' },
                        { id: 'users_email', label: 'Correo Electrónico', type: 'email' },
                        { id: 'users_password', label: 'Contraseña', type: 'password' },
                        { id: 'users_dateOfBirth', label: 'Fecha de nacimiento', type: 'date' },
                    ].map(({ id, label, type = 'text' }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
                            <input
                                type={type}
                                id={id}
                                name={id}
                                required={id !== 'users_middleName' && id !== 'users_secondLastName'}
                                className="mt-2 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-teal-400 focus:border-teal-400"
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <label htmlFor="users_photo" className="block text-sm font-medium text-gray-300 mb-2">Foto de perfil</label>
                    <div className="flex flex-col items-center gap-5">
                        {photo ? (
                            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-teal-500 shadow-lg">
                                <img src={photo} alt="Vista previa" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <UserCircleIcon className="h-20 w-20 text-gray-500" />
                                <p className="text-sm text-gray-400">Sin imagen</p>
                            </div>
                        )}
                        <input
                            type="file"
                            id="users_photo"
                            name="users_photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="block text-sm text-gray-200 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-500 transition-all"
                        />
                        {status && !photo && <p className="text-sm text-red-400 font-medium">{status}</p>}
                    </div>
                </div>

                <div className="flex justify-center gap-6 pt-6">
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-400 px-8 py-3 text-white font-bold rounded-lg transition-all"
                    >
                        Registrar j
                    </button>
                </div>

                {status && <p className="text-center text-sm mt-4 font-medium text-teal-300">{status}</p>}
            </form>

            {/* Modal éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Registro exitoso</h2>
                        <p className="mb-6">Paciente registrado correctamente.</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Modal error */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Error en el registro</h2>
                        <p className="mb-6">Verifica que todos los campos sean válidos.</p>
                        <button
                            onClick={handleCloseModalError}
                            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

