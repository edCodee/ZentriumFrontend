import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function NewPatient() {
    const [photo, setPhoto] = useState(null);
    const [photoBase64, setPhotoBase64] = useState(null);
    const [status, setStatus] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`http://${window.location.hostname}:5010/api/Role`);
                const data = await response.json();
                setRoles(data);
                setSelectedRole(data.find(role => role.roles_name === "Paciente")?.roles_serial || "");
            } catch (error) {
                console.error("Error al cargar roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/admindash');
    };

    const handleCloseModalError = () => {
        setShowErrorModal(false);
        navigate('/admindash');
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
            users_roleSerial: parseInt(selectedRole),
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

                    <div>
                        <label htmlFor="users_roleSerial" className="block text-sm font-medium text-gray-300">Rol</label>
                        <select
                            id="users_roleSerial"
                            name="users_roleSerial"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-teal-400 focus:border-teal-400"
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map(role => (
                                <option key={role.roles_serial} value={role.roles_serial}>
                                    {role.roles_name}
                                </option>
                            ))}
                        </select>
                    </div>
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
                        Registrar
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
