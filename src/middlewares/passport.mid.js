import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { usersRepository } from "../repositories/repository.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import verifyEmail from "../helpers/verifyEmail.helper.js";
import Cart from "../dao/mongo/models/carts.model.js";

const callbackURL = process.env.BASE_URL
  ? `${process.env.BASE_URL}/api/auth/google/redirect`
  : "http://localhost:8000/api/auth/google/redirect";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        if (!req.body.city) {
          return done(null, null, { message: "Invalid data", statusCode: 400 });
        }
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
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
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

passport.use(
  "user",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { _id, email, role } = data;
        const user = await usersRepository.readBy({
          _id,
          email,
          role,
        });
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

passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { _id, email, role } = data;
        const user = await usersRepository.readBy({
          _id,
          email,
          role,
        });
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
        const { email, name, picture } = profile;
        let user = await usersRepository.readBy({ email });
        if (!user) {
          user = {
            email,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await usersRepository.createOne(user);
          await Cart.create({ user_id: user._id, products: [] });
        }
        const data = {
          _id: user._id,
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

export default passport;
