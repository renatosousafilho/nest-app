import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cat.model';
import { CatsServiceImpl } from './cats.service.interface';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useClass: CatsServiceImpl,
    },
  ],
})
export class CatsModule {}
