import { defineConfig } from 'dumi';

const repo = 'react-nivo-slider';

export default defineConfig({
  mode: 'doc',
  title: repo,
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  resolve: {
    includes: ['docs'],
  },
  hash: true,
  webpack5: {},
  cssModulesTypescriptLoader: {},
  // @ts-ignore
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.cache = {
      type: 'filesystem',
      name: 'dumi',
      buildDependencies: {
        config: [__filename],
      },
      store: 'pack',
    };
    memo.plugins.delete('friendly-error');
    memo.plugins.delete('copy');
  },
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  styles: [
    `
      #root .__dumi-default-menu-header p {
        display:none;
      }
      #root .__dumi-default-menu-header h1 {
        font-size: 24px;
        margin: 16px auto;
      }
      #root .__dumi-default-mobile-demo-layout{
        padding:0;
      }
    `,
  ],
});
