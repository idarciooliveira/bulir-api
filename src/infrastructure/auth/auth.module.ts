import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './passport/constants';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthenticateUser } from 'src/application/usecases/users/authenticate-user';

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
        AuthenticateUser,
    ],
    exports: [AuthService],
})
export class AuthModule { }