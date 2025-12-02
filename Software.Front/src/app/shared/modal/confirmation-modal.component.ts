import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (show) {
      <div class="modal-backdrop fade show" (click)="onBackdropClick()"></div>
      <div class="modal fade show d-block" tabindex="-1" role="dialog" style="z-index: 1055;">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="fas fa-exclamation-triangle me-2 text-warning"></i>
                {{ title }}
              </h5>
              <button type="button" class="btn-close" (click)="onClose()" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div [innerHTML]="body"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="onCancel()">
                Não
              </button>
              <button type="button" class="btn btn-danger" (click)="onConfirm()">
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() show = false;
  @Input() title: string = 'Confirmar';
  @Input() body: string = 'Tem certeza que deseja realizar esta ação?';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onClose(): void {
    this.cancel.emit();
  }

  onBackdropClick(): void {
    this.cancel.emit();
  }
}

