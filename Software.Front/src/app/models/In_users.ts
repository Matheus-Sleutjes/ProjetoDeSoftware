export interface In_Users {
    id: number,
    name: string,
    lastName: string,
    username: string,
    email: string,
    cpf: string,
    role: 'Médico' | 'Paciente';
}