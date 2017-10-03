import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { PaginationConfig } from '../pagination-config';
import { PaginationComponent } from '../pagination.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pagination-example',
  templateUrl: './pagination-example.component.html'
})

export class PaginationExampleComponent implements OnInit {

  paginationConfig: PaginationConfig;
  actionsText: String = '';
  items: Array<any> = [];

  ngOnInit(): void {
    this.data();
    this.paginationConfig = {
      pageSize: 10,
      pageNumber: 1,
      numTotalItems: this.items.length
    } as PaginationConfig;
  }

  data() {
    for (let i = 1; i < 126; i++) {
      this.items.push({ id: i, status: 'Ok', value: Math.floor(Math.random() * (1000 - 1 + 1)) + 1 });
    }
  }

  handlePageSize(event) {
    this.actionsText ="Page Size: " + event.pageSize + " Selected" + "\n" + this.actionsText;
  }

  handlePageNumber(event) {
    this.actionsText ="Page Number: " + event.pageNumber + " Selected" + "\n" + this.actionsText;
  }

}