import { EffectsModule } from '@ngrx/effects';

import { FilterEffects } from './filter.effect';
import { SetEffects } from './set.effect';
import { SettingEffects } from './setting.effect';

export {
    FilterEffects, SetEffects, SettingEffects
};

export const AppEffectModules = [
  EffectsModule.run(FilterEffects),
  EffectsModule.run(SetEffects),
  EffectsModule.run(SettingEffects),
];