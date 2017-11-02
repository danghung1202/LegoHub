import { FilterActions } from './filter.action';
import { SetListActions } from './set-list.action';
import { SetActions } from './set.action';
import { ErrorActions } from './error.action';
import { NavigationActions } from './navigation.action';
import { SettingActions } from './setting.action';
import { YoutubeActions } from './youtube.action';
import { SearchActions } from './search.action';
import { PinActions } from './pin.action';
import { ProgressBarActions } from './progress-bar.action';

export {
    FilterActions,
    SetListActions,
    ErrorActions,
    SetActions,
    NavigationActions,
    SettingActions,
    YoutubeActions,
    SearchActions,
    PinActions,
    ProgressBarActions
};

export const STATE_ACTIONS = [
    { provide: FilterActions, useClass: FilterActions },
    { provide: SetListActions, useClass: SetListActions },
    { provide: ErrorActions, useClass: ErrorActions },
    { provide: SetActions, useClass: SetActions },
    { provide: NavigationActions, useClass: NavigationActions },
    { provide: SettingActions, useClass: SettingActions },
    { provide: YoutubeActions, useClass: YoutubeActions },
    { provide: SearchActions, useClass: SearchActions },
    { provide: PinActions, useClass: PinActions },
    { provide: ProgressBarActions, useClass: ProgressBarActions }
];