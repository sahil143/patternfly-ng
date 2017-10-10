import { DoCheck, OnChanges, SimpleChanges, EventEmitter, OnInit } from '@angular/core';
import { PaginationConfig } from './pagination-config';
/**
 * Component for rendering pagination
 */
export declare class PaginationComponent implements OnInit, DoCheck, OnChanges {
    /**
     * The Pagination config contaning component properties
     */
    config: PaginationConfig;
    /**
     * The Event is emitted when Page Size is changed
     */
    onPageSizeSelect: EventEmitter<{}>;
    /**
     * The Event is emitted when Page Number is Changed
     */
    onPageNumberSelect: EventEmitter<{}>;
    private defaultConfig;
    private prevConfig;
    lastPageNumber: number;
    /**
     * The default constructor
     */
    constructor();
    /**
     *  Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     *  Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Called when properties value are changed
     * @param changes obj of type SimpleChanges containing old and new value
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Setup default config
     */
    protected setupConfig(): void;
    /**
     * Page size is changed
     * @param newPageSize new page size
     */
    private onPageSizeChange($event, newPageSize);
    /**
     * Page number is changed using input field
     */
    onPageNumberChange($event: Event, value: string): void;
    /**
     * Jump to First Page
     */
    gotoFirstPage(): void;
    /**
     * Go to Previous Page
     */
    gotoPreviousPage(): void;
    /**
     * Go to Next Page
     */
    gotoNextPage(): void;
    /**
     * Jump to Last Page
     */
    gotoLastPage(): void;
    getCurrentPage(): string;
    /**
     * Start Index of Current Page
     */
    getStartIndex(): number;
    /**
     * End Index of Current Page
     */
    getEndIndex(): number;
    /**
     * Update the Page Number
     * @param newPageNumber new page number
     */
    private updatePageNumber(newPageNumber);
    /**
     * Get Last Page Number
     */
    private getLastPageNumber();
    /**
     * Check if current Page is Last Page
     */
    private isLastPage();
}
