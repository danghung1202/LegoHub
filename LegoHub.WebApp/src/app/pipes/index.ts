import { NgModule } from '@angular/core';
import { StarPipe } from './star.pipe';
import { SearchPipe } from './search.pipe';
import { SafePipe } from './url-safe.pipe';

@NgModule({
    imports: [],
    declarations: [StarPipe, SearchPipe, SafePipe],
    exports: [StarPipe, SearchPipe, SafePipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
} 