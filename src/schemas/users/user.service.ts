import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/db/models/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private connection: Connection,
        private readonly nestJwt: JwtService
    ) { }

    async userLogin(
        email: string,
        password: string
    ): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        );

        if (!user) {
            throw new NotFoundException(`User ${email} does not exist`);
        }

        if (!isPasswordMatching) {
            throw new NotAcceptableException('the password is incorrect');
        }
        const payload = { userId: user.id, email:user.email };
        const token = this.nestJwt.sign(payload);

        const data = {
            data: user,
            token
        }
        return data;
    }

    async createUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ): Promise<Object> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!firstName) {
                throw new NotAcceptableException('firstName is required!');
            }

            if (!lastName) {
                throw new NotAcceptableException('lastName is required!');
            }
            if (!email) {
                throw new NotAcceptableException('email is required!');
            }

            if (!password) {
                throw new NotAcceptableException('password cannot be empty');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                email,
                firstName,
                lastName,
                password: hashedPassword
            }
            const createdUser = await this.userRepository.create(newUser);
            await queryRunner.manager.save(createdUser);
            await queryRunner.commitTransaction();
            return newUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}
