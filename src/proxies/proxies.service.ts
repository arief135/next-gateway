import { Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProxiesService {

  constructor(private prisma: PrismaService) { }

  create(createProxyDto: CreateProxyDto) {
    return 'This action adds a new proxy';
  }

  findAll() {
    return this.prisma.proxy.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} proxy`;
  }

  update(id: number, updateProxyDto: UpdateProxyDto) {
    return `This action updates a #${id} proxy`;
  }

  remove(id: number) {
    return `This action removes a #${id} proxy`;
  }
}
