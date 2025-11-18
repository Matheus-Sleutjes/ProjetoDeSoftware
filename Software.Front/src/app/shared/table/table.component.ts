import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionDefinition, ColumnDefinition, PagedList } from './table.models';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent<T> {

  @Input({ required: true }) columns: ColumnDefinition[] = [];

  @Input({ required: true }) action: ActionDefinition[] = [];

  private _pagedList: PagedList<T> | null = null;

  @Input({ required: true })
  get pagedList(): PagedList<T> | null {
    return this._pagedList;
  }
  set pagedList(value: PagedList<T> | null) {
    this._pagedList = value;
  }

  @Output() pagedListChange = new EventEmitter<PagedList<T>>();

  searchTerm: string = '';

  onPrevious(): void {
    if (this.pagedList && this.pagedList.pageNumber > 1) {
      const updatedPagedList: PagedList<T> = {
        ...this.pagedList,
        pageNumber: this.pagedList.pageNumber - 1
      };
      this.pagedListChange.emit(updatedPagedList);
    }
  }

  onNext(): void {
    if (this.pagedList && this.pagedList.pageNumber < this.pagedList.totalPages) {
      const updatedPagedList: PagedList<T> = {
        ...this.pagedList,
        pageNumber: this.pagedList.pageNumber + 1
      };
      this.pagedListChange.emit(updatedPagedList);
    }
  }

  onSearch(): void {
    if (this.pagedList) {
      const pagedListWithSearch: PagedList<T> = {
        ...this.pagedList,
        search: this.searchTerm || ''
      };
      this.pagedListChange.emit(pagedListWithSearch);
    }
  }

  getRoute(route: string | undefined, item: any): string {
    if (!route) return '';
    if (route.includes(':id') && item) {
      const id = item.userId || item.patientId || item.doctorId || item.appointmentId || item.specialtyId || item.id || '';
      if (id) {
        return route.replace(':id', id);
      }
    }
    return route;
  }
}
