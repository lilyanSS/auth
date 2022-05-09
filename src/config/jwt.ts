import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: process.env.TIME }
});