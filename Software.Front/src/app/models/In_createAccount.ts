export interface In_CreateAccount {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    cpf: string;
    role: 1 | 2 | 3; // 1: Admin, 2: Doctor, 3: Patient
}
