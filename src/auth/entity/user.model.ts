import * as mongoose from 'mongoose';
import { Role } from './role.enum';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: Role.USER }
})

export interface User extends mongoose.Document {
    id?: string;
    email?: string;
    password?: string;
    role?: Role;
}