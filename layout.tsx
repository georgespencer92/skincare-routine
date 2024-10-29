import { aeonik } from './fonts'
import '../styles/globals.css'; // Assuming you placed the @font-face here


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${aeonik.variable} font-sans`}>
      <body>{children}</body>
    </html>
  )
}