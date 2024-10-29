import localFont from 'next/font/local'

export const aeonik = localFont({
  src: [
    {
      path: '../public/fonts/Aeonik-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aeonik-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik',
})