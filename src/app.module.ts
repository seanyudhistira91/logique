import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { DebitCard } from './user/models/debit-card.model';
import { Photo } from './user/models/photo.model';
import { config } from 'dotenv';
import { UsersModule } from './user/user.module';
config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRE_HOST || 'localhost',
      port: parseInt(process.env.POSTGRE_PORT) || 5432,
      username: process.env.POSTGRE_USER || 'postgres',
      password: process.env.POSTGRE_PASS || '',
      database: process.env.POSTGRE_DB_NAME || 'logique',
      models: [User, DebitCard, Photo],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
