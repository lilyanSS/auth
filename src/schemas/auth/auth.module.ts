import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { GqlAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from './jwt';

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
