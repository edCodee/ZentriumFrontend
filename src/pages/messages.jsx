import React, { useEffect, useState } from "react";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    // Detección de tipo MIME basada en la firma base64
    function getMimeType(base64) {
        // Asegúrate de que base64 es un string válido antes de operar
        if (!base64 || typeof base64 !== 'string') return null; 
        
        const signature = base64.substring(0, 20); 
        if (signature.includes("/9j/")) return "image/jpeg";
        if (signature.includes("iVBOR")) return "image/png";
        if (signature.includes("R0lGOD")) return "image/gif";
        if (signature.includes("UklGR")) return "image/webp";
        // Añade más tipos si es necesario, por ejemplo para PDFs si los manejas
        // if (signature.includes("JVBERi0xLj")) return "application/pdf";
        return null; // Retorna null si no es una firma de imagen reconocida
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch("https://localhost:7087/api/Messages", {
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) throw new Error("Error al obtener mensajes");

            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError("No se pudieron cargar los mensajes.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a202c] text-white px-6 py-10">
            <h1 className="text-3xl font-bold text-teal-300 text-center mb-8">Mensajes Recibidos</h1>

            {loading && <p className="text-center text-teal-400">Cargando mensajes...</p>}
            {error && <p className="text-center text-red-400">{error}</p>}

            <div className="grid gap-6 max-w-4xl mx-auto">
                {messages.map((msg, index) => {
                    // Ahora que el backend hace el trabajo, solo nos preocupamos por msg.messImage
                    const isMessageAnImage = msg.messImage && msg.messImage.length > 50; // Simplificamos la detección
                    const currentMimeType = isMessageAnImage ? getMimeType(msg.messImage) : null;

                    return (
                        <div
                            key={msg.messId}
                            className="bg-gradient-to-br from-[#012B49]/80 to-[#025C80]/80 border border-[#013C6A]/50 rounded-2xl p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-[#50C878] mb-2">Mensaje #{index + 1}</h2>

                            <p className="text-sm mb-1 text-[#E0F2F1]">
                                <strong>De:</strong> {msg.messUserNumber}
                            </p>

                            <p className="text-sm mb-1 text-[#E0F2F1]">
                                <strong>Fecha:</strong>{" "}
                                {/* Corregido: 'datetime' a 'dateTime' para evitar advertencia de React */}
                                <time dateTime={msg.messCreatedAt}> 
                                    {new Date(msg.messCreatedAt).toLocaleString("es-EC")}
                                </time>
                            </p>

                            {/* Mostrar imagen Base64 si está presente y es válida */}
                            {isMessageAnImage && currentMimeType && (
                                <img
                                    // Eliminado .trim().replace(/\s/g, "") ya que el problema no era de espacios
                                    src={`data:${currentMimeType};base64,${msg.messImage}`} 
                                    alt="Imagen del mensaje"
                                    className="mt-4 max-h-64 rounded-lg shadow border border-white"
                                    onError={(e) => {
                                        console.warn("❌ Imagen base64 inválida o malformada (frontend error):", msg.messImage.slice(0, 30));
                                        e.target.style.display = "none"; // Oculta la imagen rota
                                    }}
                                />
                            )}

                            {/* Mostrar el texto del mensaje si no es una imagen (o si la imagen no se pudo cargar) */}
                            {msg.messageTex && (
                                <p className="text-sm mb-2 text-white">
                                    <strong>Mensaje:</strong> {msg.messageTex}
                                </p>
                            )}
                            
                            {msg.messBootResponse && (
                                <p className="text-sm mb-2 text-teal-200">
                                    <strong>Bot:</strong> {msg.messBootResponse}
                                </p>
                            )}

                            <p className="text-xs text-gray-400 mt-2">
                                <strong>Estado de Conversación:</strong> {msg.messConversationState}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MessagesPage;