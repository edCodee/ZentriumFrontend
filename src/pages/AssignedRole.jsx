import React, { useEffect, useState } from "react";

const AssignRoles = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://${window.location.hostname}:5010/api/User`);
            if (!response.ok) throw new Error("Error al obtener usuarios");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`http://${window.location.hostname}:5010/Api/User/Role`);
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
            return showUserMessage("⚠️ Selecciona un rol antes de asignar.");
        }

        const user = users.find(u => u.userSerial === userId);
        const alreadyAssigned = user.roles?.some(role => role.roleSerial === selectedRoleId);

        if (alreadyAssigned) {
            return showUserMessage("Este rol ya está asignado al usuario. No se puede asignar dos veces.");
        }

        try {
            setLoading(true);

            const response = await fetch(`http://${window.location.hostname}:5010/Api/UserRole`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userRoleUserSerial: userId,
                    userRoleRoleSerial: selectedRoleId,
                    userRolesAssinedAt: new Date().toISOString()
                })
            });

            if (!response.ok) throw new Error("Error al asignar rol");

            showUserMessage("Rol asignado correctamente.");
            await fetchUsers();

        } catch (error) {
            console.error("Error al asignar rol:", error);
            showUserMessage("Rol ya asignado al empleado");
        } finally {
            setLoading(false);
        }
    };

    const showUserMessage = (text) => {
        setMessage(text);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000); // auto-close
    };

    return (
        <div className="min-h-screen bg-[#1a202c] py-10 px-6 relative">

            <h2 className="text-3xl font-bold text-teal-300 text-center mb-8">Asignar Roles a Usuarios</h2>

            {/* Mensaje flotante */}
            {showMessage && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 border border-teal-500">
                    {message}
                </div>
            )}

            <div className="space-y-6 max-w-4xl mx-auto">
                {users.map(user => (
                    <div key={user.userSerial} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-4 rounded shadow gap-4">
                        <div className="text-left text-sm space-y-1 text-white">
                            <div><strong>Nombre:</strong> {`${user.userFirstName} ${user.userMiddleName} ${user.userLastName} ${user.userSecondLastName}`}</div>
                            <div><strong>Cédula:</strong> {user.userId}</div>
                            <div><strong>Usuario:</strong> {user.userUsername}</div>
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
