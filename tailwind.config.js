const defaultTheme = require('tailwindcss/defaultTheme');
const animationConfig = require('./tailwind.config.animation');

module.exports = {
  // prefix: 'elon-', // 需将 css 中 apply 的内容手动增加前缀
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      tablet: '960px',
      pc: '1200px',
    },

    boxShadow: {
      sm: '0px 2px 4px 0px rgba(11,10,55,0.15)',
      md: '0px 4px 8px 0px rgba(22,19,88,0.12)',
      lg: '0px 8px 20px 0px rgba(18,16,99,0.06)',
    },

    fontFamily: {
      noto: ['Noto', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: ['10px', { lineHeight: '14px', letterSpacing: '-0.03em' }],
      sm: ['12px', { lineHeight: '16px', letterSpacing: '-0.03em' }],
      base: ['14px', { lineHeight: '18px', letterSpacing: '-0.03em' }],
      lg: ['18px', { lineHeight: '22px', letterSpacing: '-0.03em' }],
      xl: ['20px', { lineHeight: '24px', letterSpacing: '-0.032em' }],
      '2xl': ['24px', { lineHeight: '28px', letterSpacing: '-0.032em' }],
      '3xl': ['28px', { lineHeight: '32px', letterSpacing: '-0.032em' }],
      '4xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.032em' }],
      '5xl': ['32px', { lineHeight: '40px', letterSpacing: '-0.032em' }],
      '6xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.032em' }],
      '7xl': ['40px', { lineHeight: '48px', letterSpacing: '-0.032em' }],
      '8xl': ['44px', { lineHeight: '52px', letterSpacing: '-0.032em' }],
      '9xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.032em' }],
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: '#6336E2',
          50: '#F0F1FE',
          100: '#DEE6FC',
          200: '#C4CDFB',
          300: '#9EA7F8',
          400: '#7370F3',
          500: '#6D4DEE', // default
          600: '#6336E2',
          700: '#552AD0',
          800: '#4127A8',
          900: '#442585',
        },
      },

      keyframes: animationConfig.keyframes,
      animation: animationConfig.animation,
    },
    // 用于 svg 填充
    fill: (theme) => theme('colors'),
  },
  variants: {
    extend: {
      animation: ['hover', 'focus', 'active'], // 允许目标前缀下可使用 animation utilities
      transform: ['hover', 'focus', 'active'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
};
