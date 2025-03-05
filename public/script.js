// Mostrar/ocultar descripciones de servicios
function mostrarDescripcion(id) {
    const descripcion = document.getElementById(id);
    descripcion.style.display = (descripcion.style.display === "none") ? "block" : "none";
}

document.addEventListener('DOMContentLoaded', function () {
    // Inicialización del calendario
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true, // Permite seleccionar fechas
        dateClick: function(info) {
            // Mostrar el formulario de cita
            document.getElementById('formulario-cita').style.display = 'block';
            
            // Rellenar el campo de fecha con la fecha seleccionada
            document.getElementById('fecha-cita').value = info.dateStr;
        }
    });
    calendar.render();
});

// Función para cerrar el formulario de cita
function cerrarFormulario() {
    document.getElementById('formulario-cita').style.display = 'none';
}

// Manejar el envío del formulario de cita
document.getElementById("form-cita").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Obtén los valores de los campos del formulario
    const nombre = document.getElementById("nombre-cita").value.trim();
    const correo = document.getElementById("correo-cita").value.trim();
    const fecha = document.getElementById("fecha-cita").value.trim();

    // Verifica que todos los campos estén llenos
    if (nombre === "" || correo === "" || fecha === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Construye el mensaje que se enviará por WhatsApp
    const mensajeWhatsApp = `Hola, soy ${nombre}. Mi correo es ${correo}. Quiero agendar una cita para el ${fecha}.`;

    // Codifica el mensaje para que sea válido en una URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // Reemplaza "529631458105" con tu número de WhatsApp (en formato internacional, sin el signo +)
    const numeroWhatsApp = "529631458105"; // Ejemplo: 521234567890 para México

    // Crea la URL de WhatsApp con el número y el mensaje
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // Redirige a WhatsApp
    window.location.href = urlWhatsApp; // Abre en la misma ventana
    // window.open(urlWhatsApp, "_blank"); // Abre en una nueva pestaña
});
// Respuesta automática de WhatsApp (opcional)
const whatsappToken = 'your_whatsapp_api_token'; // Reemplaza con tu token de API de WhatsApp

function enviarRespuestaAutomatica(mensaje) {
    if (whatsappToken !== 'your_whatsapp_api_token') { // Verifica si el token ha sido configurado
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
    } else {
        console.log("Token de API de WhatsApp no configurado.");
    }
}

// Llamada para enviar respuesta automática al hacer clic en el botón de WhatsApp
document.querySelector('.whatsapp-btn a').addEventListener('click', function () {
    enviarRespuestaAutomatica('¡Hola! Gracias por tu mensaje. ¿En qué servicio estás interesado?');
});