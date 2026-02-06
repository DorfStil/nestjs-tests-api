import type { ConfigService } from '@nestjs/config';
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import type { ConnectOptions } from 'mongoose';
import type { EnvConfig } from './env.config';

const getMongoString = (config: ConfigService<EnvConfig>): string => {
  const login = config.getOrThrow<string>('MONGO_LOGIN');
  const password = config.getOrThrow<string>('MONGO_PASSWORD');
  const host = config.getOrThrow<string>('MONGO_HOST');
  const port = config.getOrThrow<string>('MONGO_PORT');
  const authDb = config.getOrThrow<string>('MONGO_AUTH_DATABASE');

  return `mongodb://${encodeURIComponent(login)}:${encodeURIComponent(
    password,
  )}@${host}:${port}/${authDb}`;
};

const getMongoOptions = (config: ConfigService<EnvConfig>): ConnectOptions => ({
  authSource: config.get('MONGO_AUTH_DATABASE'),
  retryWrites: true,
  w: 'majority',
});

export const getMongoConfig = (
  config: ConfigService<EnvConfig>,
): MongooseModuleFactoryOptions => ({
  uri: getMongoString(config),
  ...getMongoOptions(config),
});
