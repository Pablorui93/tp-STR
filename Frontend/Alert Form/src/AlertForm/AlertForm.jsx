import React, { useState } from 'react';

function AlertForm() {
    // 1. Estado para almacenar el mensaje que se enviará
    const [mensaje, setMensaje] = useState('🚨 Alerta manual desde el frontend');
    // 2. Estado para feedback al usuario
    const [estado, setEstado] = useState('');

    // 3. Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página

        setEstado('Enviando alerta...');

        try {
            // 4. Petición POST a tu endpoint de Flask
            const response = await fetch('http://localhost:5000/alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // 5. El body debe ser un JSON que Flask pueda parsear
                body: JSON.stringify({ mensaje: mensaje }),
            });

            // 6. Verifica si la respuesta fue exitosa
            if (response.ok) {
                const data = await response.json();
                setEstado(`✅ Alerta enviada con éxito: "${data.mensaje_enviado}"`);
            } else {
                setEstado('❌ Error al enviar la alerta al servidor.');
            }
        } catch (error) {
            // 7. Manejo de errores de red (e.g., Flask no está corriendo)
            setEstado('🚨 Error de conexión. Asegúrate de que el servidor Flask esté activo.');
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1 style={{color:'white'}}>Enviar Alerta a Telegram</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mensajeInput">Mensaje:</label>
                <textarea
                    id="mensajeInput"
                    rows="4"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                    required
                />
                <button
                    type="submit"
                    style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Enviar Alerta
                </button>
            </form>
            {/* 8. Muestra el estado de la operación */}
            <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{estado}</p>

            {/* Visualización del flujo de conexión */}

        </div>
    );
}

export default AlertForm;