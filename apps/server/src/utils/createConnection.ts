import { createConnection as _createConnection } from 'typeorm';
import { Todo } from '../entities/Todo';
import { User } from '../entities/User';

export const createConnection = async () =>
  _createConnection({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Todo],
    migrations: ['src/migrations/**/*.js'],
    synchronize: true,
  });
