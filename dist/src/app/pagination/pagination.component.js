var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { PaginationConfig } from './pagination-config';
/**
 * Component for rendering pagination
 */
var PaginationComponent = (function () {
    /**
     * The default constructor
     */
    function PaginationComponent() {
        /**
         * The Event is emitted when Page Size is changed
         */
        this.onPageSizeSelect = new EventEmitter();
        /**
         * The Event is emitted when Page Number is Changed
         */
        this.onPageNumberSelect = new EventEmitter();
        this.defaultConfig = {
            pageNumber: 1,
            pageSizeIncrements: [5, 10, 20, 40, 80, 100],
            pageSize: 5
        };
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    PaginationComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        this.lastPageNumber = this.getLastPageNumber();
    };
    /**
     *  Check if the component config has changed
     */
    PaginationComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Called when properties value are changed
     * @param changes obj of type SimpleChanges containing old and new value
     */
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.totalItems && !changes.totalItems.isFirstChange()) {
            this.lastPageNumber = this.getLastPageNumber();
            this.gotoFirstPage();
        }
    };
    /**
     * Setup default config
     */
    PaginationComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Page size is changed
     * @param newPageSize new page size
     */
    PaginationComponent.prototype.onPageSizeChange = function ($event, newPageSize) {
        this.config.pageSize = newPageSize;
        this.lastPageNumber = this.getLastPageNumber();
        this.gotoFirstPage();
        this.onPageSizeSelect.emit({
            pageSize: newPageSize
        });
    };
    /**
     * Page number is changed using input field
     */
    PaginationComponent.prototype.onPageNumberChange = function ($event, value) {
        var newPageNumber = parseInt(value, 10);
        if (newPageNumber > this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
        else if (newPageNumber < 1 || isNaN(this.config.pageNumber)) {
            this.updatePageNumber(1);
        }
        else {
            this.updatePageNumber(newPageNumber);
        }
    };
    /**
     * Jump to First Page
     */
    PaginationComponent.prototype.gotoFirstPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(1);
        }
    };
    /**
     * Go to Previous Page
     */
    PaginationComponent.prototype.gotoPreviousPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(this.config.pageNumber - 1);
        }
    };
    /**
     * Go to Next Page
     */
    PaginationComponent.prototype.gotoNextPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.config.pageNumber + 1);
        }
    };
    /**
     * Jump to Last Page
     */
    PaginationComponent.prototype.gotoLastPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
    };
    PaginationComponent.prototype.getCurrentPage = function () {
        return this.getStartIndex() + " - " + this.getEndIndex();
    };
    /**
     * Start Index of Current Page
     */
    PaginationComponent.prototype.getStartIndex = function () {
        return this.config.totalItems ? this.config.pageSize * (this.config.pageNumber - 1) + 1 : 0;
    };
    /**
     * End Index of Current Page
     */
    PaginationComponent.prototype.getEndIndex = function () {
        var numFullPages = Math.floor(this.config.totalItems / this.config.pageSize);
        var numItemsOnLastPage = this.config.totalItems - (numFullPages * this.config.pageSize) || this.config.pageSize;
        var numItemsOnPage = this.isLastPage() ? numItemsOnLastPage : this.config.pageSize;
        return this.config.totalItems ? this.getStartIndex() + numItemsOnPage - 1 : 0;
    };
    /**
     * Update the Page Number
     * @param newPageNumber new page number
     */
    PaginationComponent.prototype.updatePageNumber = function (newPageNumber) {
        this.config.pageNumber = newPageNumber;
        this.onPageNumberSelect.emit({
            pageNumber: newPageNumber
        });
    };
    /**
     * Get Last Page Number
     */
    PaginationComponent.prototype.getLastPageNumber = function () {
        return Math.ceil(this.config.totalItems / this.config.pageSize);
    };
    /**
     * Check if current Page is Last Page
     */
    PaginationComponent.prototype.isLastPage = function () {
        return this.config.pageNumber === this.lastPageNumber;
    };
    return PaginationComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", PaginationConfig)
], PaginationComponent.prototype, "config", void 0);
__decorate([
    Output('onPageSizeSelect'),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "onPageSizeSelect", void 0);
__decorate([
    Output('onPageNumberSelect'),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "onPageNumberSelect", void 0);
PaginationComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-pagination',
        template: "<div class=\"content-view-pf-pagination list-view-pf-pagination clearfix\"><div class=\"form-group\"><div class=\"padding-right-10\"><div class=\"btn-group dropdown\" dropdown><button #pageSizeMenu class=\"btn btn-default dropdown-toggle\" dropdownToggle>{{config.pageSize}} <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" *dropdownMenu><li *ngFor=\"let increment of config?.pageSizeIncrements\" [ngClass]=\"{'selected': increment === config?.pageSize}\" class=\"display-length-increment\"><a role=\"menuitem\" (click)=\"onPageSizeChange($event, increment)\">{{increment}}</a></li></ul></div></div><span for=\"pageSizeMenu\" class=\"per-page-label\">per page</span></div><div class=\"form-group\"><span><span class=\"pagination-pf-item-current\">{{getCurrentPage()}}</span> of <span class=\"pagination-pf-items-total\">{{config.totalItems}}</span></span><ul class=\"pagination pagination-pf-back\"><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a title=\"First Page\" (click)=\"gotoFirstPage()\" class=\"goto-first-page\"><span class=\"i fa fa-angle-double-left\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a title=\"Previous Page\" (click)=\"gotoPreviousPage()\" class=\"goto-prev-page\"><span class=\"i fa fa-angle-left\"></span></a></li></ul><input type=\"text\" #pInput [ngModel]=\"config.pageNumber\" (keyup.enter)=\"onPageNumberChange($event, pInput.value)\" class=\"pagination-pf-page\" name=\"page\"> <span>of&nbsp;<span class=\"pagination-pf-pages\">{{ lastPageNumber }}</span></span><ul class=\"pagination pagination-pf-forward\"><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a title=\"Next Page\" (click)=\"gotoNextPage()\" class=\"goto-next-page\"><span class=\"i fa fa-angle-right\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a title=\"Last Page\" (click)=\"gotoLastPage()\" class=\"goto-last-page\"><span class=\"i fa fa-angle-double-right\"></span></a></li></ul></div></div>"
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map