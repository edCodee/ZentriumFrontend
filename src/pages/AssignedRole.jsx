import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import necesario para redirección
import { useNavigate } from "react-router-dom";

const AssignRoles = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalUserId, setModalUserId] = useState(null);
    const [isDoctorRoleAssigned, setIsDoctorRoleAssigned] = useState(false); // para saber si mostrar el botón especial
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/api/User`);
            if (!response.ok) throw new Error("Error al obtener usuarios");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/api/User/roles`);
            if (!response.ok) throw new Error("Error al obtener roles");
            const data = await response.json();
            setRoles(data);
        } catch (error) {
            console.error("Error cargando roles:", error);
        }
    };

    const handleChange = (userId, roleId) => {
        setSelectedRoles(prev => ({
            ...prev,
            [userId]: roleId
        }));
    };

    const handleAssign = async (userId) => {
    const selectedRoleId = selectedRoles[userId];

    if (!selectedRoleId) {
        return showUserMessage("⚠️ Selecciona un rol antes de asignar.", false);
    }

    const user = users.find(u => u.userSerial === userId);
    const alreadyAssigned = user.roles?.some(role => role.roleSerial === selectedRoleId);

    if (alreadyAssigned) {
        return showUserMessage("Este rol ya está asignado al usuario. No se puede asignar dos veces.", false);
    }

    try {
        setLoading(true);

        const response = await fetch(`https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/api/UserRole`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userRoleUserSerial: userId,
                userRoleRoleSerial: selectedRoleId,
                userRoleAssignedAt: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error("Error al asignar rol");

        await fetchUsers();

        const assignedRole = roles.find(r => r.roleSerial === selectedRoleId);
        const isDoctor = assignedRole?.roleName.toLowerCase() === "doctor";

        showUserMessage(
        isDoctor
            ? "Has asignado el rol de doctor correctamente. Por favor completa su ficha médica."
            : "Rol asignado correctamente.",
        isDoctor,
        userId // asegúrate de pasar esto
        );


        // Si es doctor, espera 3 segundos y redirige
        if (isDoctor) {
            setTimeout(() => {
                setShowModal(false);
                navigate(`/createdoctorprofile/${userId}`);
            }, 3000); // 3000 ms = 3 segundos
        }

    } catch (error) {
        console.error("Error al asignar rol:", error);
        showUserMessage("Rol ya asignado al empleado", false);
    } finally {
        setLoading(false);
    }
};


const showUserMessage = (text, isDoctor, userId) => {
  setMessage(text);
  setIsDoctorRoleAssigned(isDoctor);
  setModalUserId(userId); // así se guarda
  setShowModal(true);
};




    const closeModal = () => {
        setShowModal(false);
        setIsDoctorRoleAssigned(false);
    };

    return (
        <div className="min-h-screen bg-[#1a202c] py-10 px-6 relative">

            <h2 className="text-3xl font-bold text-teal-300 text-center mb-8">Asignar Roles a Usuarios</h2>

            {/* Modal elegante */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#01274C]/60 backdrop-blur-md">
                    <div className="relative bg-gradient-to-br from-[#06A2DB]/80 to-[#015B97]/80 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-[#01274C]/50 animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-4 text-[#50C878]">Aviso</h2>
                        <p className="mb-4 text-sm leading-relaxed text-[#E0F2F1]">{message}</p>

                        {isDoctorRoleAssigned ? (
                            <div className="flex justify-center">
                                <Link
                                    to={`/createdoctorprofile/${modalUserId}`}
                                    className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                                >
                                    Completar Ficha Médica
                                </Link>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <button
                                    onClick={closeModal}
                                    className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                                >
                                    Continuar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-6 max-w-4xl mx-auto">
                {users.map(user => (
                    <div key={user.userSerial} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-4 rounded shadow gap-4">
                        <div className="text-left text-sm space-y-1 text-white">
                            <div><strong>Nombre:</strong> {`${user.userFirstName} ${user.userMiddleName} ${user.userLastName} ${user.userSecondLastName}`}</div>
                            <div><strong>Cédula:</strong> {user.userId}</div>
                            <div><strong>Usuario:</strong> {user.userUserName}</div>
                            <div><strong>Email:</strong> {user.userEmail}</div>
                            <div><strong>F. Nacimiento:</strong> {new Date(user.userBirthDate).toLocaleDateString("es-EC")}</div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <select
                                value={selectedRoles[user.userSerial] || ""}
                                onChange={(e) => handleChange(user.userSerial, parseInt(e.target.value))}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 w-full sm:w-auto text-white"
                            >
                                <option value="">Selecciona un rol</option>
                                {roles.map(role => (
                                    <option key={role.roleSerial} value={role.roleSerial}>
                                        {role.roleName}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleAssign(user.userSerial)}
                                disabled={loading}
                                className="bg-teal-400 text-white px-4 py-1 rounded hover:bg-teal-500 transition w-full sm:w-auto"
                            >
                                Asignar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignRoles;
