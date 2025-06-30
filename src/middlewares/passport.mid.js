import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
<<<<<<< HEAD
import { usersRepository } from "../repositories/repository.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import verifyEmail from "../helpers/verifyEmail.helper.js";
import Cart from "../dao/mongo/models/carts.model.js";

const callbackURL = process.env.BASE_URL
  ? `${process.env.BASE_URL}/api/auth/google/redirect`
  : "http://localhost:8000/api/auth/google/redirect";
=======
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
<<<<<<< HEAD
      usernameField: "email",
=======
      usernameField: "email" 
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
    },
    async (req, email, password, done) => {
      try {
        if (!req.body.city) {
          return done(null, null, { message: "Invalid data", statusCode: 400 });
        }
<<<<<<< HEAD
        let user = await usersRepository.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        user = await usersRepository.createOne(req.body);

        await Cart.create({ user_id: user._id, products: [] });

        await verifyEmail(user.email, user.verifyCode);
=======
        let user = await usersManager.readBy({ email });
        if (user) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
<<<<<<< HEAD

=======
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
<<<<<<< HEAD
        let user = await usersRepository.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const { isVerified } = user;
        if (!isVerified) {
          return done(null, null, {
            message: "Please verify your account!",
            statusCode: 401,
          });
        }
        const data = {
          _id: user._id,
=======
        let user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        const data = {
          user_id: user._id,
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
          email: user.email,
          role: user.role,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
<<<<<<< HEAD

=======
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
passport.use(
  "user",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
<<<<<<< HEAD
        const { _id, email, role } = data;
        const user = await usersRepository.readBy({
          _id,
          email,
          role,
        });
=======
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id: user_id, email, role });
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
        if (!user) {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
<<<<<<< HEAD

=======
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
<<<<<<< HEAD
        const { _id, email, role } = data;
        const user = await usersRepository.readBy({
          _id,
          email,
          role,
        });
=======
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id: user_id, email, role });
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
        if (!user || user.role !== "ADMIN") {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
<<<<<<< HEAD

=======
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
<<<<<<< HEAD
        const { email, name, picture } = profile;
        let user = await usersRepository.readBy({ email });
        if (!user) {
          user = {
            email,
=======
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await usersManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
<<<<<<< HEAD
          user = await usersRepository.createOne(user);
          await Cart.create({ user_id: user._id, products: [] });
        }
        const data = {
          _id: user._id,
=======
          user = await usersManager.createOne(user);
        }
        const data = {
          user_id: user._id,
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
          email: user.email,
          role: user.role,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

<<<<<<< HEAD
export default passport;
=======
export default passport;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
