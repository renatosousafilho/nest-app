import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: ':memory:',
  autoLoadModels: true,
  synchronize: true,
};
