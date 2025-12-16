export interface In_CreateAccount {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    cpf: string;
    phone?: string | null;
    birthDate?: string | null;
    role: 1 | 2 | 3; // 1: Admin, 2: Doctor, 3: Patient
}
