/*
 * Angular bootstraping
 */
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

import './styles/theme.scss';
import './styles/styles.scss';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).catch(err => console.error(err));