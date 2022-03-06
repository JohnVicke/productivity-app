import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from './entities/User';
import { AuthConfig } from './types/AuthConfig';

export const serializeUser = async (
  _: any,
  user: any,
  done: (err: any, id?: any) => void,
) => {
  console.log(user);
  const { email } = user;
  const dbUser = await User.findOne({ where: { email: user.email } });
  if (!dbUser) {
    await User.create({
      firstName: user.name.givenName,
      lastName: user.name.familyName,
      email,
    }).save();
  }
  done(undefined, user);
};

export const deserializeUser = async (
  user: any,
  done: (err: any, id?: any) => void,
) => {
  done(undefined, user);
};

/*
  passport.deserializeUser(async (id, done) => {
    const userRepo = getConnection().getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    done(undefined, user);
}); */

export const getGoogleStrategy = (config: AuthConfig, callbackURL: string) => {
  const googleConfig = {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
  };
  return new GoogleStrategy(
    {
      ...googleConfig,
      callbackURL,
      proxy: true,
    },
    (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
      console.log('hello world');
      return done(null, profile);
    },
  );
};
export const getGoogleLogin = (config: AuthConfig) =>
  getGoogleStrategy(config, '/auth/google/login/callback');

export const getGoogleRegister = (config: AuthConfig) =>
  getGoogleStrategy(config, '/auth/google/register/callback');
