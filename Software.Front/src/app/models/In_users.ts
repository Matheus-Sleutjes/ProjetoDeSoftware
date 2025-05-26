export interface In_Users {
    name: string,
    lastName: string,
    username: string,
    email: string,
    cpf: string,
    role: 'Médico' | 'Paciente';
}