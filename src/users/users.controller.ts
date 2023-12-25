import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateEntity } from './entities/user.entity';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUser: UserCreateEntity) {
    return this.usersService.createUser(createUser)
  }

}
