import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DebitCard } from './models/debit-card.model';
import { Photo } from './models/photo.model';

@Module({
  imports: [SequelizeModule.forFeature([User, DebitCard, Photo])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
