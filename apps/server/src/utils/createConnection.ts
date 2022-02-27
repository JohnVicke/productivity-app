import { createConnection as _createConnection } from 'typeorm';
import { Exercise } from '../entities/Exercise';
import { User } from '../entities/User';
import { Workout } from '../entities/Workout';

export const createConnection = async () =>
  _createConnection({
    name: 'connection',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'training_log_db',
    entities: [User, Exercise, Workout],
    migrations: ['src/migrations/**/*.js'],
    synchronize: true,
  });
