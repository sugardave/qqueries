import {defineConfig, fontProviders} from 'astro/config';
import react from '@astrojs/react';
import tailwindCss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://qqueries.com',
  vite: {
    plugins: [tailwindCss()]
  },
  integrations: [react({experimentalReactChildren: true})],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Poppins',
        cssVariable: '--font-poppins',
        fallbacks: ['Inter', 'serif']
      }
    ]
  }
});
