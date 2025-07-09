import React, { useEffect, useState } from 'react';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('https://localhost:7087/apiDoctorProfile/my-appointments', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*',
        },
        })
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((err) => console.error('Error cargando citas:', err));
    }, [token]);

    return (
        <div className="min-h-screen bg-[#01274C] p-6 flex flex-col items-center text-white">
        <div className="w-full max-w-5xl bg-gradient-to-br from-[#06A2DB]/90 to-[#015B97]/90 rounded-3xl shadow-2xl p-8 border border-[#50C878]/20">
            <h1 className="text-3xl font-bold text-[#50C878] mb-6 text-center">Mis Citas Asignadas</h1>

            {appointments.length === 0 ? (
            <p className="text-center text-[#E0F2F1]">No tienes citas programadas actualmente.</p>
            ) : (
            <div className="space-y-4">
                {appointments.map((appointment) => (
                <div
                    key={appointment.appointmentSerial}
                    className="bg-[#1A2B3C] rounded-xl p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-[#50C878]/30 transition"
                >
                    <div className="flex-1 space-y-1">
                    <p className="text-lg font-semibold text-white">
                        Paciente: {appointment.patientFirstName} {appointment.patientLastName}
                    </p>
                    <p className="text-sm text-gray-300">
                        Fecha: {new Date(appointment.scheduledAt).toLocaleString('es-EC', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        })}
                    </p>
                    <p className="text-sm text-gray-400">Motivo: {appointment.reason}</p>
                    <p className="text-sm text-[#50C878] font-medium">
                        Estado: {appointment.statusAppointment}
                    </p>
                    </div>

                    <div className="flex gap-3">
                    <button className="bg-[#50C878]/90 hover:bg-[#50C878] text-[#01274C] px-4 py-2 rounded-full transition hover:scale-105 shadow">
                        Atender
                    </button>
                    <button className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-full transition hover:scale-105 shadow">
                        Faltó
                    </button>
                    <button className="bg-gray-500/90 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition hover:scale-105 shadow">
                        Reprogramar
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
}
