import { estado } from "./estado.model"

export class usuario {
    id?: number
    nombres?: string
    correo?: string
    password?: string
    passwordR?: string
    idEstado?: number
    createdAt?: Date
    updatedAt?: Date
    Estado?: estado
}