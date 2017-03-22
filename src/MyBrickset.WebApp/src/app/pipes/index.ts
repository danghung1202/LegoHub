import { NgModule } from '@angular/core';
import { StarPipe } from './star.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
    imports: [],
    declarations: [StarPipe, SearchPipe],
    exports: [StarPipe, SearchPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
} 