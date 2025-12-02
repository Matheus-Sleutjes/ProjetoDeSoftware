import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CpfValidator {
  
  /**
   * Valida se o CPF é válido
   */
  static validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      
      if (!cpf) {
        return null; // Se vazio, deixa o Validators.required lidar
      }

      // Remove caracteres não numéricos
      const cleanCpf = cpf.replace(/\D/g, '');

      // Verifica se tem 11 dígitos
      if (cleanCpf.length !== 11) {
        return { cpfInvalid: { value: cpf } };
      }

      // Verifica se todos os dígitos são iguais (CPF inválido)
      if (/^(\d)\1{10}$/.test(cleanCpf)) {
        return { cpfInvalid: { value: cpf } };
      }

      // Validação do primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
      }
      let digit = 11 - (sum % 11);
      if (digit >= 10) digit = 0;
      if (digit !== parseInt(cleanCpf.charAt(9))) {
        return { cpfInvalid: { value: cpf } };
      }

      // Validação do segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
      }
      digit = 11 - (sum % 11);
      if (digit >= 10) digit = 0;
      if (digit !== parseInt(cleanCpf.charAt(10))) {
        return { cpfInvalid: { value: cpf } };
      }

      return null; // CPF válido
    };
  }

  /**
   * Formata o CPF no padrão 000.000.000-00
   */
  static format(cpf: string): string {
    if (!cpf) return '';
    const cleanCpf = cpf.replace(/\D/g, '');
    
    if (cleanCpf.length !== 11) return cpf;
    
    return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  /**
   * Remove formatação do CPF
   */
  static clean(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
  }
}

