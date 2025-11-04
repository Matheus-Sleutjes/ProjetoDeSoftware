export interface ColumnDefinition {
  key: string;       // A propriedade do objeto (ex: 'nome' ou 'usuario.email')
  header: string;    // O texto para o cabeçalho (ex: 'Nome Completo')
}

export interface ActionDefinition {
  label: string;       
  route?: string;    // Optional - for navigation
  action?: (item: any) => void; // Optional - for click handlers
  icon: string;    
  color: string;    
}

export interface PagedList<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  totalPages: number;
  search?: string;
}