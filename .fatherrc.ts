export default {
  esm: 'babel',
  // 是否提取 css 为单独文件
  extractCSS: true,
  // 在 babel 模式下做 less 编译
  lessInBabelMode: true,
  autoprefixer: {
    browsers: ['ie>=11', 'Safari >= 12'],
  },
};
