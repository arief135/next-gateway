import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { REQUEST } from '@nestjs/core';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isMatch = await bcrypt.compare(pass, user.passwordHash)
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        // update lastLoggedin
        this.usersService.updateLastLoggedIn(username)

        const payload = { username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload, { expiresIn: '30d' }),
        };
    }
}
