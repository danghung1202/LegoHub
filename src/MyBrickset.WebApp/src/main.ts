import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import './assets/css/styles.css'; 
import './assets/css/layout.scss';

platformBrowserDynamic().bootstrapModule(AppModule);