import { Component, EventEmitter, Input, Output, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface AutocompleteOption {
  id: number | string;
  displayLabel: string;
  data?: any;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() placeholder: string = 'Digite para buscar...';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() options: AutocompleteOption[] = [];
  @Input() debounceTime: number = 300;
  @Input() minChars: number = 0;
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<AutocompleteOption | null>();

  searchControl = new FormControl('');
  filteredOptions: AutocompleteOption[] = [];
  showDropdown = false;
  selectedOption: AutocompleteOption | null = null;
  private previousSelectedOption: AutocompleteOption | null = null;
  
  private destroy$ = new Subject<void>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const searchTerm = value || '';
        // Só busca se não tem opção selecionada (evita buscar após selecionar)
        if (!this.selectedOption) {
          if (searchTerm.length >= this.minChars) {
            this.searchChange.emit(searchTerm);
            this.filterOptions(searchTerm);
            this.showDropdown = true;
          } else {
            this.filteredOptions = [];
            this.showDropdown = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (value) {
      const option = this.options.find(opt => opt.id === value);
      if (option) {
        this.selectedOption = option;
        this.searchControl.setValue(option.displayLabel, { emitEvent: false });
      }
    } else {
      this.selectedOption = null;
      this.searchControl.setValue('', { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }

  onInputFocus(): void {
    this.onTouched();
    // Se já tem uma opção selecionada, salva e limpa o campo para nova busca
    if (this.selectedOption) {
      this.previousSelectedOption = this.selectedOption;
      this.selectedOption = null;
      this.searchControl.setValue('', { emitEvent: true });
      this.searchControl.enable();
    }
    const searchTerm = this.searchControl.value || '';
    if (searchTerm.length >= this.minChars) {
      this.searchChange.emit(searchTerm);
      this.filterOptions(searchTerm);
      this.showDropdown = true;
    } else if (this.minChars === 0) {
      // Se minChars é 0, emite busca vazia para carregar todas as opções
      this.searchChange.emit('');
      this.showDropdown = true;
    }
  }

  onInputBlur(): void {
    // Delay to allow click on option
    setTimeout(() => {
      // Se não tem opção selecionada, restaura o valor anterior
      if (!this.selectedOption) {
        if (this.previousSelectedOption) {
          // Restaura a seleção anterior
          this.selectedOption = this.previousSelectedOption;
          this.searchControl.setValue(this.previousSelectedOption.displayLabel, { emitEvent: false });
          this.onChange(this.previousSelectedOption.id);
        } else {
          // Limpa o campo
          this.searchControl.setValue('', { emitEvent: false });
          this.onChange(null);
        }
        this.previousSelectedOption = null;
      }
      this.showDropdown = false;
    }, 200);
  }

  selectOption(option: AutocompleteOption): void {
    this.selectedOption = option;
    this.previousSelectedOption = option;
    this.searchControl.setValue(option.displayLabel, { emitEvent: false });
    this.onChange(option.id);
    this.optionSelected.emit(option);
    this.showDropdown = false;
  }

  clearSelection(): void {
    this.selectedOption = null;
    this.previousSelectedOption = null;
    this.searchControl.setValue('', { emitEvent: false });
    this.searchControl.enable();
    this.onChange(null);
    this.optionSelected.emit(null);
    this.filteredOptions = [];
    this.showDropdown = false;
    // Foca no input após limpar
    setTimeout(() => {
      const inputElement = document.querySelector('.autocomplete-wrapper input') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  }

  private filterOptions(searchTerm: string): void {
    const lowerSearch = searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter(option => 
      option.displayLabel.toLowerCase().includes(lowerSearch)
    );
  }
}

