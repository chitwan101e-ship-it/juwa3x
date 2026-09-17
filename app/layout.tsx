import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Juwa Afterdark — The Journal',description:'A closer look at Juwa game artwork, visual design, and game formats. Explore the Afterdark journal and an interactive 3D scene.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
