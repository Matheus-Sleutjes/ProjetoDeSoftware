import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastConfig {
  message: string;
  backgroundColor?: string;
  textColor?: string;
  duration?: number; // em milissegundos, padrão 3000ms
}

export interface Toast extends ToastConfig {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  constructor() { }

  /**
   * Mostra um toast com mensagem e estilos customizáveis
   * @param message Mensagem a ser exibida
   * @param backgroundColor Cor de fundo (ex: '#28a745', 'rgb(40, 167, 69)', 'green')
   * @param textColor Cor do texto (ex: '#ffffff', 'white', 'rgb(255, 255, 255)')
   * @param duration Duração em milissegundos (padrão: 3000ms)
   */
  show(
    message: string,
    backgroundColor?: string,
    textColor?: string,
    duration?: number
  ): void {
    const toast: Toast = {
      id: this.generateId(),
      message,
      backgroundColor: backgroundColor || '#333333',
      textColor: textColor || '#ffffff',
      duration: duration || 3000
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto-remover após a duração especificada
    setTimeout(() => {
      this.remove(toast.id);
    }, toast.duration);
  }

  /**
   * Remove um toast específico
   */
  remove(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
  }

  /**
   * Remove todos os toasts
   */
  clear(): void {
    this.toastsSubject.next([]);
  }

  /**
   * Gera um ID único para o toast
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

