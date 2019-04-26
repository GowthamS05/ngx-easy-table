import { Injectable } from '@angular/core';
import { cellClass, cellStyle, columnClass, rowClass, rowStyle } from '..';

@Injectable()
export class StyleService {
  public pinnedColumn = new Set<number>();

  setRowClass(val: rowClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row: HTMLTableRowElement = document.querySelector(selector);
    if (row) {
      row.className = val.className;
    }
  }

  setColumnClassStyle(val: columnClass): void {
    if (val.column < 1) {
      console.error('Column number need to be 1 or greater');
      return;
    }
    if (val.includeHeader) {
      const headerRows = document.querySelectorAll(`#table > thead tr > th:nth-child(${val.column})`);
      [].forEach.call(headerRows, (header) => {
        header.className = val.className;
      });
    }
    const columns = document.querySelectorAll(`#table > tbody tr > td:nth-child(${val.column})`);
    [].forEach.call(columns, (column) => {
      column.className = val.className;
    });
  }

  setColumnPinnedStyle(column: number, pinned: boolean): void {
    if (column < 1) {
      console.error('Column number need to be 1 or greater');
      return;
    }
    this.updatePinnedColumns(column, pinned);
    const cols = document.querySelectorAll(`#table tr > td:nth-child(${column}),th:nth-child(${column})`);
    const lengths = document.querySelectorAll('#table tr:nth-child(1) > td');
    let leftMargin = 0;
    console.log('Column:', column);
    console.log('pinned', pinned);
    console.log('cols:', cols);
    lengths.forEach((length, index) => {
      if (index < (column - 1)) {
        leftMargin = leftMargin + length.clientWidth;
      }
    });
    [].forEach.call(cols, (col: HTMLTableElement) => {
      if (pinned) {
        col.className = 'ngx-table__header-cell pinned-left';
        col.style.left = column > 1 ? `${leftMargin}px` : '0';
      } else {
        col.className = 'ngx-table__header-cell';
      }
    });
  }

  setCellClass(val: cellClass): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell: HTMLTableCellElement = document.querySelector(selector);
    if (cell) {
      cell.className = val.className;
    }
  }

  setRowStyle(val: rowStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row})`;
    const row: HTMLTableRowElement = document.querySelector(selector);
    if (row) {
      // tslint:disable-next-line:no-string-literal
      row.style[val.attr] = val.value;
    }
  }

  setCellStyle(val: cellStyle): void {
    const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
    const cell: HTMLTableCellElement = document.querySelector(selector);
    if (cell) {
      // tslint:disable-next-line:no-string-literal
      cell.style[val.attr] = val.value;
    }
  }

  private updatePinnedColumns(column: number, pinned: boolean) {
    if (pinned) {
      this.pinnedColumn.add(column);
    } else {
      this.pinnedColumn.delete(column);
    }
  }
}
