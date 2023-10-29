import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { APIResult } from 'src/base/base.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({ where: { username: username } })
    }

    async findAll() {
        const results = await this.prisma.user.findMany({
            select: {
                email: true,
                active: true,
                firstName: true,
                lastLoggedIn: true,
                lastName: true,
                username: true
            }
        })

        return new APIResult(results)
    }

    async updateLastLoggedIn(pname: string) {
        await this.prisma.user.update({
            where: { username: pname },
            data: { lastLoggedIn: new Date() }
        })
    }

}
