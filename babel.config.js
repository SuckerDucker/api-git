module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '18.16.0',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modeldb': './src/database/model',
          '@routes': './src/routes',
          '@controllers': './src/controllers',
          '@model': './src/model',
          '@middlewares': './src/middlewares',
          '@utils': './src/utils',
          '@config': './src/config',
          '@database': './src/database',
          '@lib': './src/lib',
          '@root': './src',
          '@docs': './src/docs',
        },
      },
    ],
  ],
};
