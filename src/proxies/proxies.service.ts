import { Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { PrismaService } from 'src/prisma.service';
import { Proxy } from './entities/proxy.entity';

@Injectable()
export class ProxiesService {

  constructor(private prisma: PrismaService) { }

  create(createProxyDto: CreateProxyDto) {
    return 'This action adds a new proxy';
  }

  async findAll(): Promise<Proxy[]> {

    const proxy = await this.prisma.proxy.findMany()
    const creds = await this.prisma.credentialProperties.findMany({
      where: {
        id: {
          in: proxy.map(e => e.credential)
        }
      }
    })

    return proxy.map(e => {
      return new Proxy(e, creds.filter(f => f.id == e.credential))
    })
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
