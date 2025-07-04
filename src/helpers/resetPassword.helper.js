import { transport } from "./email.helper.js";

const verifyEmail = async (email, verifyCode) => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "MAIL DE RESETEO DE CONTRASEÑA",
      html: `
      <a href="${process.env.BASE_URL}reset/${email}">RESETEAR CONTRASEÑA!</a>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export default verifyEmail;