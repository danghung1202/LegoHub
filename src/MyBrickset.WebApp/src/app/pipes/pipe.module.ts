import { NgModule } from '@angular/core';
import { StarPipe } from './star.pipe';

@NgModule({
    imports: [],
    declarations: [StarPipe],
    exports: [StarPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
} 