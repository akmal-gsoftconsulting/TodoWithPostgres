import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';




export default  (passport) => {

  // const SECRET_KEY = process.env.JWT_SECRET;

  const SECRET_KEY = process.env.JWT_SECRET;

  // if (!SECRET_KEY) {
  //   throw new Error("JWT_SECRET is not defined");
  // }

  passport.use(
    new Strategy(
      {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (payload, done) => {
        try {
          const user = await User.findOne({ where: { id: payload.id } });

          if (user) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'User not found' });
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};



