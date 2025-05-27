export interface In_Users {
    userId: number,
    name: string,
    lastName: string,
    username: string,
    email: string,
    cpf: string,
    role: 1 | 2 | 3, // 1: Admin, 2: Médico, 3: Paciente
}