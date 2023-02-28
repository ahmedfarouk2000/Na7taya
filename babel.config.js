module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          src: './src',
          theme: ['./src/theme'],
          screens: ['./src/screens'],
          constants: ['./src/constants'],
          navigation: ['./src/navigation'],
          components: ['./src/components'],
          store: './src/store',
          api: './src/api',
          config: './src/config',
          assets: ['./src/assets'],
        },
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
