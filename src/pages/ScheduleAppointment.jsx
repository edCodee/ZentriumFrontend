import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function ScheduleAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        appointmentDoctorProfile: '',
        appointmentScheduledDatetime: '',
        appointReason: '',
    });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/apiDoctorProfile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'text/plain',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
            })
            .catch((err) => console.error('Error cargando doctores:', err));
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://hospitalapi20250709061843-bxcva0e6e2euacbv.canadacentral-01.azurewebsites.net/apiAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    appointmentDoctorProfile: parseInt(form.appointmentDoctorProfile),
                    appointmentScheduledDatetime: form.appointmentScheduledDatetime,
                    appointReason: form.appointReason,
                }),
            });

            if (res.ok) {
                setMessage('Cita agendada con éxito');
                setShowModal(true);
                setForm({
                    appointmentDoctorProfile: '',
                    appointmentScheduledDatetime: '',
                    appointReason: '',
                });
            } else {
                alert('Error al agendar cita');
            }
        } catch (err) {
            console.error('Error enviando cita:', err);
        } finally {
            setLoading(false);
        }
    };

    const getMinTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (`0${now.getMonth() + 1}`).slice(-2);
        const day = (`0${now.getDate()}`).slice(-2);
        return `${year}-${month}-${day}T08:00`;
    };

    const getMaxTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (`0${now.getMonth() + 1}`).slice(-2);
        const day = (`0${now.getDate()}`).slice(-2);
        return `${year}-${month}-${day}T18:00`;
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/pacientedash');
    };

    return (
        <div className="min-h-screen bg-[#01274C] flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-gradient-to-br from-[#06A2DB]/90 to-[#015B97]/90 text-white rounded-3xl shadow-2xl p-10 space-y-6 border border-[#50C878]/20"
            >
                <h2 className="text-3xl font-bold text-center text-[#50C878]">Agendar Cita Médica</h2>
                <p className="text-center text-sm text-[#E0F2F1]">Completa el formulario para reservar tu consulta</p>

                {/* Doctor */}
                <div>
                    <label className="block mb-2 text-[#E0F2F1]">Selecciona el Doctor</label>
                    <select
                        name="appointmentDoctorProfile"
                        value={form.appointmentDoctorProfile}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    >
                        <option value="">-- Selecciona un doctor --</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.doctorProfileSerial} value={doctor.doctorProfileSerial}>
                                Dr. {doctor.doctorProfileFirstName} {doctor.doctorProfileLastName} - {doctor.doctorProfileSpeciality} ({doctor.doctorProfileYearsExperience} años exp.)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha y hora */}
                <div>
                    <label className="block mb-2 text-[#E0F2F1]">Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        name="appointmentScheduledDatetime"
                        value={form.appointmentScheduledDatetime}
                        onChange={handleChange}
                        min={getMinTime()}
                        max={getMaxTime()}
                        required
                        className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none"
                    />
                    <p className="text-xs text-gray-200 mt-1">Horario de atención: 08:00 - 18:00</p>
                </div>

                {/* Motivo */}
                <div>
                    <label className="block mb-2 text-[#E0F2F1]">Motivo de la consulta</label>
                    <textarea
                        name="appointReason"
                        value={form.appointReason}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Describe brevemente el motivo de tu cita"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-white text-[#01274C] focus:outline-none resize-none"
                    />
                </div>

                {/* Botón */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                    >
                        {loading ? 'Agendando...' : 'Agendar Cita'}
                    </button>
                </div>
            </form>

            {/* Modal elegante */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#01274C]/60 backdrop-blur-md">
                    <div className="relative bg-gradient-to-br from-[#06A2DB]/80 to-[#015B97]/80 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-[#01274C]/50 animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-4 text-[#50C878]">Aviso</h2>
                        <p className="mb-4 text-sm leading-relaxed text-[#E0F2F1]">{message}</p>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="bg-[#50C878]/80 hover:bg-[#50C878] text-[#01274C] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
