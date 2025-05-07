import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function InsertUserForm() {
    const [photo, setPhoto] = useState(null);
    const [photoBase64, setPhotoBase64] = useState(null);
    const [status, setStatus] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false); // 👉 modal

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
            users_password: Array.from(new TextEncoder().encode(password)),
            users_dateOfBirth: formData.get("users_dateOfBirth"),
            users_createdAt: new Date().toISOString(),
            users_updatedAt: null,
            users_roleSerial: 1,
            users_photo: null
        };

        try {
            const res = await fetch('http://localhost:5010/api/User', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                setPhoto(null);
                setPhotoBase64(null);
                setStatus("Usuario registrado con éxito.");
                setShowSuccessModal(true); // 👉 Mostrar modal
            } else {
                setStatus("Error al registrar. Intenta de nuevo.");
            }
        } catch (err) {
            console.error(err);
            setStatus("Error de conexión.");
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        window.location.href = '/'; // 👉 Cambia esto si tu ruta principal es otra
    };

    return (
        <>
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-10 p-8 bg-[#dcdcd8] rounded-xl shadow-md space-y-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">Registrate</h2>
                {/* ... Aquí va todo tu formulario igual como lo tienes ... */}
                <div className="flex justify-center pt-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-800 px-6 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500"
                    >
                        Save User
                    </button>
                </div>
                {status && <p className="text-center text-sm mt-4 font-medium text-indigo-800">{status}</p>}
            </form>

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-sm text-center">
                        <h2 className="text-2xl font-bold text-green-700 mb-4">✅ Usuario creado con éxito</h2>
                        <p className="text-gray-600 mb-6">Gracias por registrarte. Haz clic en OK para continuar.</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
