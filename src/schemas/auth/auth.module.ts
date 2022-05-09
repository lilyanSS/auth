import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { GqlAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from '../../config/jwt';

@Module({
  imports: [
    AuthModule,
    jwtConfig
  ],
  providers: [
    AuthService,
    GqlAuthGuard,
    JwtStrategy
  ],
  exports: [
    jwtConfig
  ]
})
export class AuthModule { }
