import 'reflect-metadata';
import { Server } from './server';
import { AuthConfig } from './types/AuthConfig';
import { loadEnviornment } from './utils/enviornment';

const main = async () => {
  loadEnviornment();
  const auth: AuthConfig = {
    googleClientID: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    slackClientID: process.env.SLACK_CLIENT_ID as string,
    slackClientSecret: process.env.SLACK_CLIENT_SECRET as string,
  };
  const server = new Server({ auth });
  server.start();
};

main().catch(err => console.error(`[ERROR]: ${err.message}`));
