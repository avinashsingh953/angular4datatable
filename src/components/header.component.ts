import { Component, Inject, forwardRef,OnInit } from '@angular/core';
import { DataTable } from './table.component';
import { HEADER_TEMPLATE } from './header.template';
import { HEADER_STYLE } from "./header.style";


@Component({
  selector: 'data-table-header',
  template: HEADER_TEMPLATE,
  styles: [HEADER_STYLE],
  host: {
    '(document:click)': '_closeSelector()'
  }
})
export class DataTableHeader implements OnInit {

    columnSelectorOpen = false;

    _closeSelector() {
        this.columnSelectorOpen = false;
    }

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {
      
    }
    get searchString() {
        return this.dataTable.searchString;
    }

    set searchString(value) {
        this.dataTable.searchString = value;
    }

    ngOnInit(){
      this.searchString="";
    }

    applySearch(){
      this.dataTable.applySearch();
    }
}
