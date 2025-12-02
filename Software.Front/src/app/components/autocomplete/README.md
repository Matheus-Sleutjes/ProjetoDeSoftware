# Componente Autocomplete

Componente reutilizável de autocomplete com busca integrada ao backend.

## Características

- Busca com debounce configurável
- Integração com Reactive Forms (ControlValueAccessor)
- Dropdown estilizado seguindo o padrão do sistema
- Suporte a busca mínima de caracteres
- Opção de limpar seleção
- Totalmente tipado com TypeScript

## Como Usar

### 1. Importar o componente

```typescript
import { AutocompleteComponent, AutocompleteOption } from '../../../components/autocomplete/autocomplete.component';

@Component({
  // ...
  imports: [CommonModule, ReactiveFormsModule, AutocompleteComponent],
})
export class SeuComponent {
  // ...
}
```

### 2. Preparar as opções no TypeScript

```typescript
export class SeuComponent implements OnInit {
  opcoes: AutocompleteOption[] = [];
  
  ngOnInit() {
    this.carregarOpcoes('');
  }
  
  carregarOpcoes(termo: string): void {
    this.seuService.buscar(termo).then(
      (resultado: any[]) => {
        this.opcoes = resultado.map(item => ({
          id: item.id,
          displayLabel: `${item.codigo} - ${item.nome}`,
          data: item // opcional: dados completos do item
        }));
      }
    );
  }
  
  onBusca(termo: string): void {
    this.carregarOpcoes(termo);
  }
}
```

### 3. Usar no template HTML

```html
<app-autocomplete
  label="Nome do Campo"
  placeholder="Digite para buscar..."
  [required]="true"
  [options]="opcoes"
  [debounceTime]="300"
  [minChars]="0"
  formControlName="campoId"
  (searchChange)="onBusca($event)"
></app-autocomplete>

@if (form.get('campoId')?.invalid && form.get('campoId')?.touched) {
  <div class="text-danger small mt-1">
    Campo é obrigatório.
  </div>
}
```

## Propriedades (Inputs)

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `label` | string | '' | Label do campo |
| `placeholder` | string | 'Digite para buscar...' | Placeholder do input |
| `required` | boolean | false | Se o campo é obrigatório (adiciona *) |
| `options` | AutocompleteOption[] | [] | Array de opções para o dropdown |
| `debounceTime` | number | 300 | Tempo em ms para debounce da busca |
| `minChars` | number | 0 | Número mínimo de caracteres para iniciar busca |

## Eventos (Outputs)

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `searchChange` | EventEmitter<string> | Emitido quando o usuário digita (com debounce) |
| `optionSelected` | EventEmitter<AutocompleteOption \| null> | Emitido quando uma opção é selecionada |

## Interface AutocompleteOption

```typescript
export interface AutocompleteOption {
  id: number | string;
  displayLabel: string;
  data?: any;
}
```

## Exemplo Completo

Veja o arquivo `appointment-create.component.ts` para um exemplo de uso real com busca de pacientes e médicos.

