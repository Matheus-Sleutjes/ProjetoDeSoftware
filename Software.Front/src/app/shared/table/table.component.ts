import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionDefinition, ColumnDefinition, PagedList } from './table.models';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent<T> {

  @Input({ required: true }) columns: ColumnDefinition[] = [];

  @Input({ required: true }) action: ActionDefinition[] = [];

  @Input({ required: true }) pagedList: PagedList<T> | null = null;

  @Output() pageChange = new EventEmitter<number>();
  onPrevious(): void {
    if (this.pagedList && this.pagedList.pageNumber > 1) {
      this.pageChange.emit(this.pagedList.pageNumber - 1);
    }
  }

  /**
   * Emite o evento para ir para a próxima página.
   */
  onNext(): void {
    if (this.pagedList && this.pagedList.pageNumber < this.pagedList.totalPages) {
      this.pageChange.emit(this.pagedList.pageNumber + 1);
    }
  }

}
