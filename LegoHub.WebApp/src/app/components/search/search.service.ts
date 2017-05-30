import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SearchService {
  // Observable string sources
  private onKeyDownSource = new Subject<number>();
  // Observable string streams
  onKeyDown$ = this.onKeyDownSource.asObservable();
  // Service message commands
  onKeyDown(keyCode: number) {
    this.onKeyDownSource.next(keyCode);
  }
  
}
