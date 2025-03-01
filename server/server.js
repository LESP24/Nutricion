const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para permitir solicitudes desde el frontend
app.use(cors());
app.use(express.json());

// Configuración de Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com', // Cambia esto
        pass: 'tucontraseña' // Cambia esto
    }
});

// Ruta para enviar correos de confirmación de citas
app.post('/confirmar-cita', (req, res) => {
    const { nombre, correo, fecha } = req.body;

    const mailOptions = {
        from: 'tucorreo@gmail.com',
        to: correo,
        subject: