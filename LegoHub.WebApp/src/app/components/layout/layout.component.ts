import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'b-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout.component.html',
    styles: [`
       md-nav-list {
           padding-top: 0px;
       }

       md-nav-list:last-child {
           margin-bottom: 64px;
       }

       .sort-radio-group{
           display: inline-flex;
           flex-direction: column;
           padding: 8px 64px 8px 16px;
       }

       .sort-radio-button{
            margin: 5px;
       }
    `]
})
export class LayoutComponent { 
    thisYear: number = (new Date()).getFullYear();
    
    @Input() themes;
    @Input() years;
    @Input() sortCriterias;
    @Input("openedSortSidenav") opened;

    @Output() sortByChange = new EventEmitter(); 
    @Output() closeSortSidenav=new EventEmitter(); 
}