import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import express = require('express');

const app = express()

app.listen(3000, () =>{
  console.log('Server running on port 3000')
})

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
