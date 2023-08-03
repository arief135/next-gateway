import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';

@Controller('proxies')
export class ProxiesController {
  constructor(private readonly proxiesService: ProxiesService) {}

  @Post()
  create(@Body() createProxyDto: CreateProxyDto) {
    return this.proxiesService.create(createProxyDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.proxiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proxiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProxyDto: UpdateProxyDto) {
    return this.proxiesService.update(+id, updateProxyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proxiesService.remove(+id);
  }
}
