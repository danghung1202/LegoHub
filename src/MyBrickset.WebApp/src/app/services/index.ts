import { AppService }from './app.service';
import { BricksetService } from './brickset.service';
import { RebrickableService } from './rebrickable.service';
import { GlobalErrorHandler } from './error-handler';
import { LoggerService } from './logger.service';
import { GAuth2 } from './gauth.service';
import { GapiLoader } from './gapi-loader.service';
import { SettingGuard } from './setting.guard';

export * from './app.service';
export * from './brickset.service';
export * from './rebrickable.service';
export * from './error-handler';
export * from './logger.service';
export * from './gauth.service';
export * from './gapi-loader.service';
export * from './setting.guard';

export const APP_SERVICES = [
  { provide: AppService, useClass: AppService },
  { provide: BricksetService, useClass: BricksetService },
  { provide: RebrickableService, useClass: RebrickableService },
  { provide: LoggerService, useClass: LoggerService },
  { provide: GAuth2, useClass: GAuth2 },
  { provide: GapiLoader, useClass: GapiLoader },
  { provide: SettingGuard, useClass: SettingGuard }
];

