import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export default registerAs('database', () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SCHEMA } =
    process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    autoLoadEntities: true,
    entities: ['dist/infrastructure/entities/**/*{.js,.ts}'],
    migrations: ['dist/infrastructure/migrations/**/*{.js,.ts}'],
    synchronize: false,
    migrationsRun: false,
    schema: DB_SCHEMA || 'public',
    cli: {
      migrationsDir: 'src/infrastructure/migrations',
    },
  } as DataSourceOptions;
});
