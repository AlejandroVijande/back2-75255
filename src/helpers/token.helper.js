import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(
<<<<<<< HEAD
      data,
      process.env.SECRET,
=======
      /* informacion a tokenizar */
      data,
      /* clave secreta para encriptar */
      process.env.SECRET,
      /* objeto de configuracion de la firma */
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
      { expiresIn: 7 * 24 * 60 * 60 }
    );
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};
const verifyToken = (token) => {
  try {
    const data = jwt.verify(
<<<<<<< HEAD
      token,
=======
      /* token a destokenizar */
      token,
      /* clave secreta para desencriptar */
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
      process.env.SECRET
    );
    return data;
  } catch (error) {
    error.statusCode = 403;
    throw error;
  }
};

export { createToken, verifyToken };