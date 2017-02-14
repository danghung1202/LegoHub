import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromThemes from '../reducers';
import { ThemeActions } from '../actions';
import { Theme } from '../models';

@Component({
  selector: 'filter-button',
  templateUrl: './filter-button.component.html',
})
export class FilterButton {
  selectedOption: string;
  themes: Observable<Theme[]>;

  constructor(public dialog: MdDialog, private store: Store<fromThemes.AppState>,
    private heroActions: ThemeActions, ) {

  }

  openDialog() {

    let dialogRef = this.dialog.open(FilterPanel);
    //dialogRef.componentInstance.themes = this.themes;

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanel implements OnInit {
  themes: Observable<Theme[]>;
  constructor(public dialogRef: MdDialogRef<FilterPanel>, private store: Store<fromThemes.AppState>,
    private heroActions: ThemeActions, ) { }

  ngOnInit() {
    this.store.select('themes').subscribe((data: fromThemes.ThemesState) => {
      this.themes = Observable.of(data.themes);
    });
  }
}
