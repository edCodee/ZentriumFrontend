import { useState } from 'react';

export default function PatientSearch() {
    const [cedula, setCedula] = useState('');
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!cedula.trim()) return;

        try {
            const res = await fetch(`http://${window.location.hostname}:5010/api/User/ByCedula/${cedula.trim()}`);

            if (res.ok) {
                const data = await res.json();
                setPatient(data);
                setError('');
            } else if (res.status === 404) {
                setPatient(null);
                setError('Paciente no encontrado.');
            } else {
                setPatient(null);
                setError('Error al obtener los datos.');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión con el servidor.');
            setPatient(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a202c] text-white px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-teal-400 mb-10">
                    Buscar Paciente
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-teal-400 focus:border-teal-400"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-teal-500 hover:bg-teal-400 px-6 py-2 rounded-lg font-semibold text-white transition-all"
                    >
                        Buscar
                    </button>
                </div>

                {error && (
                    <div className="text-center text-red-400 font-medium mb-6">{error}</div>
                )}

                {patient && (
                    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
                        <table className="min-w-full table-auto text-sm bg-gray-800">
                            <thead className="bg-gray-700 text-teal-300">
                                <tr>
                                    <th className="px-4 py-3 text-left">Serial</th>
                                    <th className="px-4 py-3 text-left">Nombre Completo</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Fecha Nac.</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-200">
                                <tr className="border-t border-gray-600 hover:bg-gray-700">
                                    <td className="px-4 py-3">{patient.userSerial}</td>
                                    <td className="px-4 py-3">
                                        {patient.userFirstName} {patient.userMiddleName ?? ''} {patient.userLastName} {patient.userSecondLastName ?? ''}
                                    </td>
                                    <td className="px-4 py-3">{patient.userEmail}</td>
                                    <td className="px-4 py-3">{new Date(patient.userBirthDate).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
