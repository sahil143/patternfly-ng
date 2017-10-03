import {
  Component,
  DoCheck,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { PaginationConfig } from './pagination-config';

/**
 * Component for rendering pagination
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent implements OnInit, DoCheck, OnChanges {

  /**
   * The Pagination config contaning component properties
   */
  @Input() config: PaginationConfig;

  /**
   * The Event is emitted when Page Size is changed
   */
  @Output('onPageSizeSelect') onPageSizeSelect = new EventEmitter();

  /**
   * The Event is emitted when Page Number is Changed
   */
  @Output('onPageNumberSelect') onPageNumberSelect = new EventEmitter();


  private defaultConfig = {
    pageNumber: 1,
    pageSizeIncrements: [5, 10, 20, 40, 80, 100],
    pageSize: 5
  } as PaginationConfig
  private prevConfig: PaginationConfig;
  lastPageNumber: number;

  /**
   * The default constructor
   */
  constructor() {}

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    this.lastPageNumber = this.getLastPageNumber();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Called when properties value are changed
   * @param changes obj of type SimpleChanges containing old and new value
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numTotalItems && !changes.numTotalItems.isFirstChange()) {
      this.lastPageNumber = this.getLastPageNumber();
      this.gotoFirstPage();
    }
  }

  /**
   * Setup default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  /**
   * Page size is changed
   * @param newPageSize new page size
   */
  private onPageSizeChange(newPageSize: number): void {
    this.config.pageSize = newPageSize;
    this.lastPageNumber = this.getLastPageNumber();
    this.gotoFirstPage();
    this.onPageSizeSelect.emit({
      pageSize: newPageSize
    });
  }

  /**
   * Page number is changed using input field
   * @param value new page number
   */
  private onPageNumberChange(value: any): void {
    let newPageNumber = parseInt(value, 10);
    if (newPageNumber > this.lastPageNumber) {
      this.updatePageNumber(this.lastPageNumber);
    } else if (newPageNumber < 1 || isNaN(this.config.pageNumber)) {
      this.updatePageNumber(1);
    } else {
      this.updatePageNumber(newPageNumber);
    }
  }

  /**
   * Jump to First Page
   */
  private gotoFirstPage(): void {
    if (this.config.pageNumber !== 1) {
      this.updatePageNumber(1);
    }
  }

  /**
   * Go to Previous Page
   */
  private gotoPreviousPage(): void {
    if (this.config.pageNumber !== 1) {
      this.updatePageNumber(this.config.pageNumber - 1);
    }
  }

  /**
   * Go to Next Page
   */
  private gotoNextPage(): void {
    if (this.config.pageNumber < this.lastPageNumber) {
      this.updatePageNumber(this.config.pageNumber + 1);
    }
  }

  /**
   * Jump to Last Page
   */
  private gotoLastPage(): void {
    if (this.config.pageNumber < this.lastPageNumber) {
      this.updatePageNumber(this.lastPageNumber);
    }
  }

  /**
   * Start Index of Current Page
   */
  private getStartIndex(): number {
    return this.config.numTotalItems ? this.config.pageSize * (this.config.pageNumber - 1) + 1 : 0;
  }

  /**
   * End Index of Current Page
   */
  private getEndIndex(): number {
    let numFullPages = Math.floor(this.config.numTotalItems / this.config.pageSize);
    let numItemsOnLastPage = this.config.numTotalItems - (numFullPages * this.config.pageSize) || this.config.pageSize;
    let numItemsOnPage = this.isLastPage() ? numItemsOnLastPage : this.config.pageSize;
    return this.config.numTotalItems ? this.getStartIndex() + numItemsOnPage - 1 : 0;
  }

  /**
   * Update the Page Number
   * @param newPageNumber new page number
   */
  private updatePageNumber(newPageNumber: number): void {
    this.config.pageNumber = newPageNumber;
    this.onPageNumberSelect.emit({
      pageNumber: newPageNumber
    });
  }

  /**
   * Get Last Page Number
   */
  private getLastPageNumber(): number {
    return Math.ceil(this.config.numTotalItems / this.config.pageSize);
  }

  /**
   * Check if current Page is Last Page
   */
  private isLastPage(): boolean {
    return this.config.pageNumber === this.lastPageNumber;
  }
}