import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cat.model';
import { CatsServiceImpl } from './cats.service.interface';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from '../auth/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useClass: CatsServiceImpl,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CatsModule {}
