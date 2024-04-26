import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './user.service';
import { ApiKeyGuard } from './guard/api-key.guard';
import { ListUserDto } from './dto/list-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @UseGuards(ApiKeyGuard)
  create(@Body() registerData: RegisterUserDto): Promise<User> {
    return this.usersService.create(registerData);
  }

  @Get('/list')
  @UseGuards(ApiKeyGuard)
  findAll(@Query() query: ListUserDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch('/')
  @UseGuards(ApiKeyGuard)
  patch(@Body() data: PatchUserDto): Promise<User> {
    return this.usersService.patch(data);
  }
}
