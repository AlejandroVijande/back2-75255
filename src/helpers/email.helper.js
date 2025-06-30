import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

const sendEmail = async (email, subject = "MAIL DE PRUEBA", html = "<h1>CORREO DE PRUEBA CON NODEMAILER</h1>") => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
};

const sendPasswordRecoveryEmail = async (email, token) => {
  const link = `${process.env.BASE_URL}/reset-password/${token}`;
  const subject = "Recupera tu contraseña";
  const html = `
    <h1>Recuperación de contraseña</h1>
    <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
    <a href="${link}">${link}</a>
    <br/><br/>
    <b>Este enlace expirará en 1 hora.</b>
  `;
  await sendEmail(email, subject, html);
};

export { transport, sendPasswordRecoveryEmail };
export default sendEmail;
