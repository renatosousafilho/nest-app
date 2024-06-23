import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './cats/cats.module';
import { databaseConfig } from './database/sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
