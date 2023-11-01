import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProxyEntity } from './entities/proxy.entity';
import { APIResult } from 'src/base/base.interface';


@Injectable()
export class ProxiesService {

  constructor(private prisma: PrismaService) { }

  create(createProxy: ProxyEntity) {
    return this.prisma.proxy.create({
      data: {
        name: createProxy.name,
        endpoint: createProxy.endpoint,
        targetURL: createProxy.targetURL,
        status: createProxy.status,
        credential: {
          create: {
            credentialType: createProxy.credentialInfo.credentialType,
            CredentialProperties: {
              createMany: {
                data: createProxy.credentialProperties
              }
            }
          }
        },
        lastModifiedOn: new Date(),
        lastModifiedBy: createProxy.lastModifiedBy
      }
    })
  }

  async findAll() {

    const proxy = await this.prisma.proxy.findMany()
    const creds = await this.prisma.credential.findMany({
      where: {
        id: {
          in: proxy.map(e => e.credentialId)
        }
      }
    })
    const credProps = await this.prisma.credentialProperties.findMany({
      where: {
        credentialId: {
          in: proxy.map(e => e.credentialId)
        }
      }
    })

    const results: ProxyEntity[] = proxy.map(e => {
      const entity = e as ProxyEntity
      entity.credentialInfo = creds.find(f => f.id = e.credentialId)
      entity.credentialProperties = credProps.filter(f => f.credentialId == e.credentialId)
      return entity
    })

    return new APIResult(results)
  }

  findOne(id: number) {
    return `This action returns a #${id} proxy`;
  }

  update(id: number, updateProxy: ProxyEntity) {
    return `This action updates a #${id} proxy`;
  }

  remove(id: number) {
    return `This action removes a #${id} proxy`;
  }
}
