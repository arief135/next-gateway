import { Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { PrismaService } from 'src/prisma.service';
import { ProxyEntity } from './entities/proxy.entity';
import { APIResult } from 'src/base/base.interface';

@Injectable()
export class ProxiesService {

  constructor(private prisma: PrismaService) { }

  create(createProxyDto: CreateProxyDto) {
    return 'This action adds a new proxy';
  }

  async findAll() {

    const proxy = await this.prisma.proxy.findMany()
    const creds = await this.prisma.credential.findMany({
      where: {
        id: {
          in: proxy.map(e => e.credential)
        }
      }
    })
    const credProps = await this.prisma.credentialProperties.findMany({
      where: {
        id: {
          in: proxy.map(e => e.credential)
        }
      }
    })

    const results: ProxyEntity[] = proxy.map(e => {
      const entity = e as ProxyEntity
      entity.credentialInfo = creds.find(f => f.id = e.credential)
      entity.credentialProperties = credProps.filter(f => f.id == e.credential)
      return entity
    })

    return new APIResult(results)
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
