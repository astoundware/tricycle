module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.macos.js',
          '.windows.js',
          '.macos.ts',
          '.windows.ts',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@components': './App/components',
          '@config': './App/config',
          '@constants': './App/constants',
          '@images': './App/images',
          '@models': './App/models',
          '@native': './App/native',
          '@screens': './App/screens',
        },
      },
    ],
  ],
};
