import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx', './src/index.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

export const config: Config = {
  namespace: 'tailwind-stencil',
  globalStyle: 'src/global/app.css',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'http://localhost:5000'
    },
    {
      type: 'dist'
    }
  ],
  plugins: [
    postcss({
      plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-nested'),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [purgecss, require('cssnano')]
          : [])
      ]
    })
  ]
};
