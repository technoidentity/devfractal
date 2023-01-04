module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: "'Nunito', sans-serif",
      },
      colors: {
        green: {
          550: '#54A259',
          450: '#68BF73',
        },
        yellow: {
          550: '#F89821',
        },
        blue: {
          550: '#605BFF',
        },
        gray: {
          450: '#9A9AA9',
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        secondary: '#F04848',
      }),
      width: {
        15: '60px',
        50: '202px',
        55: '221.49px',
        66: '270px',
        76: '297px',
        82: '323.44px',
        90: '362px',
        97: '404px',
        99: '421px',
      },
      margin: {
        3.7: '15px',
        6.5: '26px',
        7.5: '30px',
        15: '62px',
      },
      height: {
        1.7: '7px',
        15: '62px',
        22: '87.5px',
        30: '123px',
        50: '202px',
        65: '266px',
        88: '356px',
        99: '543px',
      },
      padding: {
        2.7: '11px',
        3.2: '12.25px',
        3.3: '12.62px',
        3.8: '15px',
        4.5: '19px',
        5.5: '23px',
      },
      borderRadius: {
        '2lg': '10px',
      },
    },
  },

  plugins: [],
}
