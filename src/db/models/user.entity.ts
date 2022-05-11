import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity'
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: '250' })
    password: string;

    @Column({ default: true })
    active: boolean;

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn()
    role: Role
}