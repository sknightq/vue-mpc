module.exports = {
  // mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vue-green': '#42b983'
      }
    },
    screens: {} //自定义断点
  },
  variants: {
    extend: {}
  },
  plugins: []
}
