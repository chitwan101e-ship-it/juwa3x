import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Juwa — Play Beyond Ordinary',description:'Explore a new dimension of social play. Discover Juwa games, spin the demo wheel, and find your next favorite. 18+ · Entertainment only.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
