import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() show = false;
  @Input() title: string = 'Confirmar';
  @Input() body: string = 'Tem certeza que deseja realizar esta ação?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmButtonClass: string = 'btn-primary';
  @Input() cancelButtonClass: string = 'btn-secondary';
  @Input() titleIcon: string = 'fa-exclamation-triangle';
  @Input() titleIconClass: string = 'text-warning';
  @Input() showTitleIcon: boolean = true;
  @Input() bodyAsHtml: boolean = false; // Se true, renderiza body como HTML
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}

