// uno.config.ts
// This preset inherits @unocss/preset-wind and @unocss/preset-mini.
import presetUno from '@unocss/preset-uno';
import { defineConfig } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno()],
});
