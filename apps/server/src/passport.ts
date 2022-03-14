import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import argon from 'argon2';
import { Profile } from 'passport';
import jwt from 'jsonwebtoken';
import { AuthConfig } from './types/AuthConfig';
import { User } from './entities/User';
import { ThirdPartyId } from './types';
import { SerializedUser } from './types/SerializedUser';

type VerifyCallback = (
  profile: any,
  id: ThirdPartyId,
  done: (error: any, user?: User) => void,
) => void;

const getUserFromThirdPartyId = (id: ThirdPartyId) => {
  if ('googleId' in id) {
    return User.findOne({ where: { ...id } });
  }
  return undefined;
};

const verifyThirdPartyLogin = async (
  _: Profile,
  id: ThirdPartyId,
  done: (error: any, user?: User) => void,
) => {
  try {
    const user = await getUserFromThirdPartyId(id);

    if (!user) {
      return done(new Error('did not find a user'), user);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const verifyThirdPartyRegistration = async (
  profile: Profile,
  id: ThirdPartyId,
  done: (error: any, user?: any) => void,
) => {
  try {
    const currentUser = await User.findOne({
      where: { ...id },
    });

    if (currentUser) {
      return done(new Error('user already exists'), profile);
    }

    const email = profile.emails?.[0]?.value;

    if (!email) {
      return done(new Error('No email'), profile);
    }

    const hashedEmail = await argon.hash(email);
    const name = {
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    };

    const user = await User.create({
      ...name,
      ...id,
      email: hashedEmail,
    }).save();

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const serializeUser = async (
  user: Express.User,
  done: (err: any, user?: SerializedUser) => void,
) => {
  const sessionUser = user as User;
  done(null, { id: sessionUser.id });
};

export const deserializeUser = async (
  user: SerializedUser,
  done: (err: any, user?: User | null) => void,
) => {
  try {
    const dbUser = await User.findOne({ where: { id: user.id } });
    if (!dbUser) return done(null, null);
    return done(null, dbUser);
  } catch (error) {
    return done(error);
  }
};

const getGoogleStrategy = (
  config: AuthConfig,
  callbackURL: string,
  verify: VerifyCallback,
) => {
  const googleConfig = {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
  };
  return new GoogleStrategy(
    {
      ...googleConfig,
      callbackURL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (err: any, user?: SerializedUser) => void,
    ) => verify(profile, { googleId: profile.id }, done),
  );
};

export const getJwtStrategy = () =>
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (token, done) => {
      try {
        const userToken = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
        ) as string;
        const user = token && (await User.findOne(userToken));
        done(null, user);
      } catch (error) {
        done(null, null);
      }
    },
  );

export const getGoogleLogin = (config: AuthConfig) =>
  getGoogleStrategy(
    config,
    '/auth/google/login/callback',
    verifyThirdPartyLogin,
  );

export const getGoogleRegister = (config: AuthConfig) =>
  getGoogleStrategy(
    config,
    '/auth/google/register/callback',
    verifyThirdPartyRegistration,
  );
