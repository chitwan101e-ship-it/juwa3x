import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Juwa Afterdark — Game Worlds & Stories',description:'Explore Juwa game artwork, colorful characters, and original blog stories in the Afterdark collection, with an interactive 3D reel-and-dice scene.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

