import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import * as dotenv from 'dotenv';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: false,
  migrations: [__dirname + '/../**/database/migrations/*{.ts,.js}'],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export default config;
