import { SetMetadata } from '@nestjs/common';
import { Rol } from '../../db/seeders/role/data';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles);