import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/adapters/driver/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
