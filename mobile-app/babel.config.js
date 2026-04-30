
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/utils': './src/utils',
          '@/types': './src/types',
          '@/store': './src/store',
          '@/navigation': './src/navigation',
          '@/hooks': './src/hooks',
          '@/assets': './assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
