import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/db/models/user.entity';
import { Role } from 'src/db/models/role.entity';

import { Rol } from '../../db/seeders/role/data';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private connection: Connection,
        private readonly nestJwt: JwtService
    ) { }

    async userLogin(
        email: string,
        password: string
    ): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] })
        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!user) {
            throw new NotFoundException(`User ${email} does not exist`);
        }

        if (!isPasswordMatching) {
            throw new NotAcceptableException('the password is incorrect');
        }
        const payload = { userId: user.firstName, email: user.email, role: user.role.name };
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
        lastName: string,
        isAdmin: boolean
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

            let role = null;
            if (isAdmin) {
                role = await this.roleRepository.findOne({ where: { name: Rol.Admin } });
            } else {
                role = await this.roleRepository.findOne({ where: { name: Rol.User } });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role
            }

            const createdUser = await this.userRepository.create(newUser);
            await queryRunner.manager.save(createdUser);
            await queryRunner.commitTransaction();

            const payload = { username: newUser.firstName, email: newUser.email, role: role.name };
            const token = this.nestJwt.sign(payload);

            const data = {
                data: newUser,
                token
            }
            return data;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async getUserDataById(
        userId: number
    ): Promise<any> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`userId: ${userId} does not exist.`);
        }
        return user;
    }

    async getUsers(): Promise<any[]> {
        const user = await this.userRepository.find({ where: { active: 1 } });
        return user;
    }
}
