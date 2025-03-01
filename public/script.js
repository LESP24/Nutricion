// Mostrar/ocultar descripciones de servicios
function mostrarDescripcion(id) {
    const descripcion = document.getElementById(id);
    if (descripcion.style.display === "none") {
        descripcion.style.display = "block";
    } else {
        descripcion.style.display = "none";
    }
}

// Calendario
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function (info) {
            const fecha = info.dateStr;
            const nombre = prompt("Ingresa tu nombre:");
            const correo = prompt("Ingresa tu correo:");

            if (nombre && correo) {
                // Confirmación de cita
                const message = `Hola, mi nombre es ${nombre}. Mi correo es ${correo}. Me gustaría agendar una cita para el día ${fecha}.`;
                const encodedMessage = encodeURIComponent(message);

                // Enviar mensaje de WhatsApp
                window.open(`https://wa.me/9631458105?text=${encodedMessage}`);

                // Guardar la cita (puedes integrarlo a tu backend si lo deseas)
                fetch('http://localhost:3000/confirmar-cita', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, correo, fecha })
                })
                .then(response => response.text())
                .then(result => alert('Cita agendada con éxito: ' + result))
                .catch(error => alert('Error al agendar la cita: ' + error));
            } else {
                alert('Por favor ingresa todos los datos para agendar la cita.');
            }
        },
        events: [
            { title: 'Cita 1', start: '2023-10-10' },
            { title: 'Cita 2', start: '2023-10-15' }
        ]
    });
    calendar.render();
});

// Formulario de Contacto y WhatsApp
document.getElementById('contactForm').onsubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const servicio = document.getElementById('servicio').value;
    const comments = document.getElementById('comments').value;

    const message = `Hola, mi nombre es ${name}. Mi correo es ${email}. Me interesa el servicio de ${servicio}. ${comments}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9631458105?text=${encodedMessage}`);
};

// Respuesta automática de WhatsApp (opcional)
const whatsappToken = 'your_whatsapp_api_token'; // Reemplaza con tu token de API de WhatsApp

function enviarRespuestaAutomatica(mensaje) {
    fetch('https://api.whatsapp.com/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${whatsappToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: '9631458105', // Número de WhatsApp
            text: mensaje
        })
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta enviada', data))
    .catch(error => console.error('Error al enviar respuesta automática:', error));
}

// Llamada para enviar respuesta automática al hacer clic en el botón de WhatsApp
document.querySelector('.whatsapp-float a').addEventListener('click', function () {
    enviarRespuestaAutomatica('¡Hola! Gracias por tu mensaje. ¿En qué servicio estás interesado?');
});
