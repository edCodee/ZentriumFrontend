import React, { useState } from 'react';

const FormularioUsuario = () => {
    const [mensaje, setMensaje] = useState('');
    const [userData, setUserData] = useState({
        users_serial: 0,
        users_id: '',
        users_firstName: '',
        users_middleName: '',
        users_lastName: '',
        users_secondLastName: '',
        users_email: '',
        users_userName: '',
        users_password: '',
        users_dateOfBirth: '',
        users_createdAt: new Date().toISOString(),
        users_updatedAt: new Date().toISOString(),
        users_roleSerial: 1,
        users_photo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleGuardar = async () => {
        try {
            const res = await fetch('http://localhost:5010/api/User', {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (res.ok) {
                const location = res.headers.get("location");
                setMensaje(`Usuario insertado correctamente. Ver: ${location}`);
            } else {
                const error = await res.text();
                setMensaje(`Error al insertar: ${error}`);
            }
        } catch (error) {
            setMensaje(`Error de red: ${error.message}`);
        }
    };

    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '1.5rem'
            }}>Registro de Usuario</h2>
            <form>
                {[
                    { label: 'ID:', name: 'users_id', type: 'text' },
                    { label: 'Primer Nombre:', name: 'users_firstName', type: 'text' },
                    { label: 'Segundo Nombre:', name: 'users_middleName', type: 'text' },
                    { label: 'Apellido:', name: 'users_lastName', type: 'text' },
                    { label: 'Segundo Apellido:', name: 'users_secondLastName', type: 'text' },
                    { label: 'Correo Electrónico:', name: 'users_email', type: 'email' },
                    { label: 'Nombre de Usuario:', name: 'users_userName', type: 'text' },
                    { label: 'Contraseña (Base64):', name: 'users_password', type: 'password' },
                    { label: 'Fecha de Nacimiento:', name: 'users_dateOfBirth', type: 'date' },
                ].map((field, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#555'
                        }}>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={userData[field.name]}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleGuardar} style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#007bff',
                    color: 'red',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Guardar
                </button>
            </form>
            {mensaje && <p style={{
                marginTop: '1rem',
                color: mensaje.includes('Error') ? '#dc3545' : '#28a745',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{mensaje}</p>}
        </div>
    );
};

export default FormularioUsuario;