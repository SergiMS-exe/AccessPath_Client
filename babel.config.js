module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ["module:react-native-dotenv", {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        sage: false,
        allowUndefined: true,
      }],
      ['react-native-reanimated/plugin', {
          relativeSourceLocation: true,
      }],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
};
