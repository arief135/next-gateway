import { Controller, 
  Get, Post, Body, Patch, Param, Delete, Request,  UseInterceptors, ClassSerializerInterceptor, Req } from '@nestjs/common';
import { ProxiesService } from './proxies.service';
import { ProxyEntity } from './entities/proxy.entity';


@Controller('proxies')
export class ProxiesController {
  constructor(private readonly proxiesService: ProxiesService) {}

  @Post()
  create(@Body() createProxy: ProxyEntity, @Request() req) {
    createProxy.lastModifiedBy = req.user.username
    return this.proxiesService.create(createProxy);
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

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateProxy: ProxyEntity, @Req() req) {
    updateProxy.lastModifiedBy = req.user.username
    updateProxy.lastModifiedOn = new Date()

    return this.proxiesService.update(uuid, updateProxy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proxiesService.remove(+id);
  }
}
