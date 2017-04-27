import { EffectsModule } from '@ngrx/effects';

import { FilterEffects } from './filter.effect';
import { SetEffects } from './set.effect';
import { SettingEffects } from './setting.effect';
import { YoutubeEffects } from './youtube.effect';
import { SearchEffects } from './search.effect';

export {
  FilterEffects, SetEffects, SettingEffects, SearchEffects
};

export const AppEffectModules = [
  EffectsModule.run(FilterEffects),
  EffectsModule.run(SetEffects),
  EffectsModule.run(SettingEffects),
  EffectsModule.run(YoutubeEffects),
  EffectsModule.run(SearchEffects),
];