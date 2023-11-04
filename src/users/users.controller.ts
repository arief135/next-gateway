import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll() {
      return this.usersService.findAll();
    }
  
}
